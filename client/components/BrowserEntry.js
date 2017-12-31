import React from 'react'
import ReactDOM from 'react-dom'
import App from './ClientApp'
import '../../node_modules/bootstrap/dist/js/bootstrap.js'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'
import './main.css'

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.hydrate(<App />, document.getElementById('app'))
})
