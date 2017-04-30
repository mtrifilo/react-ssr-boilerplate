const GithubStrategy = require('passport-github2').Strategy
const User = require('../db/models/User')
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = require('../../config.json')

const githubStrategy = new GithubStrategy(
  {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:4000/api/login/github/callback',
    session: false
  },
  (accessToken, refreshToken, profile, done) => {
    return User.findOne({ email: profile.emails[0].value })
      .exec()
      .then(user => {
        if (user) {
          return done(null, { user, token: accessToken })
        }

        const newUserData = {
          username: profile.username,
          email: profile.emails[0].value
        }

        if (!newUserData.username || !newUserData.email) {
          return done({ error: 'invalid user data', newUserData })
        }

        const newUser = new User(newUserData)
        newUser
          .save()
          .then(user => {
            done(null, user)
          })
          .catch(err => {
            done(err)
          })
      })
      .catch(err => {
        console.error('githubStrategy.js: err!:', err)
        return done(err)
      })
  }
)

module.exports = githubStrategy
