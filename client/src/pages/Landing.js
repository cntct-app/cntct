import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { opacify } from 'polished'
import isInt from 'validator/lib/isInt'

import Container from '../shared/components/Container'
import Field from '../shared/components/Field'
import Glyph from '../shared/components/Glyph'
import Header from '../shared/components/Header'
import Input from '../shared/components/Input'
import Label from '../shared/components/Label'
import Link from '../shared/components/Link'
import { LinkButton } from '../shared/components/Button'
import Logo from '../shared/components/Logo'

import { dimension, color } from '../shared/theme'
import notificationHelper from '../shared/notificationHelper'
import { partyCodeStyle } from '../shared/mixins'

import crunchLogo from '../shared/resources/crunch.svg'

const PartyCodeInput = styled(Input).attrs(() => ({
  placeholder: '00000',
  pattern: '[0-9]*' // For iOS keyboard, not validation
}))`
  /* Include font styles for displaying party codes */
  &,
  &::placeholder {
    ${partyCodeStyle}
  }

  /* Remove up/down buttons from number input */
  appearance: textfield;

  padding: 0;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;

    margin: 0;
  }
`

const PartyCodeField = styled(Field)`
  flex-shrink: 0;

  padding: 0 ${({ large }) => large ? dimension.large.spacing.related : dimension.spacing.related};
  
  height: ${dimension.large.control.size};

  /* & increases specificity */
  && {
    ${({ hasError }) => hasError && css`
      box-shadow: 0 0 0 3px ${opacify(-0.2, color.error)};
    `}
  }
`

const Footer = styled(Container).attrs(() => ({
  as: 'footer',
  spacing: dimension.spacing.separate
}))`
  margin-top: auto;

/* Crunch logo */
  > ${Container} > img {
    margin-right: auto;
  }
`

class Landing extends Component {
  state = {
    partyCode: '',
    hasError: false
  }
  onPartyCodeChange = async e => {
    const partyCode = e.target.value
    const isPartyCode = isInt(partyCode) || partyCode.length === 0

    if (isPartyCode && partyCode.length <= 5) {
      this.setState({
        partyCode: partyCode,
        hasError: false
      })

      if (partyCode.length === 5) {
        try {
          const resp = await fetch(`/api/party/${partyCode}/`)
          const { party } = await resp.json()

          if (!party) {
            this.setState({
              hasError: true
            })

            notificationHelper.add({
              type: 'error',
              content: 'Party not found'
            })

            return
          }

          this.props.history.push(`/party/${party.code}`)
        } catch (err) {
          console.error(`Error checking if party exists: ${err}`)
        }
      }
    }
  }
  render = () => (
    <>
      <Header>
        <Logo />
      </Header>

      <Container as='main'>
        <PartyCodeField large hasError={this.state.hasError}>
          <Glyph glyph='code' large />
          <PartyCodeInput onChange={this.onPartyCodeChange} value={this.state.partyCode} />
        </PartyCodeField>

        <Container as='nav'>
          <LinkButton to='/create' labelGlyph='add' stretch>Create Party</LinkButton>
          <LinkButton to='/pro' labelGlyph='pro' stretch>Get Pro</LinkButton>
          <LinkButton to='/about' labelGlyph='info' stretch>Learn More</LinkButton>
        </Container>
      </Container>

      <Footer>
        <Label secondaryColor>If you’re trying to join others, ask for a party code.</Label>

        <Container row center>
          <img src={crunchLogo} alt='crunch software logo' />
          <Link to='/terms'>Terms</Link>
          <Link to='/privacy'>Privacy</Link>
        </Container>
      </Footer>
    </>
  )
}

Landing.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(Landing)
