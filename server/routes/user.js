const express = require('express')
const User = require('../db/models/User')
const authorize = require('../auth/authorize.js')
const {validateIdentifiers} = require('../validation/identifiersValidation')
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

  // check for duplicate user
  // if user is a duplicate, return error

  // update the user in mongoDB to match the request body
  if (changes.newUsername && changes.newEmail) {

  }
})

module.exports = router
