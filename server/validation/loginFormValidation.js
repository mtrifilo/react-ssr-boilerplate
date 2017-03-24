const Validator = require('validator')
const isEmpty = require('lodash/isEmpty')

function loginFormValidation (state) {
  let errors = {}

  errors = Object.assign({}, errors, validateIdentifier(state.identifier))
  errors = Object.assign({}, errors, validatePassword(state.password))

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

function validateIdentifier (identifier) {
  // identifier shouldn't be empty
  if (Validator.isEmpty(identifier)) {
    return { identifier: 'A registered username or email is required' }
  }
  return { identifier: '' }
}

function validatePassword (password) {
  // password shouldn't be empty
  if (Validator.isEmpty(password)) {
    return { password: 'A password is required' }
  }
  return { password: '' }
}

module.exports = {
  loginFormValidation,
  validateIdentifier,
  validatePassword
}
