import React from 'react'
// import { connect } from 'react-redux'
// import { Redirect } from 'react-router'
// import { bool, object } from 'prop-types'

import LoginForm from './LoginForm'
import LoginGithub from './LoginGithub'
import ShowIfLoggedOut from '../Common/ShowIfLoggedOut'

const Login = props => {
  console.log('props:', props)
  return (
    <div>
      <ShowIfLoggedOut>
        <h1 className='text-center page-title'>Login</h1>
        <LoginForm />
        <LoginGithub />
      </ShowIfLoggedOut>
    </div>
  )
}

export default Login
