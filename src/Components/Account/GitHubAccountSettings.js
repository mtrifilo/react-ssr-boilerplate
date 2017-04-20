import React from 'react'
import Input from '../Common/Input'
const {string} = React.PropTypes

const GitHubAccountSettings = ({username}) => {
  return (
    <form className='AccountSettings-form'>
      <Input label='Username' type='text' name='newUsername' value={username} />
      <button type='submit' className='btn btn-primary' role='button'>
        Submit Changes
      </button>
    </form>
  )
}

GitHubAccountSettings.propTypes = {
  username: string
}

export default GitHubAccountSettings
