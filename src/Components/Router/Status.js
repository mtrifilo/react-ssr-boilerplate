import React from 'react'
import { Route } from 'react-router'
const { string, element } = React.PropTypes

const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.status = code
    }
    return children
  }} />
)

Status.propTypes = {
  code: string,
  children: element
}

export default Status
