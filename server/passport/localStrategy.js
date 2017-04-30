const LocalStrategy = require('passport-local').Strategy
const User = require('../db/models/User')

const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true
  },
  (req, email, password, done) => {
    return User.findOne({ email })
      .exec()
      .then(user => verifyUser(user, password, done))
      .catch(err => {
        return done(err)
      })
  }
)

function verifyUser (user, password, done) {
  if (!user) {
    return done(null, false, { message: 'Invalid login credentials' })
  }

  return user.verifyPassword(password).then(result => {
    if (!result) {
      return done(null, false, { message: 'Invalid login credentials' })
    }
    return done(null, user)
  })
}

module.exports = localStrategy
