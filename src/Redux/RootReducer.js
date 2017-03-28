import { combineReducers } from 'redux'
import signupLocal from './modules/signupLocal'
import flashMessage from './modules/flashMessage'

export default combineReducers({
  signupLocal,
  flashMessage
})
