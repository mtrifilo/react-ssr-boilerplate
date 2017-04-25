import React, {Component} from 'react'
import {connect} from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import GitHubAccountSettings from './GitHubAccountSettings'
import LocalAccountSettings from './LocalAccountSettings'
import {
  getCurrentUserRequest,
  changeUserIdentifiers
} from '../../Redux/modules/user'
import {
  userFormValidation,
  userChanges,
  validateNewUsername,
  validateNewEmail,
  validateCurrentPassword,
  validateNewPassword,
  validateConfirmNewPassword
} from '../../../server/validation/accountSettingsValidation'
const {string, func, object} = React.PropTypes

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
      this.setValidationError(validateNewUsername(this.state.newUsername))
    }
    if (evt.target.name === 'newEmail') {
      this.setValidationError(validateNewEmail(this.state.newEmail))
    }
    if (evt.target.name === 'currentPassword') {
      this.setValidationError(validateCurrentPassword(this.state.currentPassword))
    }
    if (evt.target.name === 'newPassword') {
      this.setValidationError(validateNewPassword(this.state.newPassword))
    }
    if (evt.target.name === 'confirmNewPassword') {
      this.setValidationError(
        validateConfirmNewPassword(
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

  onSubmitUserFormHandler = evt => {
    evt.preventDefault()
    const {newUsername, newEmail} = this.state
    const userData = {newUsername, newEmail}
    const prevUserData = {username: this.props.username, email: this.props.email}

    const validation = userFormValidation(userData)

    if (!validation.isValid) {
      return this.setValidationError(validation.validationErrors)
    }

    const userDataChanges = userChanges(userData, prevUserData)

    if (!isEmpty(userDataChanges)) {
      console.log('userDataChanges', userDataChanges)
      this.props.dispatchChangeUserIdentifiers(userDataChanges, this.props.user)
    } else {
      console.log('no changes to submit')
      // dispatch flashMessage to inform the user that there
      // are no changes to submit
    }
  }

  onSubmitPasswordFormHandler = evt => {
    evt.preventDefault()
    console.log('password change submit')
  }

  componentDidMount () {
    this.props.dispatchGetCurrentUser()
    if (this.props.username) {
      this.setState({
        newUsername: this.props.username,
        newEmail: this.props.email
      })
    }
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
            onSubmitUserFormHandler={this.onSubmitUserFormHandler}
            onSubmitPasswordFormHandler={this.onSubmitPasswordFormHandler}
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
  user: object,
  dispatchGetCurrentUser: func,
  dispatchChangeUserIdentifiers: func
}

const mapStateToProps = state => {
  return {
    gitHubToken: state.user.user.gitHubAccessToken,
    username: state.user.userSettings.username,
    email: state.user.userSettings.email,
    id: state.user.user.sub,
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchGetCurrentUser () {
      dispatch(getCurrentUserRequest())
    },
    dispatchChangeUserIdentifiers (userData, currentUser) {
      dispatch(changeUserIdentifiers(userData, currentUser))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings)
