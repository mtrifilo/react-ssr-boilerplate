const Validator = require('validator')
const isEmpty = require('lodash/isEmpty')
const {buildErrorsObject} = require('./utils')

/**
 * Validates user settings fields.
 *
 * @param {object} data - A user's submitted settings form data
 * @returns {object} {validationErrors: Object, isValid: Boolean} - errors contains the
 *   results of all of the validation functions as an array. isValid
 *   will be true if any error messages are returned from any of the validation
 *   functions.
 */
function userFormValidation (data) {
  const validationResults = Object.assign(
    {},
    validateNewUsername(data.newUsername),
    validateNewEmail(data.newEmail),
  )

  // return any error messages, or an empty array
  const validationErrors = buildErrorsObject(validationResults)

  return {
    validationErrors,
    isValid: isEmpty(validationErrors)
  }
}

function passwordFormValidation (data) {
  const validationResults = Object.assign(
    {},
    validateCurrentPassword(data.currentPassword),
    validateNewPassword(data.newPassword),
    validateConfirmNewPassword(data.confirmNewPassword)
  )

  const validationErrors = buildErrorsObject(validationResults)

  return {
    validationErrors,
    isValid: isEmpty(validationErrors)
  }
}

function validateNewUsername (newUsername) {
  if (typeof newUsername !== 'string') {
    console.error(
      'validateNewUsername: username must be a string. received:',
      typeof newUsername
    )
    return {newUsername: 'username validation failed'}
  }
  // username shouldn't be empty
  if (Validator.isEmpty(newUsername)) {
    return {newUsername: 'A username is required'}
  }
  return {newUsername: ''}
}

function validateNewEmail (newEmail) {
  if (typeof newEmail !== 'string') {
    console.error(
      'validateNewEmail: email must be a string. received:',
      typeof newEmail
    )
    return {newEmail: 'email validation failed'}
  }
  // email shouldn't be empty
  if (Validator.isEmpty(newEmail)) {
    return {newEmail: 'An email address is required'}
  }
  // email should be a valid email address
  if (!Validator.isEmail(newEmail)) {
    return {newEmail: 'This email address is not valid'}
  }
  return {newEmail: ''}
}

function validateCurrentPassword (currentPassword) {
  if (typeof currentPassword !== 'string') {
    console.error(
      'validateCurrentPassword: password must be a string. received:',
      typeof currentPassword
    )
    return {currentPassword: 'password validation failed'}
  }
  // password shouldn't be empty
  if (Validator.isEmpty(currentPassword)) {
    return {currentPassword: 'A password is required'}
  }
  return {currentPassword: ''}
}

function validateNewPassword (newPassword) {
  if (typeof newPassword !== 'string' || typeof currentPassword) {
    console.error(
      'validateNewPassword: newPassword must be a string. received:',
      typeof newPassword,
    )
    return {newPassword: 'password validation failed'}
  }
  // password shouldn't be empty
  if (Validator.isEmpty(newPassword)) {
    return {newPassword: 'A new password is required'}
  }

  return {newPassword: ''}
}

function validateConfirmNewPassword (newPassword, confirmNewPassword) {
  if (typeof newPassword !== 'string') {
    console.error(
      'validateConfirmNewPassword: password must be a string. received:',
      typeof newPassword
    )
    return {confirmNewPassword: 'confirmPassword validation failed'}
  }
  if (typeof confirmNewPassword !== 'string') {
    console.error(
      'validateConfirmPassword: confirmPassword must be a string. received:',
      typeof confirmNewPassword
    )
    return {confirmNewPassword: 'confirmPassword validation failed'}
  }
  // confirmPassword shouldn't be empty
  if (Validator.isEmpty(confirmNewPassword)) {
    return {confirmNewPassword: 'Please confirm your password'}
  }
  // password and confirmNewPassword should match
  if (!Validator.equals(newPassword, confirmNewPassword)) {
    return {confirmNewPassword: "Passwords don't match, try again"}
  }
  return {confirmNewPassword: ''}
}

module.exports = {
  userFormValidation,
  passwordFormValidation,
  validateNewUsername,
  validateNewEmail,
  validateCurrentPassword,
  validateNewPassword,
  validateConfirmNewPassword
}
