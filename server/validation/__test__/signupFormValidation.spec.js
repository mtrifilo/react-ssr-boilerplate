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
    email: '',
    password: 'shh',
    confirmPassword: 'shh'
  }
  const validated = signupFormValidation(data)
  console.log(validated)
  expect(validated.isValid).toBe(false)
})
