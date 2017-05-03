import React from 'react'
import Input from '../Common/Input'
const { string, object, func } = React.PropTypes

const GitHubAccountSettings = (
  {
    username,
    validationErrors,
    onChangeHandler,
    onBlurHandler,
    onSubmitNewGitHubUsername
  }
) => {
  return (
    <div>
      <form
        className='AccountSettings-form'
        onSubmit={onSubmitNewGitHubUsername}
      >
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

      <p className='AccountSettings-delete-link text-center'>
        <a href='#' data-toggle='modal' data-target='#deleteAccountModal'>
          Delete Account
        </a>
      </p>

    </div>
  )
}

GitHubAccountSettings.propTypes = {
  username: string,
  validationErrors: object,
  onChangeHandler: func,
  onBlurHandler: func,
  onSubmitNewGitHubUsername: func
}

export default GitHubAccountSettings
