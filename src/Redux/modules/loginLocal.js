import axios from 'axios'
import prepareUserFromToken from '../../auth/prepareUserFromToken'
import { displayFlashMessage } from './flashMessage'

const DEFAULT_STATE = {
  loginLoading: false
}

// ******* Action Type *******

const LOGIN_LOADING = 'LOGIN_LOADING'

// ******* Action Creators & Reducer *******

export function loginRequest (userData) {
  return dispatch => {
    dispatch(loginLoading(true))
    return axios.post('/api/login/local', userData)
      .then(res => {
        dispatch(loginLoading(false))

        if (!res.data.token) {
          console.error('loginRequest: no token returned:', res)
          return dispatch(displayFlashMessage({ message: 'An error occurred', level: 'error' }))
        }

        const user = prepareUserFromToken(res.data.token)
        console.log('user:', user)

        dispatch(displayFlashMessage({ message: 'You are logged in. Welcome back!', level: 'success' }))
      })
      .catch(err => {
        dispatch(loginLoading(false))
        if (err.response.data && err.response.data.message) {
          console.log('redux: loginLocal: invaild login credentials:', err.response.data.message)
          return dispatch(displayFlashMessage({ message: err.response.data.message, level: 'error' }))
        } else {
          console.error('redux: loginLocal: loginRequest failed:', err, err.response)
          return dispatch(displayFlashMessage({ message: 'An error occurred.', level: 'error' }))
        }
      })
  }
}

export function loginLoading (bool) {
  return { type: LOGIN_LOADING, loginLoading: bool }
}
function loginLoadingReducer (state, action) {
  return Object.assign({}, state, { loginLoading: action.loginLoading })
}

// ******* Root Reducer Slice *******

export default function loginLocal (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case LOGIN_LOADING:
      return loginLoadingReducer(state, action)
    default:
      return state
  }
}
