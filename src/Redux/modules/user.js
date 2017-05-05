import axios from 'axios'
import removeToken from '../../auth/removeToken'
import { displayFlashMessage } from './flashMessage'

const DEFAULT_STATE = {
  user: {},
  isAuthenticated: null,
  userSettings: {},
  newUsername: {
    error: null,
    isUnique: null
  },
  newEmail: {
    error: null,
    isUnique: null
  }
}

// ******* Action Types *******

const SET_USER = 'SET_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const GET_USER = 'GET_USER'
const SET_USERNAME_UNIQUENESS_RESULT = 'SET_USERNAME_UNIQUENESS_RESULT'

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
    return axios
      .put('/api/user/identifiers', userData)
      .then(res => {
        dispatch(
          displayFlashMessage({
            message: 'Updated successfully! Please login.',
            level: 'success'
          })
        )
        dispatch(logoutRequest())
      })
      .catch(err => {
        console.error('changeUserIdentifiers failed:', err)
        dispatch(
          displayFlashMessage({
            message: 'Failed to update.',
            level: 'error'
          })
        )
      })
  }
}

export function changeUserPassword (passwordData) {
  return dispatch => {
    return axios
      .put('/api/user/password', passwordData)
      .then(res => {
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
      .catch(err => {
        console.error('changeUserPassword failed:', err)
        dispatch(
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
    return axios
      .put('/api/user/githubstrategy', newUsername)
      .then(res => {
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
      .catch(err => {
        console.error('username update failed:', err)
        return dispatch(
          displayFlashMessage({
            message: 'Failed to update username',
            level: 'error'
          })
        )
      })
  }
}

export function deleteUserAccount () {
  return dispatch => {
    return axios
      .delete('/api/user/')
      .then(res => {
        console.log('deleteUserAccount response:', res.data)
        if (res.data && res.data.success) {
          dispatch(
            displayFlashMessage({
              message: 'Account deleted. Goodbye!',
              level: 'success'
            })
          )
          return dispatch(logoutRequest())
        }
        return dispatch(
          displayFlashMessage({
            message: 'Failed to delete account.',
            level: 'error'
          })
        )
      })
      .catch(err => {
        console.error('failed to delete account:', err)
        return dispatch(
          displayFlashMessage({
            message: 'Failed to delete account.',
            level: 'error'
          })
        )
      })
  }
}

/**
 * Checks if a new username already exists on the server
 *
 * An object will be passed to the .then function: { error: { newUsername: 'error desc'}, isUnique: bool }
 */

export function checkUsernameUniqueness (newUsername) {
  return dispatch => {
    return axios.get(`/api/user/${newUsername}`).then(result => {
      dispatch(setUsernameUniquenessResult(result.isUnique))
    })
  }
}

export function setUsernameUniquenessResult (bool) {
  return {
    type: SET_USERNAME_UNIQUENESS_RESULT,
    isUnique: bool
  }
}
function setUsernameUniquenessResultReducer (state, action) {
  return Object.assign({}, state, {
    newUsername: { isUnique: action.isUnique }
  })
}

export default function user (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SET_USER:
      return setUserReducer(state, action)
    case LOGOUT_USER:
      return logoutUserReducer(state, action)
    case GET_USER:
      return getCurrentUserReducer(state, action)
    case SET_USERNAME_UNIQUENESS_RESULT:
      return setUsernameUniquenessResultReducer(state, action)
    default:
      return state
  }
}
