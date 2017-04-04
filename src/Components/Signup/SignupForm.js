import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signupRequest } from '../../Redux/modules/signupLocal'
import Input from '../Common/Input'
import {
  signupFormValidation,
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword
} from '../../../server/validation/signupFormValidation'
const { func } = React.PropTypes

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
    // set the validtion result to state
    const newValidationErrors = Object.assign({}, this.state.validationErrors, validationResult)
    this.setState({ validationErrors: newValidationErrors })
  }

  submitHandler = (evt) => {
    evt.preventDefault()
    const { username, email, password, confirmPassword } = this.state
    const userData = {
      username,
      email,
      password,
      confirmPassword
    }
    console.log('userData:', userData)

    const validation = signupFormValidation(userData)
    console.log('validation:', validation)

    if (validation.isValid) {
      return this.props.dispatchSignupRequest(userData)
    } else {
      return this.setValidationError(validation.validationErrors)
    }
  }

  render () {
    return (
      <form className='signup-form' onSubmit={this.submitHandler} >
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
        <button type='submit' className='btn btn-primary' role='button'>Submit</button>
      </form>
    )
  }
}

SignupForm.propTypes = {
  dispatchSignupRequest: func.isRequired
}

const mapStateToProps = (state) => {
  return {
    signupLoading: state.signupLocal.signupLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSignupRequest (userData) {
      dispatch(signupRequest(userData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)
