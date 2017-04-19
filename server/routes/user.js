const express = require('express')
const User = require('../db/models/User')
const authorize = require('../auth/authorize.js')
const router = express.Router()

/**
 * GET '/api/user/:id'
 *
 * Gets username, email, password for a user matching
 * the user id provided as a parameter
 */

router.get('/:id', authorize, (req, res) => {
  const id = req.params.id
  User.find({_id: id})
    .select('username email')
    .exec()
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      res.status(400).json({
        errors: {
          server: 'User not found',
          error: err
        }
      })
    })
})

/**
 * PUT '/api/user/:id'
 *
 * Allows for editing a user
 */

router.put('/:id', authorize, (req, res) => {
  const id = req.params.id
  const user = req.currentUser

  // validate user information

  // check for duplicate user
  // if user is a duplicate, return error

  // update the user in mongoDB to match the request body
})
