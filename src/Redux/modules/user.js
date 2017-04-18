import removeToken from '../../auth/removeToken'

const DEFAULT_STATE = {
  user: {},
  isAuthenticated: null
}

// ******* Action Types *******

const SET_USER = 'SET_USER'
const LOGOUT_USER = 'LOGOUT_USER'

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

export default function user (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SET_USER:
      return setUserReducer(state, action)
    case LOGOUT_USER:
      return logoutUserReducer(state, action)
    default:
      return state
  }
}
