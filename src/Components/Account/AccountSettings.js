/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import GitHubAccountSettings from './GitHubAccountSettings'
import LocalAccountSettings from './LocalAccountSettings/LocalAccountSettings'
import DeleteAccountModal from './DeleteAccountModal'
import {
  getCurrentUserRequest,
  changeUserIdentifiers,
  changeUserPassword,
  changeGitHubUsername,
  deleteUserAccount,
  checkUsernameUniqueness,
  checkEmailUniqueness
} from '../../Redux/modules/user'
import {
  userFormValidation,
  userChanges,
  newGitHubUsernameFormValidation,
  validateNewUsername,
  validateNewEmail,
  validateCurrentPassword,
  validateNewPassword,
  validateConfirmNewPassword
} from '../../../server/validation/accountSettingsValidation'
const { string, func, object } = React.PropTypes

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
      },
      isValid: false
    }
  }

  onChangeHandler = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  };

  onBlurHandler = evt => {
    if (evt.target.name === 'newUsername') {
      this.setValidationError(validateNewUsername(this.state.newUsername))
      if (this.state.newUsername !== this.props.username) {
        this.props.dispatchCheckUsernameUniqueness(this.state.newUsername)
      }
    }
    if (evt.target.name === 'newEmail') {
      this.setValidationError(validateNewEmail(this.state.newEmail))
      if (this.state.newEmail !== this.props.email) {
        this.props.dispatchCheckEmailUniqueness(this.state.newEmail)
      }
    }
    if (evt.target.name === 'currentPassword') {
      this.setValidationError(
        validateCurrentPassword(this.state.currentPassword)
      )
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
    this.setState({ validationErrors: newValidationErrors }, () => {
      this.checkFormValidity()
    })
  };

  checkFormValidity = () => {
    const errorKeys = Object.keys(this.state.validationErrors)
    const errorsPresent = errorKeys
      .map(field => {
        return this.state.validationErrors[field] !== ''
      })
      .filter(result => {
        return result
      })
    if (errorsPresent[0]) {
      this.setState({ isValid: false })
    } else {
      this.setState({ isValid: true })
    }
  };

  onSubmitUserFormHandler = evt => {
    evt.preventDefault()
    const { newUsername, newEmail } = this.state
    const userData = { newUsername, newEmail }
    const prevUserData = {
      username: this.props.username,
      email: this.props.email
    }

    const validation = userFormValidation(userData)

    if (!validation.isValid) {
      return this.setValidationError(validation.validationErrors)
    }

    // only include field(s) that are different from a user's
    // current username or email
    const userDataChanges = userChanges(userData, prevUserData)

    if (!isEmpty(userDataChanges)) {
      console.log('userDataChanges', userDataChanges)
      this.props.dispatchChangeUserIdentifiers(
        userDataChanges,
        this.props.user
      )
    } else {
      console.log('no changes to submit')
      // dispatch flashMessage to inform the user that there
      // are no changes to submit
    }
  };

  onSubmitNewGitHubUsername = evt => {
    evt.preventDefault()
    const { newUsername } = this.state
    // const prevUsername = this.props.username

    const validation = newGitHubUsernameFormValidation(newUsername)

    if (!validation.isValid) {
      return this.setValidationError(validation.validationErrors)
    }

    this.props.dispatchChangeGitHubUsername({ newUsername })
  };

  onClickDeleteAccount = evt => {
    evt.preventDefault()
    this.props.dispatchDeleteUserAccount()
  };

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
    if (nextProps.username !== this.props.username) {
      this.setState({ newUsername: nextProps.username })
    }
    if (nextProps.email !== this.props.email) {
      this.setState({ newEmail: nextProps.email })
    }
    if (nextProps.newUsername.isUnique === false) {
      this.setValidationError({ newUsername: 'This username is taken' })
    }
    if (nextProps.newEmail.isUnique === false) {
      this.setValidationError({ newEmail: 'This email address is taken' })
    }
    this.checkFormValidity()
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
            onSubmitNewGitHubUsername={this.onSubmitNewGitHubUsername}
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
            dispatchChangeUserPassword={this.props.dispatchChangeUserPassword}
            validationErrors={this.state.validationErrors}
            setValdiationError={this.setValidationError}
            isValid={this.state.isValid}
            />}
        <DeleteAccountModal onClickDeleteAccount={this.onClickDeleteAccount} />
      </div>
    )
  }
}

AccountSettings.propTypes = {
  gitHubToken: string,
  username: string,
  email: string,
  user: object,
  newUsername: object,
  newEmail: object,
  dispatchGetCurrentUser: func,
  dispatchChangeUserIdentifiers: func,
  dispatchChangeUserPassword: func,
  dispatchChangeGitHubUsername: func,
  dispatchDeleteUserAccount: func,
  dispatchCheckUsernameUniqueness: func,
  dispatchCheckEmailUniqueness: func
}

const mapStateToProps = state => {
  return {
    gitHubToken: state.user.user.gitHubAccessToken,
    username: state.user.userSettings.username,
    email: state.user.userSettings.email,
    id: state.user.user.sub,
    user: state.user.user,
    newUsername: state.user.newUsername,
    newEmail: state.user.newEmail
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchGetCurrentUser () {
      dispatch(getCurrentUserRequest())
    },
    dispatchChangeUserIdentifiers (userData, currentUser) {
      dispatch(changeUserIdentifiers(userData, currentUser))
    },
    dispatchChangeUserPassword (passwordData) {
      dispatch(changeUserPassword(passwordData))
    },
    dispatchChangeGitHubUsername (newUsername) {
      dispatch(changeGitHubUsername(newUsername))
    },
    dispatchDeleteUserAccount () {
      dispatch(deleteUserAccount())
    },
    dispatchCheckUsernameUniqueness (newUsername) {
      dispatch(checkUsernameUniqueness(newUsername))
    },
    dispatchCheckEmailUniqueness (newEmail) {
      dispatch(checkEmailUniqueness(newEmail))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings)
