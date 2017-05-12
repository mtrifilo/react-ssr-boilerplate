import React from 'react'
import Status from './Status'

const NotFound = props => (
  <Status code={404}>
    <h1>Nothing here. 404</h1>
  </Status>
)

export default NotFound
