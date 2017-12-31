const axios = require('axios')

function setTokenToHeaders (token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else if (axios.defaults.headers.common['Authorization']) {
    delete axios.defaults.headers.common['Authorization']
  }
}

module.exports = setTokenToHeaders
