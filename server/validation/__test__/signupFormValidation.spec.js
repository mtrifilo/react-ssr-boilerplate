/* eslint-env node, jest */
import { signupFormValidation } from '../signupFormValidation'

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
  console.log(validated)
  expect(validated.isValid).toBe(false)
  expect(validated.validationErrors.confirmPassword).toBe('Passwords don\'t match, try again')
})
