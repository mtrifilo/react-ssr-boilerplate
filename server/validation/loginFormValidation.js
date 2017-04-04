const Validator = require('validator')
const isEmpty = require('lodash/isEmpty')
const { buildErrorsObject } = require('./utils')

function loginFormValidation (data) {
  const validationResults = Object.assign(
    {},
    validateIdentifier(data.identifier),
    validatePassword(data.password)
  )

  const fields = Object.keys(validationResults)

  const validationErrors = buildErrorsObject(validationResults, fields)

  return {
    validationErrors,
    isValid: isEmpty(validationErrors)
  }
}

function validateIdentifier (identifier) {
  // identifier shouldn't be empty
  if (Validator.isEmpty(identifier)) {
    return { identifier: 'A registered email is required' }
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
