import React from 'react'
import {NavLink} from 'react-router-dom'

const GuestLinks = props => (
  <div
    className='collapse navbar-collapse justify-content-end'
    id='navbarNavAltMarkup'
  >
    <div className='navbar-nav'>
      <NavLink
        to='/signup'
        className='nav-item nav-link'
        activeClassName='active'
      >
        Signup
      </NavLink>
      <NavLink
        to='/login'
        className='nav-item nav-link'
        activeClassName='active'
      >
        Login
      </NavLink>
    </div>
  </div>
)

export default GuestLinks
