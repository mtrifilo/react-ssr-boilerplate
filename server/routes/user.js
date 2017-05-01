const express = require('express')
const authorize = require('../auth/authorize.js')
const User = require('../db/models/User')
const { validateIdentifiers } = require('../validation/identifiersValidation')
const {
  passwordFormValidation,
  newGitHubUsernameFormValidation
} = require('../validation/accountSettingsValidation')
const { changeUsername } = require('./lib/changeUsername')
const { changeEmail } = require('./lib/changeEmail')
const { changeUsernameAndEmail } = require('./lib/changeUsernameAndEmail')
const { hashPassword } = require('./lib/hashPassword')
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
    changeUsernameAndEmail(
      currentUser._id,
      changes.newUsername,
      changes.newEmail
    )
      .then(result => {
        if (result.updated) {
          const updatedUsername = result.doc.username
          const updatedEmail = result.doc.email
          return res.json({ updatedUsername, updatedEmail })
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
          return res.json({ updatedUsername })
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
          return res.json({ updatedEmail })
        }
        return res.status(result.status).json(result.error)
      })
      .catch(err => {
        console.error('user.js: failed to change email:', err)
      })
  }
})

/**
 * PUT '/api/user/password'
 *
 * Updates an authorized user's password
 *
 * req.body's payload is an object containing the user's current password,
 * new password, and new password confirmation
 *
 * example: { currentPassword, newPassword, confirmNewPassword }
 */

router.put('/password', authorize, (req, res) => {
  const currentUser = req.currentUser
  const passwordData = req.body
  const validationResults = passwordFormValidation(passwordData)

  if (!validationResults.isValid) {
    return res.status(400).json(validationResults.validationErrors)
  }

  hashPassword(passwordData.newPassword)
    .then(result => {
      if (result.error) {
        res.status(500).json({ error: result.error })
        throw result.error
      }
      return updatePassword(currentUser._id, result.hashedPassword)
    })
    .then(result => {
      if (result.error) {
        res.status(500).json({ error: result.error })
        throw result.error
      }
      return res.json({ success: true })
    })
})

/**
 * Updates a user's password
 *
 * @param {id} string - a the authorized user's id
 * @param {hashedPassword} string - a strongly hashed password
 */

function updatePassword (id, hashedPassword) {
  return User.findOneAndUpdate(
    { _id: id },
    { $set: { password: hashedPassword } },
    { new: true }
  )
    .then(doc => {
      return { doc }
    })
    .catch(err => {
      console.error('Failed to update password:', err)
      return { error: err }
    })
}

router.put('/githubstrategy', authorize, (req, res) => {
  const newUsername = req.body.newUsername
  const { _id } = req.currentUser
  const validationResults = newGitHubUsernameFormValidation(newUsername)
  if (!validationResults.isValid) {
    return res.status(400).json(validationResults.validationErrors)
  }

  return User.findOneAndUpdate(
    { _id },
    { $set: { username: newUsername } },
    { new: true }
  )
    .then(doc => {
      return res.json({ success: true })
    })
    .catch(err => {
      console.error('Failed to update username from GitHub strategy', err)
      return res.status(500).json({ error: err })
    })
})

module.exports = router
