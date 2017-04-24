const isEmpty = require('lodash/isEmpty')
const {validateNewUsername, validateNewEmail} = require('./accountSettingsValidation')

function validateIdentifiers (changes) {
  let validationErrors = {}

  if (changes.newUsername) {
    const newUsernameResult = validateNewUsername(changes.newUsername)
    if (newUsernameResult.newUsername !== '') {
      validationErrors = Object.assign({}, validationErrors, newUsernameResult)
    }
  }

  if (changes.newEmail) {
    const newEmailResult = validateNewEmail(changes.newEmail)
    if (newEmailResult.newEmail !== '') {
      validationErrors = Object.assign({}, validationErrors, newEmailResult)
    }
  }

  return {
    validationErrors,
    isValid: isEmpty(validationErrors)
  }
}

module.exports = {validateIdentifiers}
