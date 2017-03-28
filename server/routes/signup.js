const express = require('express')
const isEmpty = require('lodash/isEmpty')
const User = require('../db/models/User')
const { signupFormValidation } = require('../validation/signupFormValidation')
const router = express.Router()

/**
 * '/api/signup'
 *
 * Handles a signup request
 */
router.post('/', (req, res) => {
  const userData = req.body
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
      if (!result.isUnique) {
        res.status(200).json(result.duplicateUserError)
        throw new Error('duplicate user')
      }
      return saveNewUser(userData)
    })
    .then(newUser => {
      return res.status(201).json(newUser)
    })
    .catch(err => {
      console.log('signup.js: Signup failed', err)
      return err
    })
})

function duplicateUserCheck (userData) {
  return User.find({ $or: [{ email: userData.email }, { username: userData.username }] })
    .exec()
    .then(user => {
      console.log('44: user:', user)
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

function saveNewUser (userData) {
  const user = new User(userData)
  return user.save()
    .then(user => {
      return user
    })
    .catch(err => {
      console.error('signup.js: saveNewuser failed', err)
      return err
    })
}

module.exports = router
