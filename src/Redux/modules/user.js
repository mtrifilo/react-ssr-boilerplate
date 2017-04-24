import axios from 'axios'
import removeToken from '../../auth/removeToken'

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
  return {type: SET_USER, user, isAuthenticated}
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
  return {type: LOGOUT_USER}
}
function logoutUserReducer (state, action) {
  return Object.assign({}, state, {user: {}, isAuthenticated: false})
}

export function getCurrentUserRequest (id) {
  return dispatch => {
    return axios.get(`/api/user/`).then(user => {
      dispatch(getCurrentUser(user.data))
    })
  }
}

export function getCurrentUser (user) {
  return {type: GET_USER, user}
}
function getCurrentUserReducer (state, action) {
  return Object.assign({}, state, {userSettings: action.user})
}

export function changeUserIdentifiers (userData) {
  return dispatch => {
    return axios.put('/api/user/identifiers', userData).then(user => {
      console.log('changeUserIdentifiers: success!', user)
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
