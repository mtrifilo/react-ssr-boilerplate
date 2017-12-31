const axios = require('axios')

const setTokenToHeaders = require('../../auth/setTokenToHeaders')

afterEach(() => {
  if (axios.defaults.headers.common['Authorization']) {
    delete axios.defaults.headers.common['Authorization']
  }
})

test('with token: should set Authorization header with the token', () => {
  setTokenToHeaders('testToken')
  expect(axios.defaults.headers.common['Authorization']).toBe('Bearer testToken')
})

test('without token: should delete token if present', () => {
  axios.defaults.headers.common['Authorization'] = 'testToken'
  setTokenToHeaders()
  expect(axios.defaults.headers.common['Authorization']).toBeUndefined()
})
