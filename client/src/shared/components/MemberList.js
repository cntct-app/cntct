import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import Error from '../../pages/Error'

import Container from './Container'
import PartyHeader from './PartyHeader'
import Loading from './Loading'
import MemberButton from './MemberButton'

import { subscribeToMembers } from '../helpers'

const MemberListContainer = styled(Container).attrs(() => ({
  as: 'ul'
}))`
  list-style: none;
  
  margin: 0;
  padding: 0;
`

class MemberList extends Component {
  state = {
    members: [],
    loading: true
  }
  componentDidMount = async () => {
    try {
      const resp = await fetch(`/api/party/${this.props.party.code}/members`)
      const { members } = await resp.json()

      this.setState({
        members,
        loading: false
      })
    } catch (err) {
      console.error(err)
    }

    subscribeToMembers(this.props.party.code, members => {
      this.setState({ members })
    })
  }
  downloadVCard = id => {
    window.location.href = `/api/generate_vcard/${id}`
  }
  render = () => {
    if (this.state.loading) {
      return <Loading message='Loading party members...' />
    }

    if (!this.state.members.length) {
      return <Error message='There are no members in this party yet.' linkHome={false} />
    }

    return (
      <>
        <PartyHeader code={this.props.party.code} name={this.props.party.name} />

        <Container as='main'>
          <MemberListContainer>
            { this.state.members.map(member => (
              <li key={member._id} css={`width: 100%;`}>
                <MemberButton member={member} onClick={() => this.downloadVCard(member._id)} />
              </li>
            )) }
          </MemberListContainer>
        </Container>
      </>
    )
  }
}

MemberList.propTypes = {
  party: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
}

export default withRouter(MemberList)
