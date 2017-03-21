import React from 'react'

const SignupForm = (props) => (
  <form className='signup-form'>
    <div className='form-group'>
      <label>Username</label>
      <input type='text' className='form-control' />
    </div>
    <div className='form-group'>
      <label>Email Address</label>
      <input type='text' className='form-control' />
    </div>
    <div className='form-group'>
      <label>Password</label>
      <input type='password' className='form-control' />
    </div>
    <div className='form-group'>
      <label>Confirm Password</label>
      <input type='password' className='form-control' />
    </div>
    <button type='submit' className='btn btn-primary'>Submit</button>
  </form>
)

export default SignupForm
