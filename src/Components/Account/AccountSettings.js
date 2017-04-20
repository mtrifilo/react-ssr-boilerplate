import React, {Component} from 'react'
import {connect} from 'react-redux'
import GitHubAccountSettings from './GitHubAccountSettings'
import LocalAccountSettings from './LocalAccountSettings'
import {getUserRequest} from '../../Redux/modules/user'
const {string, func} = React.PropTypes

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

  componentDidMount () {
    this.props.dispatchGetUser(this.props.id)
  }

  render () {
    return (
      <div>
        <h1 className='text-center page-title'>Account Settings</h1>
        {this.props.gitHubToken
          ? <GitHubAccountSettings username={this.props.username} />
          : <LocalAccountSettings
            username={this.props.username}
            email={this.props.email}
            />}
      </div>
    )
  }
}

AccountSettings.propTypes = {
  gitHubToken: string,
  username: string,
  email: string,
  id: string,
  dispatchGetUser: func
}

const mapStateToProps = state => {
  return {
    gitHubToken: state.user.user.gitHubAccessToken,
    username: state.user.userSettings.username,
    email: state.user.userSettings.email,
    id: state.user.user.sub
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchGetUser (id) {
      dispatch(getUserRequest(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings)
