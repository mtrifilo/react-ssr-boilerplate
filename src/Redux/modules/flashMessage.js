import map from 'lodash/map'
import clone from 'lodash/clone'

const DEFAULT_STATE = {
  flashMessages: []
}

// ******* Action Types *******

const ADD_FLASH_MESSAGE = 'ADD_FLASH_MESSAGE'
const DELETE_FLASH_MESSAGE = 'DELETE_FLASH_MESSAGE'

// ******* Action Creators & Reducers *******

export function displayFlashMessage ({message, level}) {
  return dispatch => {
    dispatch(addFlashMessage(message, level))
    setTimeout(
      () => {
        dispatch(deleteFlashMessage())
      },
      2000
    )
  }
}

function addFlashMessage (message, level) {
  return {type: ADD_FLASH_MESSAGE, message, level}
}
const addFlashMessageReducer = (state, action) => {
  return Object.assign({}, state, {
    flashMessages: [
      ...state.flashMessages,
      {
        message: action.message,
        level: action.level
      }
    ]
  })
}

function deleteFlashMessage () {
  return {type: DELETE_FLASH_MESSAGE}
}
const deleteFlashMessageReducer = (state, action) => {
  if (state.flashMessages.length >= 0) {
    let newFlashMessages = map(state.flashMessages, clone)
    newFlashMessages.splice(0, 1)
    return Object.assign({}, state, {flashMessages: newFlashMessages})
  }
  return state
}

// ******* Root Reducer Slice *******

export default function flashMessage (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      return addFlashMessageReducer(state, action)
    case DELETE_FLASH_MESSAGE:
      return deleteFlashMessageReducer(state, action)
    default:
      return state
  }
}
