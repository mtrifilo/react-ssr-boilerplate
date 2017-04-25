const User = require('../../db/models/User')
const isEmpty = require('lodash/isEmpty')

function verifyUniqueEmail (newEmail) {
  let error = {}
  return User.findOne({ email: newEmail })
    .exec()
    .then(user => {
      if (user && user.email === newEmail) {
        error.newEmail = 'This email is already registered'
      }
      return {
        error,
        isUnique: isEmpty(error)
      }
    })
    .catch(err => {
      console.error('verifyUniqueEmail: failed to lookup email', err)
    })
}

module.exports = {verifyUniqueEmail}
