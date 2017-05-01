import axios from 'axios'
import removeToken from '../../auth/removeToken'
import { displayFlashMessage } from './flashMessage'

const DEFAULT_STATE = {
  user: {},
  isAuthenticated: null,
  userSettings: {}
}

// ******* Action Types *******

const SET_USER = 'SET_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const GET_USER = 'GET_USER'

// ******* Action Creators & Reducers *******

export function setUser (user = {}) {
  let isAuthenticated = false
  if (user.username) {
    isAuthenticated = true
  }
  return { type: SET_USER, user, isAuthenticated }
}
function setUserReducer (state, action) {
  return Object.assign({}, state, {
    user: action.user,
    isAuthenticated: action.isAuthenticated
  })
}

export function logoutRequest () {
  return dispatch => {
    removeToken()
    dispatch(logoutUser())
  }
}

export function logoutUser () {
  return { type: LOGOUT_USER }
}
function logoutUserReducer (state, action) {
  return Object.assign({}, state, { user: {}, isAuthenticated: false })
}

export function getCurrentUserRequest () {
  return dispatch => {
    return axios.get(`/api/user/`).then(user => {
      dispatch(getCurrentUser(user.data))
    })
  }
}

export function getCurrentUser (user) {
  return { type: GET_USER, user }
}
function getCurrentUserReducer (state, action) {
  return Object.assign({}, state, { userSettings: action.user })
}

export function changeUserIdentifiers (userData, currentUser) {
  return dispatch => {
    return axios.put('/api/user/identifiers', userData).then(res => {
      const updatedUsername = res.data.updatedUsername
      const updatedEmail = res.data.updatedEmail
      let updatedUser = {}
      if (updatedUsername) {
        updatedUser = Object.assign({}, currentUser, {
          username: updatedUsername
        })
      }
      if (updatedEmail) {
        updatedUser = Object.assign({}, currentUser, { email: updatedEmail })
      }
      console.log('changeUserIdentifiers: success!', updatedUser)
      dispatch(
        displayFlashMessage({
          message: 'Updated successfully! Please login.',
          level: 'success'
        })
      )
      dispatch(logoutRequest())
    })
  }
}

export function changeUserPassword (passwordData) {
  return dispatch => {
    return axios.put('/api/user/password', passwordData).then(res => {
      if (res.data && res.data.success) {
        dispatch(
          displayFlashMessage({
            message: 'Password updated! Please login.',
            level: 'success'
          })
        )
        return dispatch(logoutRequest())
      }
      return dispatch(
        displayFlashMessage({
          message: 'Failed to update password.',
          level: 'error'
        })
      )
    })
  }
}

export function changeGitHubUsername (newUsername) {
  return dispatch => {
    return axios.put('/api/user/githubstrategy', newUsername).then(res => {
      if (res.data && res.data.success) {
        dispatch(
          displayFlashMessage({
            message: 'Username updated! Please login with GitHub.',
            level: 'success'
          })
        )
        return dispatch(logoutRequest())
      }
      return dispatch(
        displayFlashMessage({
          message: 'Failed to update username.',
          level: 'error'
        })
      )
    })
  }
}

export default function user (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SET_USER:
      return setUserReducer(state, action)
    case LOGOUT_USER:
      return logoutUserReducer(state, action)
    case GET_USER:
      return getCurrentUserReducer(state, action)
    default:
      return state
  }
}
