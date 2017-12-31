import { buildErrorsObject } from '../utils'

test('buildErrorsObject: should return validation errors as object', () => {
  const validationResults = {
    email: 'A registered email is required',
    password: ''
  }
  const errors = buildErrorsObject(validationResults)
  expect(errors).toEqual({ email: 'A registered email is required' })
})

test('buildErrorsObject: should return an empty array if no errors are present', () => {
  const validationResults = {
    email: '',
    password: ''
  }
  const errors = buildErrorsObject(validationResults)
  expect(errors).toEqual([])
})
