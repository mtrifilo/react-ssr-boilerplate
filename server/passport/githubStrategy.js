const GithubStrategy = require('passport-github2').GithubStrategy
const User = require('../db/models/User')
const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = require('../../config.json')

const githubStrategy = new GithubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:4000'
}, (accessToken, refreshToken, profile, done) => {
  console.log('github profile', profile)
  return User.findOrCreate({ username: profile.id, email: profile.email })
    .exec()
    .then(user => done(null, user))
    .catch(err => done(err))
})

module.exports = githubStrategy
