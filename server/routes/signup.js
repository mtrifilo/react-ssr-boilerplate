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

  handleSignup()

  function * handleSignup () {
    console.log('signuping!')
    const serverError = { errors: { server: 'An error occured during signup' } }

    const uniqueUser = yield duplicateUserCheck(userData)
    if (!uniqueUser.isUnique) {
      return uniqueUser.duplicateUserError
        ? res.status(400).json(uniqueUser.duplicateUserError)
        : res.status(500).json(serverError)
    }

    const { username, email } = userData
    const hashedPassword = yield hashPassword(userData.password)
    if (!hashedPassword) { return res.status(500).json(serverError) }

    const newUser = yield saveNewUser(username, email, hashedPassword)
    if (!newUser) { return res.status(500).json(serverError) }

    return res.status(201).json(newUser)
  }
})

function duplicateUserCheck (userData) {
  return User.find({ $or: [{ email: userData.email }, { username: userData.username }] })
    .exec()
    .then(user => {
      let duplicateUserError = {}
      if (user.username === userData.username) {
        duplicateUserError.username = 'This username is taken.'
      }
      if (user.email === userData.email) {
        duplicateUserError.email = 'This email is already registered'
      }
      return {
        duplicateUserError,
        isUnique: isEmpty(duplicateUserError)
      }
    })
    .catch(err => {
      console.error('signup.js: duplicateUserCheck failed', err)
      return false
    })
}

function hashPassword (plainTextPassword) {
  return bcrypt.hash(plainTextPassword, 10)
    .then((hashedPassword) => {
      return hashedPassword
    })
    .catch(err => {
      console.error('signup.js: hashPassword failed', err)
      return false
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
      return false
    })
}

module.exports = router
