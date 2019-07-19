import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Link, withRouter } from 'react-router-dom'
import { opacify } from 'polished'
import isInt from 'validator/lib/isInt'

import ButtonLink from '../shared/components/ButtonLink'
import Header from '../shared/components/Header'
import Field from '../shared/components/Field'
import Glyph from '../shared/components/Glyph'
import Input from '../shared/components/Input'
import Logo from '../shared/components/Logo'
import crunchLogo from '../shared/resources/crunch.svg'
import { partyCode } from '../shared/mixins'
import { dimension, color } from '../shared/theme'

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-bottom: ${dimension.spacing.separate};

  > p {
    color: rgba(255, 255, 255, 0.5);
    margin-top: auto;
  }
`

const PartyCodeInput = styled(Input).attrs(() => ({
  placeholder: '00000',
  pattern: '[0-9]*' // For iOS keyboard, not validation
}))`
  /* Include font styles for displaying party codes */
  ${partyCode}

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
  padding: 0 ${({ large }) => large ? dimension.large.spacing.related : dimension.spacing.related};

  /* & increases specificity */
  && {
    ${({ hasError }) => hasError && css`
      box-shadow: 0 0 0 3px ${opacify(-0.2, color.error)};
    `}
  }
`

const Footer = styled.footer`
  display: flex;
  align-items: center;

  > img {
    margin-right: auto;
  }

  > a {
    color: rgba(255, 255, 255, 0.75);
    text-decoration: underline;
    margin-left: ${dimension.spacing.related};
  }
`

class Landing extends Component {
  constructor (props) {
    super(props)

    this.onPartyCodeChange = this.onPartyCodeChange.bind(this)

    this.state = {
      partyCode: '',
      hasError: false
    }
  }
  async onPartyCodeChange (e) {
    const partyCode = e.target.value
    const isPartyCode = isInt(partyCode) || partyCode.length === 0

    if (isPartyCode && partyCode.length <= 5) {
      this.setState({
        partyCode: partyCode,
        hasError: false
      })

      if (partyCode.length === 5) {
        try {
          const resp = await fetch(`/api/party/${partyCode}`)
          const { party } = await resp.json()

          if (!party) {
            this.setState({
              hasError: true
            })

            window.notificationHelper.add({
              type: 'error',
              content: 'Party not found'
            })

            return
          }

          this.props.history.push(`/party/${partyCode}`)
        } catch (err) {
          console.error(`Error checking if party exists: ${err}`)
        }
      }
    }
  }
  render () {
    return (
      <>
        <Header>
          <Logo />
        </Header>

        <MainContainer>
          <PartyCodeField large hasError={this.state.hasError}>
            <Glyph name='code' large />
            <PartyCodeInput onChange={this.onPartyCodeChange} value={this.state.partyCode} />
          </PartyCodeField>

          <nav>
            <ButtonLink to='/create'>
              <Glyph name='add' />
              <span>Create Party</span>
              <Glyph name='arrow' />
            </ButtonLink>

            <ButtonLink to='/pro' glyph='pro'>
              <Glyph name='pro' />
              <span>Get Pro</span>
              <Glyph name='arrow' />
            </ButtonLink>

            <ButtonLink to='/about' glyph='info'>
              <Glyph name='info' />
              <span>Learn More</span>
              <Glyph name='arrow' />
            </ButtonLink>
          </nav>
          <p>If you’re trying to join others, ask for a party code.</p>
        </MainContainer>

        <Footer>
          <img src={crunchLogo} />
          <Link to='/terms'>Terms</Link>
          <Link to='/privacy'>Privacy</Link>
        </Footer>
      </>
    )
  }
}

Landing.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(Landing)
