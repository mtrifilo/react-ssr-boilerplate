const express = require('express')
const router = express.Router()
const passport = require('passport')

/**
 * '/api/login/local'
 *
 * Handles a local authentication request. If successful, a JWT is returned
 * to the client.
 */
router.post('/local', (req, res, next) => {
  console.log('/local request ...')
  passport.authenticate('local-login', (err, user, info) => {
    if (err) {
      console.error('login.js: passport.authenticate failed', err)
      return res.status(500).json({
        errors: {
          server: 'A server error occurred'
        }
      })
    }

    if (!user) {
      return res.status(401).json(info)
    }

    return res.json({ success: true })
  })(req, res, next)
})

module.exports = router
