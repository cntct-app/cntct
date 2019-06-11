import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import ButtonLink from '../shared/components/ButtonLink'
import Header from '../shared/components/Header'
import Field from '../shared/components/Field'
import Glyph from '../shared/components/Glyph'
import Input from '../shared/components/Input'
import Logo from '../shared/components/Logo'
import { partyCode } from '../shared/mixins'

const PartyCodeInput = styled(Input).attrs(() => ({
  type: 'number',
  placeholder: '00000',
  pattern: '[0-9]*'
}))`
  /* Include font styles for displaying party codes */
  ${partyCode}

  /* Remove up/down buttons from number input */
  appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
`

class Landing extends Component {
  constructor (props) {
    super(props)

    this.onPartyCodeChange = this.onPartyCodeChange.bind(this)
  }
  onPartyCodeChange (e) {
    const code = e.target.value

    if (code.toString().length === 5) {
      this.props.history.push(`/party/${code}`)
    }
  }
  render () {
    return (
      <>
        <Header>
          <Logo />
        </Header>
        <main>
          <Field large>
            <Glyph name='code' large />
            <PartyCodeInput onChange={this.onPartyCodeChange} />
          </Field>
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
