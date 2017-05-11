import React from 'react'
import { string } from 'prop-types'

const MemberContent = ({ username }) => (
  <div>
    <h1 className='text-center page-title'>Members Only</h1>
    <h2 className='text-center'>Hi, {username}!</h2>
  </div>
)

MemberContent.propTypes = {
  username: string
}

export default MemberContent
