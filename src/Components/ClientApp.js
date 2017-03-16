import React from 'react'
import {
  BrowserRouter
} from 'react-router-dom'
import Routes from './Router/Routes'

const App = (props) => (
  <BrowserRouter>
    {Routes()}
  </BrowserRouter>
)

export default App
