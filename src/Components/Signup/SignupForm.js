import React from 'react'
import Input from '../Common/Input'

const SignupForm = (props) => (
  <form className='signup-form'>
    <Input label='Username' type='text' />
    <Input label='Email Address' type='email' />
    <Input label='Password' type='password' />
    <Input label='Confirm Password' type='password' />
    <button type='submit' className='btn btn-primary'>Submit</button>
  </form>
)

export default SignupForm
