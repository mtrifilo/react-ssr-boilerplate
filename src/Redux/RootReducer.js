import { combineReducers } from 'redux'
import loginLocal from './modules/loginLocal'
import signupLocal from './modules/signupLocal'
import flashMessage from './modules/flashMessage'

export default combineReducers({
  loginLocal,
  signupLocal,
  flashMessage
})
