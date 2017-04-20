import React from 'react'
import Input from '../Common/Input'
const {string} = React.PropTypes

const LocalAccountSettings = ({username, email}) => {
  console.log('LocalAccountSettings email:', email)
  return (
    <form className='AccountSettings-form'>
      <Input label='Username' type='text' name='newUsername' value={username} />
      <Input label='Email' type='email' name='newEmail' value={email} />
      <button type='submit' className='btn btn-primary' role='button'>
        Submit Changes
      </button>
    </form>
  )
}

LocalAccountSettings.propTypes = {
  username: string,
  email: string
}

export default LocalAccountSettings
