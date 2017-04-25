const express = require('express')
const authorize = require('../auth/authorize.js')
const {validateIdentifiers} = require('../validation/identifiersValidation')
const {verifyUniqueUsername} = require('./lib/verifyUniqueUsername')
const {verifyUniqueEmail} = require('./lib/verifyUniqueEmail')
const {changeUsername} = require('./lib/changeUsername')
const {changeEmail} = require('./lib/changeEmail')
const router = express.Router()

/**
 * GET '/api/user/'
 *
 * Gets a logged in user's username, email, password
 */

router.get('/', authorize, (req, res) => {
  console.log('authorized user: ', req.currentUser)
  res.json(req.currentUser)
})

/**
 * PUT '/api/user/identifiers'
 *
 * Updates an authorized user's information
 *
 * req.body's payload is an object containing an updated username,
 * email, or both.
 * { newUsername: username, newEmail: email@sample.com }
 */

router.put('/identifiers', authorize, (req, res) => {
  const currentUser = req.currentUser
  const changes = req.body
  console.log('changes', changes)

  // validate user information
  const validationResults = validateIdentifiers(changes)

  if (!validationResults.isValid) {
    return res.status(400).json(validationResults.validationErrors)
  }

  if (changes.newUsername && changes.newEmail) {
    verifyUniqueUsername(changes.newUsername)
      .then(result => {
        if (!result.isUnique) {
          return res.status(400).json(result.error)
        }
        return verifyUniqueEmail(changes.newEmail)
      })
      .then(result => {
        if (!result.isUnique) {
          return res.status(400).json(result.error)
        }
      })
  }

  if (changes.newUsername) {
    verifyUniqueUsername(changes.newUsername)
      .then(result => {
        if (!result.isUnique) {
          return res.status(400).json(result.error)
        }
        changeUsername(currentUser.sub, changes.newUsername)
          .then(result => {
            if (result.updated) {
              console.log('updated username!', result.doc)
              return res.json(result)
            }
            console.error('failed to update username:', result)
            return res.status(500).json(result.error)
          })
      })
  }
})

module.exports = router
