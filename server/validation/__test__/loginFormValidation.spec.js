/* eslint-env node, jest */
import {
  loginFormValidation,
  validateEmail,
  validatePassword
} from '../loginFormValidation'

/**
 * loginFormValidation
 */

test('loginFormValidation: should return no errors if all data is valid', () => {
  const data = {
    email: 'coolUser@future.net',
    password: 'shh'
  }
  const validated = loginFormValidation(data)
  expect(validated.isValid).toBe(true)
})

test('loginFormValidation: should return email error if email is blank', () => {
  const data = {
    email: '',
    password: 'shh'
  }
  const validated = loginFormValidation(data)
  expect(validated.isValid).toBe(false)
  expect(validated.validationErrors.email).toBe(
    'A registered email is required'
  )
})

test('loginFormValidation: should return email error if email is invalid', () => {
  const data = {
    email: 'coolUserfuture.net',
    password: 'shh'
  }
  const validated = loginFormValidation(data)
  expect(validated.isValid).toBe(false)
  expect(validated.validationErrors.email).toBe(
    'This email address is not valid'
  )
})

test('loginFormValidation: should return password no errors if password is valid', () => {
  const data = {
    email: 'coolUser@future.net',
    password: 'shh'
  }
  const validated = loginFormValidation(data)
  expect(validated.isValid).toBe(true)
})

test('loginFormValidation: should return password error if password is blank', () => {
  const data = {
    email: 'coolUser@future.net',
    password: ''
  }
  const validated = loginFormValidation(data)
  expect(validated.isValid).toBe(false)
  expect(validated.validationErrors.password).toBe('A password is required')
})

/**
 * validateEmail
 */

test('validateEmail: should return email error if email is empty', () => {
  const validated = validateEmail('')
  expect(validated.email).toBe('A registered email is required')
})

test('validateEmail: should return email error if email is invalid', () => {
  const validated = validateEmail('coolUserfuture.net')
  expect(validated.email).toBe('This email address is not valid')
})

test("validateEmail: should return { email: '' } if email is valid", () => {
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

test("validatePassword: should return { password: '' } if password is valid", () => {
  const validated = validatePassword('coolUser')
  expect(validated.password).toBe('')
})

test('validatePassword: should return validation failure if password is not a string', () => {
  const validated = validatePassword(false)
  expect(validated.password).toBe('password validation failed')
})
