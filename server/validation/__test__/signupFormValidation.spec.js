/* eslint-env node, jest */
import {
  signupFormValidation,
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmPassword
  } from '../signupFormValidation'

/**
 * signupFormValidation
 */

test('signupFormValidation: signupFormValidation should return no errors if all data is valid', () => {
  const data = {
    username: 'coolUser',
    email: 'coolUser@future.net',
    password: 'shh',
    confirmPassword: 'shh'
  }
  const validated = signupFormValidation(data)
  expect(validated.isValid).toBe(true)
})

test('signupFormValidation: signupFormValidation should return username error if username is empty', () => {
  const data = {
    username: '',
    email: 'coolUser@future.net',
    password: 'shh',
    confirmPassword: 'shh'
  }
  const validated = signupFormValidation(data)
  expect(validated.isValid).toBe(false)
  expect(validated.validationErrors.username).toBe('A username is required')
})

test('signupFormValidation: signupFormValidation should return email error if email is invalid', () => {
  const data = {
    username: 'coolUser',
    email: 'coolUserfuture.net',
    password: 'shh',
    confirmPassword: 'shh'
  }
  const validated = signupFormValidation(data)
  expect(validated.isValid).toBe(false)
  expect(validated.validationErrors.email).toBe('This email address is not valid')
})

test('signupFormValidation: signupFormValidation should return email error if email is blank', () => {
  const data = {
    username: 'coolUser',
    email: '',
    password: 'shh',
    confirmPassword: 'shh'
  }
  const validated = signupFormValidation(data)
  expect(validated.isValid).toBe(false)
  expect(validated.validationErrors.email).toBe('An email address is required')
})

test('signupFormValidation: signupFormValidation should return password error if password is blank', () => {
  const data = {
    username: 'coolUser',
    email: 'coolUser@future.net',
    password: '',
    confirmPassword: 'shh'
  }
  const validated = signupFormValidation(data)
  expect(validated.isValid).toBe(false)
  expect(validated.validationErrors.password).toBe('A password is required')
})

test('signupFormValidation: signupFormValidation should return confirmPassword error if confirmPassword is blank', () => {
  const data = {
    username: 'coolUser',
    email: 'coolUser@future.net',
    password: 'shh',
    confirmPassword: ''
  }
  const validated = signupFormValidation(data)
  expect(validated.isValid).toBe(false)
  expect(validated.validationErrors.confirmPassword).toBe('Please confirm your password')
})

test('signupFormValidation: signupFormValidation should return confirmPassword error if confirmPassword does not match password', () => {
  const data = {
    username: 'coolUser',
    email: 'coolUser@future.net',
    password: 'shh',
    confirmPassword: 'YELLING'
  }
  const validated = signupFormValidation(data)
  expect(validated.isValid).toBe(false)
  expect(validated.validationErrors.confirmPassword).toBe('Passwords don\'t match, try again')
})

/**
 * validateUsername
 */

test('validateUsername: should return username error if username is empty', () => {
  const validated = validateUsername('')
  expect(validated.username).toBe('A username is required')
})

test('validateUsername: should return { username: \'\' } if username is valid', () => {
  const validated = validateUsername('coolUser')
  expect(validated.username).toBe('')
})

test('validateUsername: should return validation failure if username is not a string', () => {
  const validated = validateUsername(false)
  expect(validated.username).toBe('username validation failed')
})

/**
 * validateEmail
 */

test('validateEmail: should return email error if email is empty', () => {
  const validated = validateEmail('')
  expect(validated.email).toBe('An email address is required')
})

test('validateEmail: should return email error if email is invalid', () => {
  const validated = validateEmail('coolUserfuture.net')
  expect(validated.email).toBe('This email address is not valid')
})

test('validateEmail: should return { email: \'\' } if email is valid', () => {
  const validated = validateEmail('coolUser@future.net')
  expect(validated.email).toBe('')
})

test('validateEmail: should return validation failure if email is not a string', () => {
  const validated = validateEmail(false)
  expect(validated.email).toBe('email validation failed')
})

/**
 * validatePassword
 */

test('validatePassword: should return password error if password is empty', () => {
  const validated = validatePassword('')
  expect(validated.password).toBe('A password is required')
})

test('validatePassword: should return { password: \'\' } if password is valid', () => {
  const validated = validatePassword('coolUser')
  expect(validated.password).toBe('')
})

test('validatePassword: should return validation failure if password is not a string', () => {
  const validated = validatePassword(false)
  expect(validated.password).toBe('password validation failed')
})

/**
 * validateConfirmPassword
 */

test('validateConfirmPassword: should return confirmPassword error if password is empty', () => {
  const validated = validateConfirmPassword('shh', '')
  expect(validated.confirmPassword).toBe('Please confirm your password')
})

test('validateConfirmPassword: should return confirmPassword mismatch error if confirmPassword does not match password', () => {
  const validated = validateConfirmPassword('shh', 'YELLING')
  expect(validated.confirmPassword).toBe('Passwords don\'t match, try again')
})

test('validateConfirmPassword: should return { password: \'\' } if password is valid', () => {
  const validated = validateConfirmPassword('shh', 'shh')
  expect(validated.confirmPassword).toBe('')
})

test('validateConfirmPassword: should return validation failure if confirmPassword is not a string', () => {
  const validated = validateConfirmPassword('shh', false)
  expect(validated.confirmPassword).toBe('confirmPassword validation failed')
})

test('validateConfirmPassword: should return validation failure if password is not a string', () => {
  const validated = validateConfirmPassword(false, 'shh')
  expect(validated.confirmPassword).toBe('confirmPassword validation failed')
})
