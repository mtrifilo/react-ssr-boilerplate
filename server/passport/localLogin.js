const LocalStrategy = require('passport-local').Strategy
const User = require('../db/models/User')

const localLogin = new LocalStrategy((email, password, done) => {
    User.findOne({ email })
      .exec()
      .then(user => {
        console.log('localLogin: user:', user)
        if (!user) { return done(null, false, { message: 'Invalid login credentials' }) }
        // if (!verifyPassword(password, user.password)) {}
      })
      .catch(err => {
        return done(err)
      })
  }
)

// refactor to use User veryify password method

// function verifyPassword (plaintextPassword, hashedPassword) {
//   return bcrypt.compare(plaintextPassword, hashedPassword)
//     .then(res => res)
//     .catch(err => {
//       console.error('localLogin.js: verifyPassword failed', err)
//       return err
//     })
// }