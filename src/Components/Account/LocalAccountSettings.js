import React from 'react'
import Input from '../Common/Input'
const {string} = React.PropTypes

const LocalAccountSettings = ({username, email}) => {
  console.log('LocalAccountSettings email:', email)
  return (
    <form className='AccountSettings-form'>
      <h2 className='text-center'>User</h2>
      <Input label='Username' type='text' name='newUsername' value={username} />
      <Input label='Email' type='email' name='newEmail' value={email} />
      <h2 className='text-center'>Password</h2>
      <Input label='Current Password' type='password' name='currentPassword' />
      <Input label='New Password' type='password' name='newPassword' />
      <Input label='Confirm New Password' type='password' name='confirmNewPassword' />
      <button type='submit' className='btn btn-primary' role='button'>
        Submit Changes
      </button>
      <p className='AccountSettings-delete-link'>Delete Account</p>
    </form>
  )
}

LocalAccountSettings.propTypes = {
  username: string,
  email: string
}

export default LocalAccountSettings
