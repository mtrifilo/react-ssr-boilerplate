const jwt = require('jsonwebtoken')
const secret = process.NODE_ENV === 'production'
  ? process.env.JWT_SECRET
  : require('../../config').jwtSecret
const User = require('../db/models/User')
const isEmpty = require('lodash/isEmpty')

/**
 * Authorize Middleware
 *
 * Checks a request's authorization header for a valid token,
 * and adds an authorized user's information to the request as
 * req.currentUser before passing the request on to the next middleware.
 *
 * If the request is not authorized, an error response will be
 * returned to the client.
 */

function authorize (req, res, next) {
  const authorizationHeader = req.headers['authorization']
  let token

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1]
  }

  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Not authorized' })
      } else {
        User.findOne({ _id: decoded.sub })
          .select('email _id username')
          .exec()
          .then(user => {
            if (isEmpty(user)) {
              return res.status(404).json({ error: 'No such user' })
            }
            console.log('retreived user:', user)
            req.currentUser = user
            next()
          })
      }
    })
  } else {
    res.status(403).json({ error: 'No token provided' })
  }
}

module.exports = authorize
