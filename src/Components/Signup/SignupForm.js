import React, { Component } from 'react'
import Input from '../Common/Input'

class SignupForm extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  onChangeHandler = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  render () {
    return (
      <form className='signup-form'>
        <Input
          label='Username'
          type='text'
          name='username'
          onChange={this.onChangeHandler}
          value={this.state.username} />
        <Input
          label='Email Address'
          type='email'
          name='email'
          onChange={this.onChangeHandler}
          value={this.state.email} />
        <Input
          label='Password'
          type='password'
          name='password'
          onChange={this.onChangeHandler}
          value={this.state.password} />
        <Input
          label='Confirm Password'
          type='password'
          name='confirmPassword'
          onChange={this.onChangeHandler}
          value={this.state.confirmPassword} />
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    )
  }
}

export default SignupForm
