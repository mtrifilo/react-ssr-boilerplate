import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../Redux/Store'
import Routes from './Router/Routes'
import Layout from './Layout'

const App = (props) => (
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        {Routes()}
      </Layout>
    </BrowserRouter>
  </Provider>
)

export default App
