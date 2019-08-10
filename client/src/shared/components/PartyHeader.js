import React from 'react'
import PropTypes from 'prop-types'

import Container from './Container'
import Glyph from './Glyph'
import Header from './Header'
import Label, { Title } from './Label'

import { partyCodeStyle } from '../mixins'

import { dimension } from '../theme'

const PartyHeader = ({ code, name }) => (
  <Header spacing={dimension.spacing.connected}>
    <Container center row>
      <Glyph glyph='code' large />
      <Label css={`${partyCodeStyle}`}>{ code }</Label>
    </Container>

    <Title secondary>{ name }</Title>
  </Header>
)

PartyHeader.propTypes = {
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default PartyHeader
