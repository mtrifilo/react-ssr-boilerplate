import axios from 'axios'
import { displayFlashMessage } from './flashMessage'

const DEFAULT_STATE = {
  signupLoading: false,
  signupSuccessful: false
}

// ******* Action Types *******

const SIGNUP_LOADING = 'SIGNUP_LOADING'
const SIGNUP_SUCCESSFUL = 'SIGNUP_SUCCESSFUL'

// ******* Action Creators & Reducers *******

export function signupRequest (userData) {
  return dispatch => {
    dispatch(signupLoading(true))
    return axios
      .post('/api/signup', userData)
      .then(res => {
        dispatch(signupLoading(false))
        dispatch(signupSuccessful(true))
        console.log('signup success!', res)
        // signupForm will redirect the user to the login page
        // when signupSuccessful is true.
        setTimeout(() => {
          dispatch(signupSuccessful(false))
        }, 500)
        dispatch(
          displayFlashMessage({
            message: 'Signup successful! You can login.',
            level: 'success'
          })
        )
      })
      .catch(err => {
        console.error('redux: signupLocal: signupRequest failed', err)
        dispatch(signupLoading(false))
        dispatch(signupSuccessful(false))
        dispatch(
          displayFlashMessage({
            message: "Signup failed. That's an error.",
            level: 'error'
          })
        )
      })
  }
}

export function signupLoading (bool) {
  return { type: SIGNUP_LOADING, signupLoading: bool }
}
function signupLoadingReducer (state, action) {
  return Object.assign({}, state, { signupLoading: action.signupLoading })
}

export function signupSuccessful (bool) {
  return { type: SIGNUP_SUCCESSFUL, signupSuccessful: bool }
}
function signupSuccessfulReducer (state, action) {
  return Object.assign({}, state, {
    signupSuccessful: action.signupSuccessful
  })
}

// ******* Root Reducer Slice *******

export default function signupLocal (state = DEFAULT_STATE, action) {
  switch (action.type) {
  case SIGNUP_LOADING:
    return signupLoadingReducer(state, action)
  case SIGNUP_SUCCESSFUL:
    return signupSuccessfulReducer(state, action)
  default:
    return state
  }
}
