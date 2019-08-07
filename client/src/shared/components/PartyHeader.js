import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Container from './Container'
import Glyph from './Glyph'
import Header from './Header'
import Label, { Title } from './Label'

import { partyCodeStyle } from '../mixins'

import { dimension } from '../theme'

class PartyHeader extends Component {
  state = {
    partyName: ''
  }
  componentDidMount = async () => {
    try {
      const resp = await fetch(`/api/party/${this.props.partyCode}/`)
      const { party } = await resp.json()

      if (party) {
        this.setState({
          partyName: party.name
        })
      }
    } catch (err) {
      console.error(err)
    }
  }
  render () {
    return (
      <Header spacing={dimension.spacing.connected}>
        <Container center row>
          <Glyph glyph='code' large />
          <Label css={`${partyCodeStyle}`}>{ this.props.partyCode }</Label>
        </Container>

        <Title secondary>{this.state.partyName || 'Loading...'}</Title>
      </Header>
    )
  }
}

PartyHeader.propTypes = {
  partyCode: PropTypes.string.isRequired
}

export default PartyHeader
