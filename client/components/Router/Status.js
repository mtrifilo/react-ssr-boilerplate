import React from 'react'
import { Route } from 'react-router'
import { number, element } from 'prop-types'

const Status = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = code
      }
      return children
    }}
  />
)

Status.propTypes = {
  code: number,
  children: element
}

export default Status
