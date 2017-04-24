import React from 'react'
import Input from '../Common/Input'
const {string, func, object} = React.PropTypes

const LocalAccountSettings = ({username, email, validationErrors, onChangeHandler, onBlurHandler}) => {
  console.log('LocalAccountSettings email:', email)
  return (
    <form className='AccountSettings-form'>
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
      <h2 className='text-center'>Password</h2>
      <Input
        label='Current Password'
        type='password'
        name='currentPassword'
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        validationError={validationErrors.currentPassword}
      />
      <Input
        label='New Password'
        type='password'
        name='newPassword'
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        validationError={validationErrors.newPassword}
      />
      <Input
        label='Confirm New Password'
        type='password'
        name='confirmNewPassword'
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        validationError={validationErrors.confirmNewPassword}
      />
      <button type='submit' className='btn btn-primary' role='button'>
        Submit Changes
      </button>
      <p className='AccountSettings-delete-link'>Delete Account</p>
    </form>
  )
}

LocalAccountSettings.propTypes = {
  username: string,
  email: string,
  validationErrors: object,
  onChangeHandler: func,
  onBlurHandler: func
}

export default LocalAccountSettings
