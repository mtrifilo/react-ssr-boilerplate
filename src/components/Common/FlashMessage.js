import React, { Component } from 'react'
import classnames from 'classnames'
import { string } from 'prop-types'

class FlashMessage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      display: false
    }
  }

  showMessage = () => {
    if (this.state.display) {
      setTimeout(() => {
        this.setState({ display: false })
      }, 1500)
    }
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ display: true })
    }, 50)
  };

  render () {
    this.showMessage()
    return (
      <div
        className={classnames('alert FlashMessage-message', {
          'alert-success': this.props.level === 'success',
          'alert-danger': this.props.level === 'error',
          'FlashMessage-show': this.state.display,
          'FlashMessage-hide': !this.state.display
        })}
      >
        {this.props.message}
      </div>
    )
  }
}

FlashMessage.propTypes = {
  message: string,
  level: string
}

export default FlashMessage
