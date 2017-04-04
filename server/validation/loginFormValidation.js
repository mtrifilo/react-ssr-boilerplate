const Validator = require('validator')
const isEmpty = require('lodash/isEmpty')

function loginFormValidation (state) {
  const validationResults = Object.assign(
    {},
    validateIdentifier(state.identifier),
    validatePassword(state.password)
  )

  const fields = Object.keys(validationResults)

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
