import React from 'react'
import Input from '../../Common/Input'
const { func, string, object, bool } = React.PropTypes

const ChangeIdentifierForm = (
  {
    onSubmitUserFormHandler,
    username,
    email,
    onChangeHandler,
    onBlurHandler,
    validationErrors,
    isValid
  }
) => {
  return (
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
  )
}

ChangeIdentifierForm.propTypes = {
  onSubmitUserFormHandler: func,
  username: string,
  email: string,
  onChangeHandler: func,
  onBlurHandler: func,
  validationErrors: object,
  isValid: bool
}

export default ChangeIdentifierForm
