/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { signupRequest } from '../../redux/modules/signupLocal'
import Input from '../Common/Input'
import {
  signupFormValidation,
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword
} from '../../../server/validation/signupFormValidation'
import {
  checkUsernameUniqueness,
  checkEmailUniqueness
} from '../../redux/modules/user'
const { func, bool, object } = React.PropTypes

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

  onChangeHandler = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  };

  onBlurHandler = evt => {
    if (evt.target.name === 'username') {
      this.setValidationError(validateUsername(this.state.username))
      this.props.dispatchCheckUsernameUniqueness(this.state.username)
    }
    if (evt.target.name === 'email') {
      this.setValidationError(validateEmail(this.state.email))
      this.props.dispatchCheckEmailUniqueness(this.state.email)
    }
    if (evt.target.name === 'password') {
      this.setValidationError(validatePassword(this.state.password))
    }
    if (evt.target.name === 'confirmPassword') {
      this.setValidationError(
        validateConfirmPassword(this.state.password, this.state.confirmPassword)
      )
    }
  };

  setValidationError = validationResult => {
    // set the validtion result to state
    const newValidationErrors = Object.assign(
      {},
      this.state.validationErrors,
      validationResult
    )
    this.setState({ validationErrors: newValidationErrors })
  };

  onSubmitHandler = evt => {
    evt.preventDefault()
    const { username, email, password, confirmPassword } = this.state
    const userData = {
      username,
      email,
      password,
      confirmPassword
    }

    const validation = signupFormValidation(userData)

    if (validation.isValid) {
      return this.props.dispatchSignupRequest(userData)
    } else {
      return this.setValidationError(validation.validationErrors)
    }
  };

  componentWillReceiveProps (nextProps) {
    if (nextProps.newUsername.isUnique === false) {
      this.setValidationError({ username: 'This username is taken' })
    }
    if (nextProps.newEmail.isUnique === false) {
      this.setValidationError({
        email: 'This email address is already registered.'
      })
    }
  }

  render () {
    if (this.props.signupSuccessful) {
      return <Redirect to='/login' />
    }
    return (
      <form className='signup-form' onSubmit={this.onSubmitHandler}>
        <Input
          label='Username'
          type='text'
          name='username'
          onChange={this.onChangeHandler}
          onBlur={this.onBlurHandler}
          value={this.state.username}
          validationError={this.state.validationErrors.username}
        />
        <Input
          label='Email Address'
          type='email'
          name='email'
          onChange={this.onChangeHandler}
          onBlur={this.onBlurHandler}
          value={this.state.email}
          validationError={this.state.validationErrors.email}
        />
        <Input
          label='Password'
          type='password'
          name='password'
          onChange={this.onChangeHandler}
          onBlur={this.onBlurHandler}
          value={this.state.password}
          validationError={this.state.validationErrors.password}
        />
        <Input
          label='Confirm Password'
          type='password'
          name='confirmPassword'
          onChange={this.onChangeHandler}
          onBlur={this.onBlurHandler}
          value={this.state.confirmPassword}
          validationError={this.state.validationErrors.confirmPassword}
        />
        <button type='submit' className='btn btn-primary' role='button'>
          Submit
        </button>
      </form>
    )
  }
}

SignupForm.propTypes = {
  dispatchSignupRequest: func.isRequired,
  signupSuccessful: bool.isRequired,
  newUsername: object,
  newEmail: object,
  dispatchCheckUsernameUniqueness: func,
  dispatchCheckEmailUniqueness: func
}

const mapStateToProps = state => {
  return {
    signupLoading: state.signupLocal.signupLoading,
    signupSuccessful: state.signupLocal.signupSuccessful,
    newUsername: state.user.newUsername,
    newEmail: state.user.newEmail
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchSignupRequest (userData) {
      dispatch(signupRequest(userData))
    },
    dispatchCheckUsernameUniqueness (newUsername) {
      dispatch(checkUsernameUniqueness(newUsername))
    },
    dispatchCheckEmailUniqueness (newEmail) {
      dispatch(checkEmailUniqueness(newEmail))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)
