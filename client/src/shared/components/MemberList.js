import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import Error from '../../pages/Error'

import Label, { Title } from './Label'
import Button from './Button'
import Container from './Container'
import MemberAvatar from './MemberAvatar'
import PartyHeader from './PartyHeader'
import Loading from './Loading'

import { formatPhoneNumber } from '../util'
import { dimension } from '../theme'

const MemberListContainer = styled(Container).attrs(() => ({
  as: 'ul'
}))`
  margin: 0;
  padding: 0;
  list-style: none;
`

const MemberDetails = ({ firstName, lastName, phone, email }) => (
  <Container spacing={ dimension.spacing.connected }>
    <Title secondary>{firstName} {lastName}</Title>
    <Label secondary secondaryColor>{phone ? formatPhoneNumber(phone) : email}</Label>
  </Container>
)

MemberDetails.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string
}

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
            { this.state.members.map(({ _id, firstName, lastName, phone, email }) => (
              <li key={_id} css={`width: 100%;`}>
                <Button actionGlyph='add' stretch noLabel>
                  <MemberAvatar firstName={firstName} lastName={lastName} />
                  <MemberDetails firstName={firstName} lastName={lastName} phone={phone} email={email} />
                </Button>
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
    code: PropTypes.string,
    name: PropTypes.string
  }).isRequired
}

export default withRouter(MemberList)
