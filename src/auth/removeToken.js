/* global localStorage */
const setTokenToHeaders = require('./setTokenToHeaders')

function removeToken () {
  localStorage.removeItem('token')
  setTokenToHeaders(false)
}

module.exports = removeToken
