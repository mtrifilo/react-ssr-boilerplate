import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logoutRequest } from '../../redux/modules/user'
const { func, string } = React.PropTypes

const AuthenticatedLinks = ({ dispatchLogoutRequest, username, ...props }) => {
  const logout = evt => {
    evt.preventDefault()
    dispatchLogoutRequest()
  }

  return (
    <div
      className='collapse navbar-collapse justify-content-end'
      id='navbarNavAltMarkup'
    >
      <div className='navbar-nav'>
        <NavLink
          to='/memberpage'
          className='nav-item nav-link'
          activeClassName='active'
        >
          Member Page
        </NavLink>
        <NavLink
          to={`/u/${username}`}
          className='nav-item nav-link'
          activeClassName='active'
        >
          {username}
        </NavLink>
        <a href='#' onClick={logout} className='nav-item nav-link'>Logout</a>
      </div>
    </div>
  )
}

AuthenticatedLinks.propTypes = {
  dispatchLogoutRequest: func.isRequired,
  username: string
}

const mapStateToProps = state => {
  return {
    username: state.user.user.username
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchLogoutRequest () {
      dispatch(logoutRequest())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedLinks)
