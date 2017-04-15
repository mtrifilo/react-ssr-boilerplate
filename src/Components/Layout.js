import React from 'react'
import NavBar from './NavBar/NavBar'
import FlashMessageContainer from './Common/FlashMessageContainer'
const {element} = React.PropTypes

const Layout = ({children}) => (
  <div>
    <NavBar />
    <FlashMessageContainer />
    {children}
  </div>
)

Layout.propTypes = {
  children: element
}

export default Layout
