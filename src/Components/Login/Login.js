import React from 'react'
import LoginForm from './LoginForm'
import LoginGithub from './LoginGithub'

const Login = (props) => (
  <div>
    <h1 className='text-center page-title'>Login</h1>
    <LoginForm />
    <LoginGithub />
  </div>
)

export default Login
