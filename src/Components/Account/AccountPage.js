import React from 'react'
import Authorize from '../Common/Authorize'
import AccountSettings from './AccountSettings'

const AccountPage = props => (
  <Authorize>
    <AccountSettings />
  </Authorize>
)

export default AccountPage
