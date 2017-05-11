import React, { Component } from 'react'
import Input from '../../Common/Input'
import {
  passwordFormValidation
} from '../../../../server/validation/accountSettingsValidation'
import { func, string, object, bool } from 'prop-types'

class ChangePasswordForm extends Component {
  onSubmitPasswordFormHandler = evt => {
    evt.preventDefault()
    const { currentPassword, newPassword, confirmNewPassword } = this.props
    const passwordData = { currentPassword, newPassword, confirmNewPassword }

    const validation = passwordFormValidation(passwordData)

    if (!validation.isValid) {
      return this.props.setValidationError(validation.validationErrors)
    }
    this.props.dispatchChangeUserPassword(passwordData)
  };

  render () {
    return (
      <form
        className='AccountSettings-form'
        onSubmit={this.onSubmitPasswordFormHandler}
      >
        <h2 className='text-center'>Password</h2>
        <Input
          label='Current Password'
          type='password'
          name='currentPassword'
          value={this.props.currentPassword}
          onChange={this.props.onChangeHandler}
          onBlur={this.props.onBlurHandler}
          validationError={this.props.validationErrors.currentPassword}
        />
        <Input
          label='New Password'
          type='password'
          name='newPassword'
          value={this.props.newPassword}
          onChange={this.props.onChangeHandler}
          onBlur={this.props.onBlurHandler}
          validationError={this.props.validationErrors.newPassword}
        />
        <Input
          label='Confirm New Password'
          type='password'
          name='confirmNewPassword'
          value={this.props.confirmNewPassword}
          onChange={this.props.onChangeHandler}
          onBlur={this.props.onBlurHandler}
          validationError={this.props.validationErrors.confirmNewPassword}
        />
        <button
          disabled={!this.props.isValid}
          type='submit'
          className='btn btn-primary'
          role='button'
        >
          Submit Changes
        </button>
      </form>
    )
  }
}

ChangePasswordForm.propTypes = {
  onChangeHandler: func,
  onBlurHandler: func,
  dispatchChangeUserPassword: func,
  validationErrors: object,
  setValidationError: func,
  currentPassword: string,
  newPassword: string,
  confirmNewPassword: string,
  isValid: bool
}

export default ChangePasswordForm
