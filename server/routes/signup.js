const express = require('express')
const User = require('../db/models/User')
const { duplicateUserCheck } = require('./lib/duplicateUserCheck')
const { signupFormValidation } = require('../validation/signupFormValidation')
const { hashPassword } = require('./lib/hashPassword')
const router = express.Router()

/**
 * '/api/signup'
 *
 * Handles a signup request
 */
router.post('/', (req, res) => {
  const userData = req.body
  const { username, email, password } = req.body
  const { validationErrors, isValid } = signupFormValidation(userData)
  if (!isValid) {
    return res.status(400).json({
      errors: {
        validation: validationErrors
      }
    })
  }

  duplicateUserCheck(userData)
    .then(result => {
      // if a submitted username or email is taken, respond with the error,
      // and pass false to newUser in the next .then call.
      if (!result.isUnique) {
        res.status(400).json(result.duplicateUserError)
        throw result.duplicateUserError
      }
      return hashPassword(password)
    })
    .then(result => {
      if (result.error) {
        res.status(500).json({ error: result.error })
        throw result.error
      }
      return saveNewUser({
        username,
        email,
        password: result.hashedPassword
      })
    })
    .then(result => {
      if (result.error) {
        res.status(500).json({ error: result.error })
        throw result.error
      }
      return res.status(201).json({ newUser: result.newUser })
    })
    .catch(err => {
      console.log('signup.js: Signup failed', err)
      res.status(500).json(err)
      return err
    })
})

/**
 * Saves a new user to the database
 *
 * @param {object} userData
 * @returns {object} user or err - user is the user object that was successfully saved
 */
function saveNewUser (userData) {
  const user = new User(userData)
  return user
    .save()
    .then(user => {
      return { newUser: user }
    })
    .catch(err => {
      console.error('signup.js: saveNewuser failed', err)
      return { error: err }
    })
}

module.exports = router
