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
    this.setState({[evt.target.name]: evt.target.value})
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
    console.log('validationResult', validationResult)
    console.log('newValidationErrors', newValidationErrors)
    this.setState({validationErrors: newValidationErrors})
  };

  componentDidMount () {
    this.props.dispatchGetCurrentUser(this.props.id)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.username) {
      this.setState({
        newUsername: nextProps.username,
        newEmail: nextProps.email
      })
    }
  }

  render () {
    return (
      <div>
        <h1 className='text-center page-title'>Account Settings</h1>
        {this.props.gitHubToken
          ? <GitHubAccountSettings
            username={this.state.newUsername}
            onChangeHandler={this.onChangeHandler}
            onBlurHandler={this.onBlurHandler}
            validationErrors={this.state.validationErrors}
            />
          : <LocalAccountSettings
            username={this.state.newUsername}
            email={this.state.newEmail}
            currentPassword={this.state.currentPassword}
            newPassword={this.state.newPassword}
            confirmNewPassword={this.state.confirmNewPassword}
            onChangeHandler={this.onChangeHandler}
            onBlurHandler={this.onBlurHandler}
            validationErrors={this.state.validationErrors}
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
