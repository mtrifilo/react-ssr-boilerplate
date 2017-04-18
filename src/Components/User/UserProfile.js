import React, {Component} from 'react'

class UserProfile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: ''
    }
  }

  render () {
    return (
      <div>
        <h1>User Profile</h1>
      </div>
    )
  }
}

export default UserProfile
