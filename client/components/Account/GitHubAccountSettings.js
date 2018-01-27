import React, { Component } from 'react'
import Input from '../Common/Input'
import { newGitHubUsernameFormValidation } from '../../../server/validation/accountSettingsValidation'
import { string, object, func, bool } from 'prop-types'

class GitHubAccountSettings extends Component {
  onSubmitNewGitHubUsername = evt => {
    evt.preventDefault()

    const validation = newGitHubUsernameFormValidation(this.props.newUsername)

    if (!validation.isValid) {
      return this.props.setValidationError(validation.validationErrors)
    }

    this.props.dispatchChangeGitHubUsername({
      newUsername: this.props.newUsername
    })
  }

  render () {
    return (
      <div>
        <form
          className='AccountSettings-form'
          onSubmit={this.onSubmitNewGitHubUsername}
        >
          <Input
            label='Username'
            type='text'
            name='newUsername'
            value={this.props.newUsername}
            onBlur={this.props.onBlurHandler}
            onChange={this.props.onChangeHandler}
            validationError={this.props.validationErrors.newUsername}
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

          <p className='AccountSettings-delete-link text-center'>
            <a href='#' data-toggle='modal' data-target='#deleteAccountModal'>
            Delete Account
            </a>
          </p>
      </div>
    )
  }
}

GitHubAccountSettings.propTypes = {
  newUsername: string,
  validationErrors: object,
  setValidationError: func,
  onChangeHandler: func,
  onBlurHandler: func,
  dispatchChangeGitHubUsername: func,
  isValid: bool
}

export default GitHubAccountSettings
