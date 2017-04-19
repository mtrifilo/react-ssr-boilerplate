import React, {Component} from 'react'
import {connect} from 'react-redux'
import GitHubAccountSettings from './GitHubAccountSettings'
import LocalAccountSettings from './LocalAccountSettings'
const { string } = React.PropTypes

class AccountSettings extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newUsername: '',
      newEmail: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  }

  render () {
    return (
      <div>
        <h1 className='text-center page-title'>Account Settings</h1>
        {this.props.gitHubToken
          ? <GitHubAccountSettings />
          : <LocalAccountSettings />}
      </div>
    )
  }
}

AccountSettings.propTypes = {
  username: string,
  gitHubToken: string
}

const mapStateToProps = state => {
  return {
    gitHubToken: state.user.user.gitHubAccessToken,
    username: state.user.user.username,
    email: state.user.user.email
  }
}

export default connect(mapStateToProps)(AccountSettings)
