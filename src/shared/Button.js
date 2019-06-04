import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Glyph from './Glyph'

const ButtonContainer = styled.button`
  background-color: #1B1B1B;
  display: flex;
  text-decoration: none;
  padding: 0 16px;
  align-items: center;
  color: white;
  font-family: inherit;
  font-weight: 600;
  font-size: 17px;
  width: 100%;
  border-radius: 6px;
  border: 0;
  margin-bottom: 16px;
  outline: none;
  height: 48px;

  > p {
    flex-grow: 1;
    text-align: left;
  }

  > img:first-child {
    margin-right: 16px;
  }

  > img:last-child {
    margin-left: 16px;
  }

  &:active {
    /* TODO */
  }

  &:focus {
    /* TODO */
  }
`

const Button = ({ as, to, glyph, children, actionGlyph }) => (
  <ButtonContainer as={as} to={to}>
    <Glyph name={glyph} />
    <p>{ children }</p>
    <Glyph name={actionGlyph || 'arrow'} />
  </ButtonContainer>
)

Button.propTypes = {
  as: PropTypes.elementType,
  to: PropTypes.string,
  glyph: PropTypes.string,
  children: PropTypes.node,
  actionGlyph: PropTypes.string
}

export default Button
