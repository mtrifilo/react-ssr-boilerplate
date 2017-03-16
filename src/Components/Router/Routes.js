import React from 'react'
import { Route, Switch } from 'react-router'
import Layout from '../Layout'
import NotFound from './NotFound'

const Routes = () => (
  <Switch>
    <Route exact path='/' component={Layout} />
    <Route component={NotFound} />
  </Switch>
)

export default Routes
