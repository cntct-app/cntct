import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import isInt from 'validator/lib/isInt'
import io from 'socket.io-client'

import Error from './Error'

import Loading from '../shared/components/Loading'
import PartyHeader from '../shared/components/PartyHeader'
import Container from '../shared/components/Container'
import Label, { Title } from '../shared/components/Label'

import { dimension } from '../shared/theme'

const StyledPartyFooter = styled(Container).attrs(() => ({
  as: 'footer',
  margin: dimension.spacing.connected
}))`
  margin-top: auto;
`

const PartyFooter = ({ memberCount, incomingCount }) => (
  <StyledPartyFooter>
    <Title secondary>{memberCount} Member{memberCount === 1 ? '' : 's'}</Title>
    { incomingCount && <Label secondary secondaryColor>{incomingCount} other{incomingCount === 1 ? '' : 's'} entering information</Label>}
  </StyledPartyFooter>
)

PartyFooter.propTypes = {
  memberCount: PropTypes.number.isRequired,
  incomingCount: PropTypes.number.isRequired
}

class Party extends Component {
  socket = io('/', {
    'path': '/api/socket.io'
  })
  state = {
    party: null,
    loading: true,
    error: false,
    isEnteringInformation: null
  }
  asyncEmit = (message, payload, cb) => {
    return new Promise((resolve, reject) => {
      this.socket.emit(message, payload, () => {
        resolve()
      })
    })
  }
  componentDidMount = async () => {
    const partyCode = this.props.match.params.partyCode
    const isPartyCodeValid = partyCode.length === 5 && isInt(partyCode)

    if (!isPartyCodeValid) {
      this.setState({
        loading: false,
        error: true
      })

      return
    }

    // Join socket.io room to receive updates
    await this.asyncEmit('join_party', partyCode)

    this.socket.on('new_member', member => {
      this.setState(prevState => {
        return ({
          party: {
            ...prevState.party,
            members: [
              ...prevState.party.members,
              member
            ]
          }
        })
      })
    })

    this.socket.on('update_incoming_member_count', incomingMemberCount => {
      this.setState(prevState => ({
        party: {
          ...prevState.party,
          incomingMemberCount
        }
      }))
    })

    try {
      const resp = await fetch(`/api/party/${partyCode}`)
      const { party } = await resp.json()

      if (party) {
        this.setState({
          party,
          loading: false
        })
      } else {
        this.setState({
          loading: false
        })
      }
    } catch (err) {
      console.error(`Error fetching party name: ${err}`)
    }
  }
  memberFormDidMount = async () => {
    this.asyncEmit('new_incoming_member', this.state.party.code)
    this.setState({ isEnteringInformation: true })
  }
  memberFormWillUnmount = async () => {
    this.asyncEmit('remove_incoming_member', this.state.party.code)
    this.setState({ isEnteringInformation: false })
  }
  render = () => {
    if (this.state.loading) {
      return <Loading message='Loading party...' />
    }

    if (this.state.error) {
      return <Error message='Invalid party code' />
    }

    if (!this.state.party) {
      return <Error message='Party does not exist, it may have been closed.' />
    }

    return (
      <>
        <PartyHeader code={this.props.match.params.partyCode} name={this.state.party.name} />

        <Container as='main'>
          { this.props.render(this.state.party, this.memberFormDidMount, this.memberFormWillUnmount) }
        </Container>

        <PartyFooter memberCount={this.state.party.members.length} incomingCount={this.state.isEnteringInformation ? this.state.party.incomingMemberCount - 1 : this.state.party.incomingMemberCount} />
      </>
    )
  }
}

Party.propTypes = {
  match: PropTypes.shape({ params: PropTypes.object.isRequired }).isRequired,
  render: PropTypes.func.isRequired
}

export default withRouter(Party)
