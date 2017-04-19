import React, {Component} from 'react'
const { string } = React.PropTypes

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
        <h1>{this.props.username}</h1>
      </div>
    )
  }
}

UserProfile.propTypes = {
  username: string
}

export default UserProfile
