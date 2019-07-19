import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class MemberList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      members: []
    }
  }
  async componentDidMount () {
    console.log('test')
    const resp = await fetch(`/api/party/${this.props.match.params.partyCode}/members`)
    const data = await resp.json()

    console.log(data)
    this.setState({ members })
  }
  render () {
    return (
      <ul>
        { this.state.members.map(user => <p key={user._id}>{user.firstName}</p>) }
      </ul>
    )
  }
}

MemberList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }).isRequired
}

export default withRouter(MemberList)
