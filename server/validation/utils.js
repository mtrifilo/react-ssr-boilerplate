const isEmpty = require('lodash/isEmpty')

function buildErrorsObject (validationResults, fields) {
  let errors = fields.map(field => {
    if (validationResults[field]) {
      return { [field]: validationResults[field] }
    }
    return false
  }).filter(message => message)

  if (!isEmpty(errors)) {
    errors = errors.reduce((prevMessageObj, nextMessageObj) => {
      return Object.assign({}, prevMessageObj, nextMessageObj)
    })
  }

  return errors
}

module.exports = { buildErrorsObject }
