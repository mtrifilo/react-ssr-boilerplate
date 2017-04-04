import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loginRequest } from '../../Redux/modules/loginLocal'
import Input from '../Common/Input'
import {
  validateIdentifier,
  validatePassword
} from '../../../server/validation/loginFormValidation'

class LoginForm extends Component {
  constructor () {
    super()
    this.state = {
      identifier: '',
      password: '',
      validationErrors: {
        identifier: '',
        password: ''
      }
    }
  }

  onChangeHandler = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  onBlurHandler = (evt) => {
    if (evt.target.name === 'identifier') {
      this.setValidationError(validateIdentifier(this.state.identifier))
    }
    if (evt.target.name === 'password') {
      this.setValidationError(validatePassword(this.state.password))
    }
  }

  setValidationError = (validationResult) => {
    // Set validation result to state
    const newValidationErrors = Object.assign({}, this.state.validationErrors, validationResult)
    this.setState({ validationErrors: newValidationErrors })
  }

  onSubmitHandler = (evt) => {
    evt.preventDefault()
    console.log('evt', evt.target)
  }

  render () {
    return (
      <form className='login-form' onSubmit={this.onSubmitHandler}>
        <Input
          label='Email'
          type='text'
          name='identifier'
          onChange={this.onChangeHandler}
          onBlur={this.onBlurHandler}
          value={this.state.identifier}
          validationError={this.state.validationErrors.identifier} />
        <Input
          label='Password'
          type='password'
          name='password'
          onChange={this.onChangeHandler}
          onBlur={this.onBlurHandler}
          value={this.state.password}
          validationError={this.state.validationErrors.password} />
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loginLoading: state.loginLocal.loginLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchLoginRequest (userData) {
      dispatch(loginRequest(userData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
