const express = require('express')
const bcrypt = require('bcrypt')
const isEmpty = require('lodash/isEmpty')
const User = require('../db/models/User')
const {signupFormValidation} = require('../validation/signupFormValidation')
const router = express.Router()

/**
 * '/api/signup'
 *
 * Handles a signup request
 */
router.post('/', (req, res) => {
  const userData = req.body
  const {username, email, password} = req.body
  const {validationErrors, isValid} = signupFormValidation(userData)
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
        res.status(500).json({error: result.error})
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
        res.status(500).json({error: result.error})
        throw result.error
      }
      return res.status(201).json({newUser: result.newUser})
    })
    .catch(err => {
      console.log('signup.js: Signup failed', err)
      res.status(500).json(err)
      return err
    })
})

/**
 * Queries the database to check if a submitted username or email is already
 * registered to another user.
 *
 * @param {object} userData
 * @returns {object} - duplicateError will contain a username error, email error, or both
 *   isUnique is a boolean, which will be false if duplicateError contains any errors
 */
function duplicateUserCheck (userData) {
  return User.find({
    $or: [{email: userData.email}, {username: userData.username}]
  })
    .exec()
    .then(user => {
      let duplicateUserError = {}
      if (!isEmpty(user) && user[0].username === userData.username) {
        duplicateUserError.username = 'This username is taken.'
      }
      if (!isEmpty(user) && user[0].email === userData.email) {
        duplicateUserError.email = 'This email is already registered'
      }
      return {
        duplicateUserError,
        isUnique: isEmpty(duplicateUserError)
      }
    })
    .catch(err => {
      console.error('signup.js: duplicateUserCheck failed', err)
      return err
    })
}

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
      return {newUser: user}
    })
    .catch(err => {
      console.error('signup.js: saveNewuser failed', err)
      return {error: err}
    })
}

function hashPassword (password) {
  return bcrypt
    .hash(password, 10)
    .then(hashedPassword => {
      return {hashedPassword}
    })
    .catch(err => {
      console.error('signup.js: hashPassword failed', err)
      return {error: err}
    })
}

module.exports = router
