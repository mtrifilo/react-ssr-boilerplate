/* eslint-disable react/no-unused-prop-types */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import {logoutUser} from '../../Redux/modules/user'
const {bool, string, object, number, func} = React.PropTypes

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
    const currentTime = Date.now() / 1000
    if (this.props.tokenExp < currentTime) {
      this.props.dispatchLogout()
    } else if (!this.props.isAuthenticated) {
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
  children: object,
  tokenExp: number,
  dispatchLogout: func
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    username: state.user.user.username,
    tokenExp: state.user.user.exp
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchLogout () {
      dispatch(logoutUser())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authorize)
