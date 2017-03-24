import React, { Component } from 'react'
import Input from '../Common/Input'
import isEmpty from 'lodash/isEmpty'
import {
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword
} from '../../../server/validation/signupFormValidation'

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

  onBlurHandler = (evt) => {
    if (evt.target.name === 'username') {
      this.setValidationError(validateUsername(this.state.username))
    }
    if (evt.target.name === 'email') {
      this.setValidationError(validateEmail(this.state.email))
    }
    if (evt.target.name === 'password') {
      this.setValidationError(validatePassword(this.state.password))
    }
    if (evt.target.name === 'confirmPassword') {
      this.setValidationError(
        validateConfirmPassword(this.state.password, this.state.confirmPassword)
      )
    }
  }

  setValidationError = (validationResult) => {
    // If a validation error is present, set it to state
    if (!isEmpty(validationResult)) {
      const newValidationErrors = Object.assign({}, this.state.validationErrors, validationResult)
      this.setState({ validationErrors: newValidationErrors })
    }
  }

  render () {
    return (
      <form className='signup-form'>
        <Input
          label='Username'
          type='text'
          name='username'
          onChange={this.onChangeHandler}
          onBlur={this.onBlurHandler}
          value={this.state.username}
          validationError={this.state.validationErrors.username} />
        <Input
          label='Email Address'
          type='email'
          name='email'
          onChange={this.onChangeHandler}
          onBlur={this.onBlurHandler}
          value={this.state.email}
          validationError={this.state.validationErrors.email} />
        <Input
          label='Password'
          type='password'
          name='password'
          onChange={this.onChangeHandler}
          onBlur={this.onBlurHandler}
          value={this.state.password}
          validationError={this.state.validationErrors.password} />
        <Input
          label='Confirm Password'
          type='password'
          name='confirmPassword'
          onChange={this.onChangeHandler}
          onBlur={this.onBlurHandler}
          value={this.state.confirmPassword}
          validationError={this.state.validationErrors.confirmPassword} />
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    )
  }
}

export default SignupForm
