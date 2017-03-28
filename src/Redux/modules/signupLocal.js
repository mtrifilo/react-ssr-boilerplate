import axios from 'axios'
import { displayFlashMessage } from './flashMessage'

const DEFAULT_STATE = {
  signupLoading: false
}

// ******* Action Type *******

const SIGNUP_LOADING = 'SIGNUP_LOADING'

// ******* Action Creators & Reducer *******

export function signupRequest (userData) {
  return dispatch => {
    dispatch(signupLoading(true))
    return axios.post('/api/signup', userData)
      .then(res => {
        dispatch(signupLoading(false))
        dispatch(displayFlashMessage({ message: 'Signup successful! You can login.', level: 'success' }))
      })
      .catch(err => {
        console.error('redux: signupLocal: signupRequest failed', err)
        dispatch(signupLoading(false))
        dispatch(displayFlashMessage({ message: 'Signup failed. That\'s an error.', level: 'error' }))
      })
  }
}

export function signupLoading (bool) {
  return { type: SIGNUP_LOADING, signupLoading: bool }
}
function signupLoadingReducer (state, action) {
  return Object.assign({}, state, { signupLoading: action.signupLoading })
}

// ******* Root Reducer Slice *******

export default function signupLocal (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SIGNUP_LOADING:
      return signupLoadingReducer(state, action)
    default:
      return state
  }
}
