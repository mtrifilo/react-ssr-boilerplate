import React from 'react'
const {string} = React.PropTypes

const MemberContent = ({username}) => (
  <div>
    <h1 className='text-center page-title'>Members Only</h1>
    <h2 className='text-center'>Hi, {username}!</h2>
  </div>
)

MemberContent.propTypes = {
  username: string
}

export default MemberContent
