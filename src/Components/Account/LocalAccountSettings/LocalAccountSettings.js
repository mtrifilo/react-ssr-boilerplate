import React from 'react'
import ChangeIdentifierForm from './ChangeIdentifierForm'
import ChangePasswordForm from './ChangePasswordForm'
const { string, func, object, bool } = React.PropTypes

const LocalAccountSettings = (
  {
    username,
    email,
    currentPassword,
    newPassword,
    confirmNewPassword,
    validationErrors,
    setValidationError,
    onChangeHandler,
    onBlurHandler,
    onSubmitUserFormHandler,
    onSubmitPasswordFormHandler,
    dispatchChangeUserPassword,
    isValid
  }
) => {
  return (
    <div>
      <ChangeIdentifierForm
        onSubmitUserFormHandler={onSubmitUserFormHandler}
        onChangeHandler={onChangeHandler}
        onBlurHandler={onBlurHandler}
        validationErrors={validationErrors}
        username={username}
        email={email}
        isValid={isValid}
      />
      <ChangePasswordForm
        onSubmitPasswordFormHandler={onSubmitPasswordFormHandler}
        dispatchChangeUserPassword={dispatchChangeUserPassword}
        onChangeHandler={onChangeHandler}
        onBlurhandler={onBlurHandler}
        validationErrors={validationErrors}
        setValidationError={setValidationError}
        currentPassword={currentPassword}
        newPassword={newPassword}
        confirmNewPassword={confirmNewPassword}
        isValid={isValid}
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
  username: string,
  email: string,
  currentPassword: string,
  newPassword: string,
  confirmNewPassword: string,
  validationErrors: object,
  setValidationError: func,
  onChangeHandler: func,
  onBlurHandler: func,
  onSubmitUserFormHandler: func,
  onSubmitPasswordFormHandler: func,
  dispatchChangeUserPassword: func,
  isValid: bool
}

export default LocalAccountSettings
