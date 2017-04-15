const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const findOrCreate = require('mongoose-findorcreate')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    index: {unique: true}
  },
  email: {
    type: String,
    index: {unique: true}
  },
  password: String
})

UserSchema.methods.verifyPassword = function verifyPassword (password) {
  return bcrypt
    .compare(password, this.password)
    .then(res => res)
    .catch(err => err)
}

UserSchema.pre('save', function saveHook (next) {
  if (!this.isModified('password')) {
    return next()
  }
  return hashPassword(this, next)
})

UserSchema.plugin(findOrCreate)

function hashPassword (user, next) {
  return bcrypt
    .hash(user.password, 10)
    .then(hashedPassword => {
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
