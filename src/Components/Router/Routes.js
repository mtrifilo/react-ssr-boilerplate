import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import Home from '../Home/Home'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import NotFound from './NotFound'
const { bool } = React.PropTypes

/**
 * Run `yarn run compile-routes` after altering any Routes in this file.
 *
 * CompiledRoutes.js is the transpiled version of this file
 * which gets used when the app renders on the server.
 */

const Routes = ({isAuthenticated}) => {
  console.log('Routes props', isAuthenticated)
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/login' render={() => (
        isAuthenticated ? (
          <Redirect push to='/' />
        ) : (
          <Login />
        )
      )} />
      <Route path='/signup' component={Signup} />
      <Route component={NotFound} />
    </Switch>
  )
}

Routes.propTypes = {
  isAuthenticated: bool
}

export default Routes
