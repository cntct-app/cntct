import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import Error from './Error'

import Label, { Title } from '../shared/components/Label'
import Button from '../shared/components/Button'
import Container from '../shared/components/Container'
import MemberAvatar from '../shared/components/MemberAvatar'
import PartyHeader from '../shared/components/PartyHeader'

import { formatPhoneNumber } from '../shared/util'
import { dimension } from '../shared/theme'

const MemberListContainer = styled(Container).attrs(() => ({
  as: 'ul'
}))`
  margin: 0;
  padding: 0;
  list-style: none;
`

const MemberDetails = ({ firstName, lastName, phone, email }) => {
  return (
    <Container spacing={ dimension.spacing.connected }>
      <Title secondary>{firstName} {lastName}</Title>
      <Label secondary secondaryColor>{phone ? formatPhoneNumber(phone) : email}</Label>
    </Container>
  )
}

MemberDetails.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string
}

class MemberList extends Component {
  state = {
    members: []
  }
  componentDidMount = async () => {
    try {
      const resp = await fetch(`/api/party/${this.props.match.params.partyCode}/members`)
      const { members } = await resp.json()
      this.setState({ members })
    } catch (err) {
      console.error(err)
    }
  }
  render = () => {
    if (!this.state.members) {
      return <Label>Loading...</Label>
    }

    if (this.state.members.length === 0) {
      return <Error message='There are no members in this party yet.' linkHome={false} />
    }

    return (
      <>
        <PartyHeader partyCode={this.props.match.params.partyCode} />

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
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired
}

export default withRouter(MemberList)
