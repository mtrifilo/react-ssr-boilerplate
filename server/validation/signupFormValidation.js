const Validator = require('validator')
const isEmpty = require('lodash/isEmpty')

function signupFormValidation (state) {
  let errors = {}

  errors = Object.assign({}, errors, validateUsername(state.username))
  errors = Object.assign({}, errors, validateEmail(state.email))
  errors = Object.assign({}, errors, validatePassword(state.password))
  errors = Object.assign({}, errors, validateConfirmPassword(state.password, state.confirmPassword))

  return {
    errors,
    isValid: isEmpty(errors)
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
