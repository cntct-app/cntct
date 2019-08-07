import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import Label from './Label'

import { text } from '../theme'

import { childrenType } from '../types'

const StyledLink = styled(Label).attrs(() => ({
  as: 'a'
}))`
  font-size: ${({ secondary }) => secondary ? text.link.secondary.size : text.link.primary.size};
  font-weight: ${({ secondary }) => secondary ? text.link.secondary.weight : text.link.primary.weight};
`

const Link = ({ to, children, history, ...rest }) => (
  <StyledLink href={to} onClick={e => {
    e.preventDefault()
    history.push(to)
  }} {...rest}>
    { children }
  </StyledLink>
)

Link.propTypes = {
  to: PropTypes.string.isRequired,
  children: childrenType,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
}

export default withRouter(Link)
