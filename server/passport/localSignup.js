const User = require('../models/User')
const LocalStrategy = require('passport-local').Strategy

const localSignup = new LocalStrategy({
  usernameField: 'email',
  passwordPield: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    username: req.body.username.trim(),
    email: email.trim(),
    password: password.trim()
  }

  const newUser = new User(userData)
  newUser.save()
    .then(user => done(null, user))
    .catch(err => {
      console.error('localSignup: failed to save new user with mongoose', err)
      done(err)
    })
})

module.exports = localSignup
