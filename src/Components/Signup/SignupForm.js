import React, { Component } from 'react'
import Input from '../Common/Input'

class SignupForm extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      validationErrors: {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
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
          value={this.state.username}
          validationError={this.state.validationErrors.username} />
        <Input
          label='Email Address'
          type='email'
          name='email'
          onChange={this.onChangeHandler}
          value={this.state.email}
          validationError={this.state.validationErrors.email} />
        <Input
          label='Password'
          type='password'
          name='password'
          onChange={this.onChangeHandler}
          value={this.state.password}
          validationError={this.state.validationErrors.password} />
        <Input
          label='Confirm Password'
          type='password'
          name='confirmPassword'
          onChange={this.onChangeHandler}
          value={this.state.confirmPassword}
          validationError={this.state.validationErrors.confirmPassord} />
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    )
  }
}

export default SignupForm
