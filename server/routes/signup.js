const express = require('express')
const bcrypt = require('bcrypt')
const isEmpty = require('lodash/isEmpty')
const User = require('../db/models/User')
const { signupFormValidation } = require('../validation/signupFormValidation')
let router = express.Router()

/**
 * '/api/signup'
 *
 * Handles a signup request from a new user
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
        res.status(400).json(result.duplicateUserError)
        throw new Error('duplicate user')
      }
      return hashPassword(userData.password)
    })
    .then(hashedPassword => {
      const { username, email } = userData
      return saveNewUser(username, email, hashedPassword)
    })
    .then(newUser => {
      return res.status(201).json(newUser)
    })
    .catch(err => {
      console.log('nooo', err)
      return err
    })
})

function duplicateUserCheck (userData) {
  return User.find({ $or: [{ email: userData.email }, { username: userData.username }] })
    .exec()
    .then(user => {
      let duplicateUserError = {}
      if (user[0].username === userData.username) {
        duplicateUserError.username = 'This username is taken.'
      }
      if (user[0].email === userData.email) {
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

function hashPassword (plainTextPassword) {
  return bcrypt.hash(plainTextPassword, 10)
    .then((hashedPassword) => {
      return hashedPassword
    })
    .catch(err => {
      console.error('signup.js: hashPassword failed', err)
      return err
    })
}

function saveNewUser (username, email, hashedPassword) {
  const newUserData = { username, email, hashedPassword }
  const user = new User(newUserData)
  return user.save()
    .then(newUser => {
      return newUser
    })
    .catch(err => {
      console.error('signup.js: saveNewuser failed', err)
      return err
    })
}

module.exports = router
