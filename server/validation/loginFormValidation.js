const Validator = require('validator')
const isEmpty = require('lodash/isEmpty')
const { buildErrorsObject } = require('./utils')

function loginFormValidation (data) {
  const validationResults = Object.assign(
    {},
    validateEmail(data.email),
    validatePassword(data.password)
  )

  const validationErrors = buildErrorsObject(validationResults)

  return {
    validationErrors,
    isValid: isEmpty(validationErrors)
  }
}

function validateEmail (email) {
  if (typeof email !== 'string') {
    console.error(
      'validateEmail: email must be a string. received:',
      typeof email
    )
    return { email: 'email validation failed' }
  }
  // email shouldn't be empty
  if (Validator.isEmpty(email)) {
    return { email: 'A registered email is required' }
  }
  // email should be a valid email address
  if (!Validator.isEmail(email)) {
    return { email: 'This email address is not valid' }
  }
  return { email: '' }
}

function validatePassword (password) {
  if (typeof password !== 'string') {
    console.error(
      'validatePassword: password must be a string. received:',
      typeof password
    )
    return { password: 'password validation failed' }
  }
  // password shouldn't be empty
  if (Validator.isEmpty(password)) {
    return { password: 'A password is required' }
  }
  return { password: '' }
}

module.exports = {
  loginFormValidation,
  validateEmail,
  validatePassword
}
