import React, {Component} from 'react'
import {connect} from 'react-redux'
import GitHubAccountSettings from './GitHubAccountSettings'
import LocalAccountSettings from './LocalAccountSettings'
import {getCurrentUserRequest} from '../../Redux/modules/user'
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword
} from '../../../server/validation/signupFormValidation'
const {string, func} = React.PropTypes

class AccountSettings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newUsername: '',
      newEmail: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      validationErrors: {
        newUsername: '',
        newEmail: '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      }
    }
  }

  onChangeHandler = evt => {
    this.setState({[evt.target.name]: evt.value})
  };

  onBlurHandler = evt => {
    if (evt.target.name === 'newUsername') {
      this.setValidationError(validateUsername(this.state.newUsername))
    }
    if (evt.target.name === 'newEmail') {
      this.setValidationError(validateEmail(this.state.newEmail))
    }
    if (evt.target.name === 'currentPassword') {
      this.setValidationError(validatePassword(this.state.currentPassword))
    }
    if (evt.target.name === 'newPassword') {
      this.setValidationError(validatePassword(this.state.newPassword))
    }
    if (evt.target.name === 'confirmNewPassword') {
      this.setValidationError(
        validateConfirmPassword(
          this.state.newPassword,
          this.state.confirmNewPassword
        )
      )
    }
  };

  setValidationError = validationResult => {
    // set the validtion result to state
    const newValidationErrors = Object.assign(
      {},
      this.state.validationErrors,
      validationResult
    )
    this.setState({validationErrors: newValidationErrors})
  };

  componentDidMount () {
    this.props.dispatchGetCurrentUser(this.props.id)
  }

  render () {
    return (
      <div>
        <h1 className='text-center page-title'>Account Settings</h1>
        {this.props.gitHubToken
          ? <GitHubAccountSettings
            username={this.props.username}
            onChangeHandler={this.onChangeHandler}
            onBlurHandler={this.onBlurHandler}
            />
          : <LocalAccountSettings
            username={this.props.username}
            email={this.props.email}
            onChangeHandler={this.onChangeHandler}
            onBlurHandler={this.onBlurHandler}
            />}
      </div>
    )
  }
}

AccountSettings.propTypes = {
  gitHubToken: string,
  username: string,
  email: string,
  id: string,
  dispatchGetCurrentUser: func
}

const mapStateToProps = state => {
  return {
    gitHubToken: state.user.user.gitHubAccessToken,
    username: state.user.userSettings.username,
    email: state.user.userSettings.email,
    id: state.user.user.sub
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchGetCurrentUser (id) {
      dispatch(getCurrentUserRequest(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings)
