import React from 'react'
const { string, func } = React.PropTypes

const Input = ({ label, type, value, name, onChange, validationError }) => {
  return (
    <div className='form-group'>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        className='form-control' />
    </div>
  )
}

Input.propTypes = {
  label: string,
  type: string,
  value: string,
  name: string,
  onChange: func.isRequired,
  validationError: string
}

export default Input
