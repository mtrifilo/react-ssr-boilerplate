const Validator = require('validator')
const isEmpty = require('lodash/isEmpty')
const { buildErrorsObject } = require('./utils')

/**
 * Validates all signup form fields.
 *
 * @param {object} data - A new user's submitted signup form data
 * @returns {object} {validationErrors: Object, isValid: Boolean} - errors contains the
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
  const validationErrors = buildErrorsObject(validationResults, fields)

  return {
    validationErrors,
    isValid: isEmpty(validationErrors)
  }
}

function validateUsername (username) {
  if (typeof username !== 'string') {
    console.error('validateUsername: username must be a string. received:', typeof username)
    return { username: 'username validation failed' }
  }
  // username shouldn't be empty
  if (Validator.isEmpty(username)) {
    return { username: 'A username is required' }
  }
  return { username: '' }
}

function validateEmail (email) {
  if (typeof email !== 'string') {
    console.error('validateEmail: email must be a string. received:', typeof email)
    return { email: 'email validation failed' }
  }
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
  if (typeof password !== 'string') {
    console.error('validatePassword: password must be a string. received:', typeof password)
    return { password: 'password validation failed' }
  }
  // password shouldn't be empty
  if (Validator.isEmpty(password)) {
    return { password: 'A password is required' }
  }
  return { password: '' }
}

function validateConfirmPassword (password, confirmPassword) {
  if (typeof password !== 'string') {
    console.error('validateConfirmPassword: password must be a string. received:', typeof password)
    return { confirmPassword: 'confirmPassword validation failed' }
  }
  if (typeof confirmPassword !== 'string') {
    console.error('validateConfirmPassword: confirmPassword must be a string. received:', typeof confirmPassword)
    return { confirmPassword: 'confirmPassword validation failed' }
  }
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
