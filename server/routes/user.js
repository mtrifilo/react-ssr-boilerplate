const express = require('express')
const authorize = require('../auth/authorize.js')
const {validateIdentifiers} = require('../validation/identifiersValidation')
const {changeUsername} = require('./lib/changeUsername')
const {changeEmail} = require('./lib/changeEmail')
const {changeUsernameAndEmail} = require('./lib/changeUsernameAndEmail')
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
  console.log('currentUser', currentUser)
  console.log('changes', changes)

  // validate user information
  const validationResults = validateIdentifiers(changes)

  if (!validationResults.isValid) {
    return res.status(400).json(validationResults.validationErrors)
  }

  if (changes.newUsername && changes.newEmail) {
    changeUsernameAndEmail(currentUser._id, changes.newUsername, changes.newEmail)
      .then(result => {
        if (result.updated) {
          const updatedUsername = result.doc.username
          const updatedEmail = result.doc.email
          return res.json({updatedUsername, updatedEmail})
        }
        return res.status(result.status).json(result.error)
      })
      .catch(err => {
        console.error('user.js: failed to change username and email')
        return res.status(500).json(err)
      })
  }

  if (changes.newUsername) {
    changeUsername(currentUser._id, changes.newUsername)
      .then(result => {
        if (result.updated) {
          const updatedUsername = result.doc.username
          return res.json({updatedUsername})
        }
        return res.status(result.status).json(result.error)
      })
      .catch(err => {
        console.error('user.js: failed to change username:', err)
        return res.status(500).json(err)
      })
  }

  if (changes.newEmail) {
    changeEmail(currentUser._id, changes.newEmail)
      .then(result => {
        if (result.updated) {
          const updatedEmail = result.doc.email
          return res.json({updatedEmail})
        }
        return res.status(result.status).json(result.error)
      })
      .catch(err => {
        console.error('user.js: failed to change email:', err)
      })
  }
})

module.exports = router
