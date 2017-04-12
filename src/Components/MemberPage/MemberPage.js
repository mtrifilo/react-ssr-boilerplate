/* eslint-disable react/no-unused-prop-types */
import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
const { bool, string } = React.PropTypes

class MemberPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      authenticated: true
    }
  }
  componentWillReceiveProps (nextProps) {
    if (!nextProps.isAuthenticated) {
      this.setState({ authenticated: false })
    }
  }

  componentDidMount () {
    if (!this.props.isAuthenticated) {
      this.setState({ authenticated: false })
    }
  }

  render () {
    if (!this.state.authenticated) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <h1 className='text-center page-title'>Members Only</h1>
        <h2 className='text-center'>Hi, {this.props.username}!</h2>
      </div>
    )
  }
}

MemberPage.propTypes = {
  isAuthenticated: bool,
  username: string
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    username: state.user.user.username
  }
}

export default connect(mapStateToProps)(MemberPage)
