/* eslint-disable react/no-unused-prop-types */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
const {bool, string, object} = React.PropTypes

class Authorize extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirectHome: false,
      mounted: false
    }
  }
  componentWillReceiveProps (nextProps) {
    if (!nextProps.isAuthenticated) {
      this.setState({redirectHome: true})
    }
  }

  componentDidMount () {
    if (!this.props.isAuthenticated) {
      this.setState({redirectHome: true})
    } else {
      this.setState({mounted: true})
    }
  }

  render () {
    if (this.state.redirectHome) {
      return <Redirect to='/' />
    }

    let children = null
    if (this.state.mounted && this.props.isAuthenticated !== null) {
      children = React.cloneElement(this.props.children, {
        username: this.props.username,
        isAuthenticated: this.props.isAuthenticated
      })
    }

    return (
      <div>
        {children}
      </div>
    )
  }
}

Authorize.propTypes = {
  isAuthenticated: bool,
  username: string,
  children: object
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    username: state.user.user.username
  }
}

export default connect(mapStateToProps)(Authorize)
