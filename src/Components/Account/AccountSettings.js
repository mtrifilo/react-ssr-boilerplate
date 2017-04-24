import React, {Component} from 'react'
import {connect} from 'react-redux'
import GitHubAccountSettings from './GitHubAccountSettings'
import LocalAccountSettings from './LocalAccountSettings'
import {getCurrentUserRequest} from '../../Redux/modules/user'
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

  onChangeHandler = (evt) => {
    this.setState({[evt.target.name]: evt.value})
  }

  componentDidMount () {
    this.props.dispatchGetCurrentUser(this.props.id)
  }

  render () {
    return (
      <div>
        <h1 className='text-center page-title'>Account Settings</h1>
        {this.props.gitHubToken
          ? <GitHubAccountSettings
            username={this.props.username}
            onChangeHandler={this.onChangeHandler}
            />
          : <LocalAccountSettings
            username={this.props.username}
            email={this.props.email}
            onChangeHandler={this.onChangeHandler}
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
  dispatchGetCurrentUser: func
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
    dispatchGetCurrentUser (id) {
      dispatch(getCurrentUserRequest(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings)
