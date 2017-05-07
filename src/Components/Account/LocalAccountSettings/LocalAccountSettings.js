import React from 'react'
import { connect } from 'react-redux'
import ChangeIdentifierForm from './ChangeIdentifierForm'
import ChangePasswordForm from './ChangePasswordForm'
import {
  changeUserIdentifiers,
  changeUserPassword
} from '../../../Redux/modules/user'
const { string, func, object } = React.PropTypes

const LocalAccountSettings = (
  {
    user,
    username,
    email,
    newUsername,
    newEmail,
    currentPassword,
    newPassword,
    confirmNewPassword,
    validationErrors,
    setValidationError,
    onChangeHandler,
    onBlurHandler,
    dispatchChangeUserPassword,
    dispatchChangeUserIdentifiers,
    isValid
  }
) => {
  return (
    <div>
      <ChangeIdentifierForm
        onChangeHandler={onChangeHandler}
        onBlurHandler={onBlurHandler}
        dispatchChangeUserIdentifiers={dispatchChangeUserIdentifiers}
        validationErrors={validationErrors}
        setValidationError={setValidationError}
        user={user}
        username={username}
        email={email}
        newUsername={newUsername}
        newEmail={newEmail}
        isValid={isValid.identifiers}
      />
      <ChangePasswordForm
        dispatchChangeUserPassword={dispatchChangeUserPassword}
        onChangeHandler={onChangeHandler}
        onBlurHandler={onBlurHandler}
        validationErrors={validationErrors}
        setValidationError={setValidationError}
        currentPassword={currentPassword}
        newPassword={newPassword}
        confirmNewPassword={confirmNewPassword}
        isValid={isValid.password}
      />

      <p className='AccountSettings-delete-link text-center'>
        <a href='#' data-toggle='modal' data-target='#deleteAccountModal'>
          Delete Account
        </a>
      </p>

    </div>
  )
}

LocalAccountSettings.propTypes = {
  user: object,
  username: string,
  email: string,
  newUsername: string,
  newEmail: string,
  currentPassword: string,
  newPassword: string,
  confirmNewPassword: string,
  validationErrors: object,
  setValidationError: func,
  onChangeHandler: func,
  onBlurHandler: func,
  dispatchChangeUserPassword: func,
  dispatchChangeUserIdentifiers: func,
  isValid: object
}

const mapStateToProps = state => {
  return {
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchChangeUserPassword (passwordData) {
      dispatch(changeUserPassword(passwordData))
    },
    dispatchChangeUserIdentifiers (userData, currentUser) {
      dispatch(changeUserIdentifiers(userData, currentUser))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  LocalAccountSettings
)
