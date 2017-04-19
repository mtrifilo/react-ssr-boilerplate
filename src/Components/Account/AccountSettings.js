import React, {Component} from 'react'
const { string } = React.PropTypes

class AccountSettings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: ''
    }
  }

  render () {
    return (
      <div>
        <h1 className='text-center page-title'>Account Settings</h1>
      </div>
    )
  }
}

AccountSettings.propTypes = {
  username: string
}

export default AccountSettings
