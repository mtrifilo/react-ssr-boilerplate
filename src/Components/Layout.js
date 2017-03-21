import React from 'react'
import NavBar from './NavBar/NavBar'
const { element } = React.PropTypes

const Layout = ({children}) => (
  <div>
    <NavBar />
    {children}
  </div>
)

Layout.propTypes = {
  children: element
}

export default Layout
