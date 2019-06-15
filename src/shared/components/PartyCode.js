import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Glyph from './Glyph'
import { dimension } from '../theme'
import { partyCode } from '../mixins'

const PartyCodeNumber = styled.h1`
  /* Include font styles for displaying party codes */
  ${partyCode}
`

const PartyCodeContainer = styled.div`
  display: flex;
  align-items: center;
  
  > ${Glyph} {
    margin-right: ${dimension.spacing.related};
  }
`

const PartyCode = ({ code }) => (
  <PartyCodeContainer>
    <Glyph name='code' large />
    <PartyCodeNumber>{code}</PartyCodeNumber>
  </PartyCodeContainer>
)

PartyCode.propTypes = {
  code: PropTypes.string.isRequired
}

export default PartyCode
