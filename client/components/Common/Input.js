import React from 'react'
import classNames from 'classnames'
import { string, func } from 'prop-types'

const Input = ({
  label,
  type,
  value,
  name,
  onChange,
  onBlur,
  validationError
}) => {
  return (
    <div
      className={classNames('form-group', { 'has-danger': validationError })}
    >
      <label>{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames('form-control', { 'is-invalid': validationError })}
      />
      {validationError &&
        <div className='invalid-feedback'>
          {validationError}
        </div>}
    </div>
  )
}

Input.propTypes = {
  label: string,
  type: string,
  value: string,
  name: string,
  onChange: func.isRequired,
  onBlur: func,
  validationError: string
}

export default Input
