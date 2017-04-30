const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET || require('../../config.json').jwtSecret

/**
 * '/api/login/local'
 *
 * Handles a local authentication request. If successful, a JWT is returned
 * to the client.
 */
router.post('/local', (req, res, next) => {
  passport.authenticate('local-login', (err, user, info) => {
    if (err) {
      console.error('login.js: local-login failed', err)
      return res.status(500).json({
        errors: {
          server: 'A server error occurred',
          error: err
        }
      })
    }

    if (!user) {
      // info will contain { message: 'Invalid login credentials' }
      return res.status(401).json(info)
    }

    const token = createToken(user, null)

    return res.json({ token })
  })(req, res, next)
})

/**
 * '/api/login/github'
 *
 * Handles a GitHub OAuth request. If successful, a JWT is returned
 * to the client.
 */
router.get(
  '/github',
  passport.authenticate('login-github', {
    session: false
  })
)

/**
 * '/api/login/github'
 *
 * Callback route to be called after a successful GitHub OAuth request.
 * This route creates a token containing an access token from github, and
 * then redirects the user to the client's '/t/' route, which will put
 * the token into localStorage, and redirect home from there.
 */

router.get('/github/callback', (req, res, next) => {
  passport.authenticate('login-github', (err, user) => {
    if (err) {
      return res.status(500).json({
        errors: {
          server: 'A server error occurred',
          error: err
        }
      })
    }

    if (!user) {
      return res.status(401).json({ message: 'Login failed', user })
    }

    const jwt = createToken(user.user, user.token)

    res.set({
      Authorization: `Bearer ${jwt}`
    })
    return res.redirect(`/t/${jwt}`)
  })(req, res, next)
})

function createToken (user, token) {
  return jwt.sign(
    {
      sub: user._id,
      username: user.username,
      gitHubAccessToken: token
    },
    secret,
    {
      expiresIn: '3h'
    }
  )
}

module.exports = router
