import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from '../Home/Home'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import MemberPage from '../MemberPage/MemberPage'
import NotFound from './NotFound'
import SetToken from '../Login/SetToken'
import AccountPage from '../Account/AccountPage'
import { bool } from 'prop-types'

/**
 * Run `yarn run compile-routes` after altering any Routes in this file.
 *
 * CompiledRoutes.js is the transpiled version of this file
 * which gets used when the app renders on the server.
 */

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/t/:token' component={SetToken} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
      <Route path='/memberpage' component={MemberPage} />
      <Route path='/u/:username' component={AccountPage} />
      <Route component={NotFound} />
    </Switch>
  )
}

Routes.propTypes = {
  isAuthenticated: bool
}

export default Routes
