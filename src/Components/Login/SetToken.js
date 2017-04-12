import React, { Component } from 'react'
import { Redirect } from 'react-router'
import store from '../../Redux/Store'
import { setUser } from '../../Redux/modules/user'
import prepareUserFromToken from '../../auth/prepareUserFromToken'
const { object } = React.PropTypes

class SetToken extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true
    }
  }
  componentDidMount () {
    console.log('SetToken: match.params.token:', this.props.match.params.token)
    const user = prepareUserFromToken(this.props.match.params.token)
    store.dispatch(setUser(user))
    this.setState({ loading: false })
  }

  render () {
    if (this.state.loading) {
      return <h1>Loading...</h1>
    }
    return <Redirect to='/' />
  }
}

SetToken.propTypes = {
  match: object
}

export default SetToken
