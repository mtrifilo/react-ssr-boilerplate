import React from 'react'
import { connect } from 'react-redux'
import FlashMessage from './FlashMessage'
import { array } from 'prop-types'

const FlashMessageContainer = ({ flashMessages }) => {
  const displayFlashMessages = flashMessages.map(({ message, level }) => (
    <FlashMessage key={message} message={message} level={level} />
  ))
  return <div>{displayFlashMessages}</div>
}

FlashMessageContainer.propTypes = {
  flashMessages: array.isRequired
}

const mapStateToProps = state => {
  return {
    flashMessages: state.flashMessage.flashMessages
  }
}

export default connect(mapStateToProps)(FlashMessageContainer)
