import React from 'react'
import Input from '../Common/Input'
const { string, object, func } = React.PropTypes

const GitHubAccountSettings = (
  { username, validationErrors, onChangeHandler, onBlurHandler }
) => {
  return (
    <form className='AccountSettings-form'>
      <Input
        label='Username'
        type='text'
        name='newUsername'
        value={username}
        onBlur={onBlurHandler}
        onChange={onChangeHandler}
        validationError={validationErrors.newUsername}
      />
      <button type='submit' className='btn btn-primary' role='button'>
        Submit Changes
      </button>
    </form>
  )
}

GitHubAccountSettings.propTypes = {
  username: string,
  validationErrors: object,
  onChangeHandler: func,
  onBlurHandler: func
}

export default GitHubAccountSettings
