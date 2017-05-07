import React, { Component } from 'react'
import isEmpty from 'lodash/isEmpty'
import Input from '../../Common/Input'
import {
  userFormValidation,
  userChanges
} from '../../../../server/validation/accountSettingsValidation'
const { func, string, object, bool } = React.PropTypes

class ChangeIdentifierForm extends Component {
  onSubmitUserFormHandler = evt => {
    evt.preventDefault()
    const { newUsername, newEmail, username, email } = this.props
    const userData = { newUsername, newEmail }
    const prevUserData = { username, email }

    const validation = userFormValidation(userData)

    if (!validation.isValid) {
      return this.props.setValidationError(validation.validationErrors)
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

  render () {
    return (
      <form
        className='AccountSettings-form'
        onSubmit={this.onSubmitUserFormHandler}
      >
        <h2 className='text-center'>User</h2>
        <Input
          label='Username'
          type='text'
          name='newUsername'
          value={this.props.newUsername}
          onChange={this.props.onChangeHandler}
          onBlur={this.props.onBlurHandler}
          validationError={this.props.validationErrors.newUsername}
        />
        <Input
          label='Email'
          type='email'
          name='newEmail'
          value={this.props.newEmail}
          onChange={this.props.onChangeHandler}
          onBlur={this.props.onBlurHandler}
          validationError={this.props.validationErrors.newEmail}
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

ChangeIdentifierForm.propTypes = {
  user: object,
  username: string,
  email: string,
  newUsername: string,
  newEmail: string,
  onChangeHandler: func,
  onBlurHandler: func,
  validationErrors: object,
  setValidationError: func,
  isValid: bool,
  dispatchChangeUserIdentifiers: func
}

export default ChangeIdentifierForm
