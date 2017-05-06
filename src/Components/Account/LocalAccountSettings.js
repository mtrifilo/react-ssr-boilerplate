import React from 'react'
import Input from '../Common/Input'
const { string, func, object, bool } = React.PropTypes

const LocalAccountSettings = (
  {
    username,
    email,
    currentPassword,
    newPassword,
    confirmNewPassword,
    validationErrors,
    onChangeHandler,
    onBlurHandler,
    onSubmitUserFormHandler,
    onSubmitPasswordFormHandler,
    isValid
  }
) => {
  return (
    <div>
      <form className='AccountSettings-form' onSubmit={onSubmitUserFormHandler}>
        <h2 className='text-center'>User</h2>
        <Input
          label='Username'
          type='text'
          name='newUsername'
          value={username}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          validationError={validationErrors.newUsername}
        />
        <Input
          label='Email'
          type='email'
          name='newEmail'
          value={email}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          validationError={validationErrors.newEmail}
        />
        <button
          disabled={!isValid}
          type='submit'
          className='btn btn-primary'
          role='button'
        >
          Submit Changes
        </button>
      </form>
      <form
        className='AccountSettings-form'
        onSubmit={onSubmitPasswordFormHandler}
      >
        <h2 className='text-center'>Password</h2>
        <Input
          label='Current Password'
          type='password'
          name='currentPassword'
          value={currentPassword}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          validationError={validationErrors.currentPassword}
        />
        <Input
          label='New Password'
          type='password'
          name='newPassword'
          value={newPassword}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          validationError={validationErrors.newPassword}
        />
        <Input
          label='Confirm New Password'
          type='password'
          name='confirmNewPassword'
          value={confirmNewPassword}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          validationError={validationErrors.confirmNewPassword}
        />
        <button
          disabled={!isValid}
          type='submit'
          className='btn btn-primary'
          role='button'
        >
          Submit Changes
        </button>
      </form>

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
  onChangeHandler: func,
  onBlurHandler: func,
  onSubmitUserFormHandler: func,
  onSubmitPasswordFormHandler: func,
  isValid: bool
}

export default LocalAccountSettings
