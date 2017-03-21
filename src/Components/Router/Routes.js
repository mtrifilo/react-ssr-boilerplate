import React from 'react'
import { Route, Switch } from 'react-router'
import Home from '../Home/Home'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
import NotFound from './NotFound'

const Routes = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/login' component={Login} />
    <Route path='/signup' component={Signup} />
    <Route component={NotFound} />
  </Switch>
)

export default Routes
