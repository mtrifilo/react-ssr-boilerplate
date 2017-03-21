import React from 'react'
import { Link } from 'react-router-dom'
import GuestLinks from './GuestLinks'

const NavBar = (props) => (
  <nav className='navbar navbar-toggleable-md navbar-inverse bg-inverse'>
    <button
      className='navbar-toggler navbar-toggler-right'
      type='button'
      data-toggle='collape'
      data-target='#navbarNavAltMarkup'
      aria-controls='navbarNavAltMarkup'
      aria-expanded='false'
      aria-label='Toggle navigation'>
      <span className='navbar-toggler-icon' />
    </button>
    <Link to='/' className='navbar-brand'>React SSR Boilerplate</Link>
    <GuestLinks />
  </nav>
)

export default NavBar
