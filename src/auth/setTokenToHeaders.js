const axios = require('axios')

function setTokenToHeaders (token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

module.exports = setTokenToHeaders
