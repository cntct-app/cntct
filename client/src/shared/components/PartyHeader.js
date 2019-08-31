import React from 'react'
import PropTypes from 'prop-types'

import Container from './Container'
import Glyph from './Glyph'
import Header from './Header'
import Label, { Title } from './Label'

import { dimension } from '../theme'
import { partyCodeStyle } from '../mixins'

const PartyHeader = ({ code, name }) => (
  <Header margin={dimension.spacing.connected}>
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
