import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import isInt from 'validator/lib/isInt'

import ButtonLink from '../shared/components/ButtonLink'
import Header from '../shared/components/Header'
import Field from '../shared/components/Field'
import Glyph from '../shared/components/Glyph'
import Input from '../shared/components/Input'
import Logo from '../shared/components/Logo'
import { partyCode } from '../shared/mixins'
import { dimension } from '../shared/theme'

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
`

class Landing extends Component {
  constructor (props) {
    super(props)

    this.onPartyCodeChange = this.onPartyCodeChange.bind(this)

    this.state = {
      partyCode: ''
    }
  }
  onPartyCodeChange (e) {
    const value = e.target.value

    if (isInt(value) || value.length === 0) {
      this.setState({
        partyCode: value
      })

      if (value.length === 5) {
        this.props.history.push(`/party/${value}`)
      }
    }
  }
  render () {
    return (
      <>
        <Header>
          <Logo />
        </Header>

        <main>
          <PartyCodeField large>
            <Glyph name='code' large />
            <PartyCodeInput onChange={this.onPartyCodeChange} value={this.state.partyCode} />
          </PartyCodeField>

          <nav>
            <ButtonLink to='/create'>
              <Glyph name='add' />
              <span>Create Party</span>
              <Glyph name='arrow' />
            </ButtonLink>

            <ButtonLink to='/help' glyph='info'>
              <Glyph name='info' />
              <span>How to Use</span>
              <Glyph name='arrow' />
            </ButtonLink>

            <ButtonLink to='/pro' glyph='pro'>
              <Glyph name='pro' />
              <span>Get Pro</span>
              <Glyph name='arrow' />
            </ButtonLink>
          </nav>
        </main>
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
