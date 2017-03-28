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

UserSchema.methods.verifyPassword = function verifyPassword (password) {
  console.log('User.js: verifyPassword: password:', password)
  return bcrypt.compare(password, this.password)
    .then(res => res)
    .catch(err => {
      console.error('User.js: verifyPassword method failed', err)
      return err
    })
}

UserSchema.pre('save', function saveHook (next) {
  if (!this.isModified('password')) { return next() }
  return hashPassword(this, next)
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

const User = mongoose.model('User', UserSchema)

module.exports = User
