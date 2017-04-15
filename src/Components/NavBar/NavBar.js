import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import GuestLinks from './GuestLinks'
import AuthenticatedLinks from './AuthenticatedLinks'
const {bool} = React.PropTypes

class NavBar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showAuthenticatedLinks: false
    }
  }
  componentDidMount = () => {
    if (this.props.isAuthenticated) {
      this.setState({showAuthenticatedLinks: true})
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.isAuthenticated) {
      this.setState({showAuthenticatedLinks: true})
    } else {
      this.setState({showAuthenticatedLinks: false})
    }
  };
  render () {
    return (
      <nav className='navbar navbar-toggleable-md navbar-inverse bg-inverse'>
        <button
          className='navbar-toggler navbar-toggler-right'
          type='button'
          role='button'
          data-toggle='collapse'
          data-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>
        <Link to='/' className='navbar-brand'>React SSR Boilerplate</Link>
        {this.state.showAuthenticatedLinks
          ? <AuthenticatedLinks />
          : <GuestLinks />}
      </nav>
    )
  }
}

NavBar.propTypes = {
  isAuthenticated: bool.isRequired
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated
  }
}

export default connect(mapStateToProps)(NavBar)
