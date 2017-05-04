const User = require('../../db/models/User')
const isEmpty = require('lodash/isEmpty')

/**
 * Queries the database to check if a submitted username or email is already
 * registered to another user.
 *
 * @param {object} userData
 * @returns {object} - duplicateError will contain a username error, email error, or both
 *   isUnique is a boolean, which will be false if duplicateError contains any errors
 */
function duplicateUserCheck (userData) {
  return User.find({
    $or: [{ email: userData.email }, { username: userData.username }]
  })
    .exec()
    .then(user => {
      let duplicateUserError = {}
      if (!isEmpty(user) && user[0].username === userData.username) {
        duplicateUserError.username = 'This username is taken.'
      }
      if (!isEmpty(user) && user[0].email === userData.email) {
        duplicateUserError.email = 'This email is already registered'
      }
      return {
        duplicateUserError,
        isUnique: isEmpty(duplicateUserError)
      }
    })
    .catch(err => {
      console.error('signup.js: duplicateUserCheck failed', err)
      return err
    })
}

module.exports = { duplicateUserCheck }
