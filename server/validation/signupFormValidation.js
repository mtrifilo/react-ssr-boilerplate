const Validator = require('validator')
const isEmpty = require('lodash/isEmpty')

/**
 * Validates all signup form fields.
 *
 * @param {object} data - A new user's submitted signup form data
 * @returns {object} {error: Array, isValid: Boolean} - errors contains the
 *   results of all of the validation functions as an array. isValid
 *   will be true if any error messages are returned from any of the validation
 *   functions.
 */
function signupFormValidation (data) {
  const validationResults = Object.assign(
    {},
    validateUsername(data.username),
    validateEmail(data.email),
    validatePassword(data.password),
    validateConfirmPassword(data.password, data.confirmPassword)
  )

  const fields = Object.keys(validationResults)

  // return any error messages, or an empty array
  const validationErrors = fields.map(field => {
    if (validationResults[field]) {
      return { [field]: validationResults[field] }
    }
    return false
  }).filter(message => message)

  return {
    validationErrors,
    isValid: isEmpty(validationErrors)
  }
}

function validateUsername (username) {
  // username shouldn't be empty
  if (Validator.isEmpty(username)) {
    return { username: 'A username is required' }
  }
  return { username: '' }
}

function validateEmail (email) {
  // email shouldn't be empty
  if (Validator.isEmpty(email)) {
    return { email: 'An email address is required' }
  }
  // email should be a valid email address
  if (!Validator.isEmail(email)) {
    return { email: 'This email address is not valid' }
  }
  return { email: '' }
}

function validatePassword (password) {
  // password shouldn't be empty
  if (Validator.isEmpty(password)) {
    return { password: 'A password is required' }
  }
  return { password: '' }
}

function validateConfirmPassword (password, confirmPassword) {
  // confirmPassword shouldn't be empty
  if (Validator.isEmpty(confirmPassword)) {
    return { confirmPassword: 'Please confirm your password' }
  }
  // password and confirmPassword should match
  if (!Validator.equals(password, confirmPassword)) {
    return { confirmPassword: 'Passwords don\'t match, try again' }
  }
  return { confirmPassword: '' }
}

module.exports = {
  signupFormValidation,
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword
}
