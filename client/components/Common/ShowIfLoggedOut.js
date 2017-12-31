import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { array, bool } from 'prop-types'

class ShowIfLoggedOut extends Component {
  render () {
    if (this.props.isAuthenticated) {
      return <Redirect to='/' />
    }

    if (this.props.isAuthenticated !== false) {
      return null
    }

    return <div>{this.props.children}</div>
  }
}

ShowIfLoggedOut.propTypes = {
  children: array.isRequired,
  isAuthenticated: bool.isRequired
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated
  }
}

export default connect(mapStateToProps)(ShowIfLoggedOut)
