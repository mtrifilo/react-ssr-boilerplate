import React from 'react'
const { string } = React.PropTypes

const Input = ({label, type, inputClass}) => (
  <div className='form-group'>
    <label>{label}</label>
    <input type={type} className={`form-control`} />
  </div>
)

Input.propTypes = {
  label: string,
  type: string,
  inputClass: string
}

export default Input
