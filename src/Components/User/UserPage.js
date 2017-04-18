import React from 'react'
import Authorize from '../Common/Authorize'
import UserProfile from './UserProfile'

const UserPage = props => (
  <Authorize>
    <UserProfile />
  </Authorize>
)

export default UserPage
