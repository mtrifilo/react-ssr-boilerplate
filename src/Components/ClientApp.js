import React from 'react'
import {
  BrowserRouter
} from 'react-router-dom'
import Routes from './Router/Routes'
import Layout from './Layout'

const App = (props) => (
  <BrowserRouter>
    <Layout>
      {Routes()}
    </Layout>
  </BrowserRouter>
)

export default App
