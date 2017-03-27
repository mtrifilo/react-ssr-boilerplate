const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    index: { unique: true }
  },
  email: {
    type: String,
    index: { unique: true }
  },
  password: String
})

UserSchema.methods.comparePassword = function comparePassword (password, callback) {
  bcrypt.compare(password, this.password, callback)
}

UserSchema.pre('save', function saveHook (next) {
  const user = this

  if (!user.isModified('password')) { return next() }

  return hashPassword(user, next)
})

function hashPassword (user, next) {
  return bcrypt.hash(user.password, 10)
    .then((hashedPassword) => {
      user.password = hashedPassword
      return next()
    })
    .catch(err => {
      console.error('User.js: hashPassword failed', err)
      return next(err)
    })
}

// function hashPassword (user, next) {
//   return bcrypt.genSalt((saltError, salt) => {
//     if (saltError) { return next(saltError) }

//     return bcrypt.hash(user.password, salt, (hashError, hash) => {
//       if (hashError) { return next(hashError) }

//       user.password = hash
//       return next()
//     })
//   })
// }

const User = mongoose.model('User', UserSchema)

module.exports = User
