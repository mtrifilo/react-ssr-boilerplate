import { combineReducers } from 'redux'
import { reducer as notifReducer } from 'redux-notifications'
import signupLocal from './modules/signupLocal'

export default combineReducers({
  notifs: notifReducer,
  signupLocal
})
