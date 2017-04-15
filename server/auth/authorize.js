const jwt = require('jsonwebtoken')
const secret = process.NODE_ENV === 'production'
  ? process.env.JWT_SECRET
  : require('../../config').jwtSecret
const User = require('../db/models/User')
const isEmpty = require('lodash/isEmpty')

function authorize (req, res, next) {
  const authorizationHeader = req.headers['authorization']
  let token

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1]
  }

  if (token) {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).json({error: 'Not authorized'})
      } else {
        User.find({_id: decoded.sub})
          .select('email _id username')
          .exec()
          .user(user => {
            if (isEmpty(user)) {
              return res.status(404).json({error: 'No such user'})
            }
            req.currentUser = user
            next()
          })
      }
    })
  } else {
    res.status(403).json({error: 'No token provided'})
  }
}

module.exports = authorize
