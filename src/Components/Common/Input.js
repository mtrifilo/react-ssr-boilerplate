import React from 'react'
import classNames from 'classnames'
const { string, func } = React.PropTypes

const Input = ({ label, type, value, name, onChange, onBlur, validationError }) => {
  return (
    <div className={classNames('form-group', { 'has-danger': validationError })}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        className='form-control' />
      {validationError &&
        <div className='form-control-feedback'>
          {validationError}
        </div>
      }
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
