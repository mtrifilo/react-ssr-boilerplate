import React from 'react'
import classnames from 'classnames'
const { string } = React.PropTypes

const FlashMessage = ({message, level}) => (
  <div className={classnames('alert', {
    'alert-success': level === 'success',
    'alert-danger': level === 'error'
  })}>
    {message}
  </div>
)

FlashMessage.propTypes = {
  message: string,
  level: string
}

export default FlashMessage
