import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { withRouter } from 'react-router-dom'

import Glyph from './Glyph'
import { Title } from './Label'

import { childrenType } from '../types'
import { ButtonState } from '../enums'
import { controlTransitions } from '../mixins'

import { color, dimension, generateColorVariant, generateGradient, generateHighlightBoxShadow, highlight, text } from '../theme'

export const ButtonContainer = styled.button.attrs(() => ({
  onTouchStart: e => e.preventDefault()
}))`
  ${controlTransitions}

  /* Remove default background and include fallback for browsers that don't support gradients */
  background-color: ${color.button.background}; 
  background-image: ${generateGradient(color.button.background)};
  border: 0;
  border-radius: ${dimension.border.radius};
  box-shadow: ${generateHighlightBoxShadow(highlight.button)};
  color: ${color.content.primary};
  font-size: ${text.title.secondary.size};
  font-weight: ${text.title.secondary.weight};
  text-decoration: none;

  display: flex;
  outline: none;
  user-select: none;

  align-items: center;
  
  padding: ${({ noLabel }) => noLabel ? dimension.spacing.related : '0'} ${dimension.spacing.related};

  min-width: ${dimension.control.size};
  height: ${({ noLabel }) => noLabel ? 'auto' : dimension.control.size};

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  > *:not(:last-child) {
    margin-right: ${dimension.spacing.related};
  }

  > span {
    text-align: left;

    flex-grow: 1;
  }

  > ${Glyph}:only-child {
    margin: 0 auto;
  }

  ${({ disabled }) => disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
  `}

  ${({ primary }) => primary && css`
    background-color: ${color.brand};
    background-image: ${generateGradient(color.brand)};
    box-shadow: ${generateHighlightBoxShadow(highlight.brand)};

    &&:enabled:hover {
      background-color: ${generateColorVariant(color.brand, ButtonState.HOVER)}; 
      background-image: ${generateGradient(color.brand, ButtonState.HOVER)};
    }

    &&:enabled:active {
      background-color: ${generateColorVariant(color.brand, ButtonState.ACTIVE)}; 
      background-image: ${generateGradient(color.brand, ButtonState.ACTIVE)};
    }
  `}

  ${({ stretch }) => stretch && css`
    width: 100%;
  `}

  &:enabled:hover {
    background-color: ${generateColorVariant(color.button.background, ButtonState.HOVER)};
    background-image: ${generateGradient(color.button.background, ButtonState.HOVER)};
  }

  &:enabled:active {
    background-color: ${generateColorVariant(color.button.background, ButtonState.ACTIVE)};
    background-image: ${generateGradient(color.button.background, ButtonState.ACTIVE)};
  }

  &:enabled:active, 
  &:focus {
    box-shadow: ${generateHighlightBoxShadow(highlight.button)}, 0 0 0 3px ${color.focusBorder};
    outline: none;
  }
`

const Button = props => {
  const { labelGlyph, noLabel, actionGlyph = 'arrow' } = props
  const { children, ...rest } = props

  let content = children

  if (!noLabel && children) {
    content = <Title as='span' secondary>{ children }</Title>
  }

  return (
    <ButtonContainer {...rest}>
      { labelGlyph && <Glyph glyph={labelGlyph} /> }
      { content }
      <Glyph glyph={actionGlyph} />
    </ButtonContainer>
  )
}

Button.propTypes = {
  labelGlyph: PropTypes.string,
  actionGlyph: PropTypes.string,
  primary: PropTypes.bool,
  noLabel: PropTypes.bool,
  stretch: PropTypes.bool,
  children: childrenType,
  onClick: PropTypes.func
}

const _LinkButton = ({ to, history, children, ...rest }) => (
  <Button onClick={() => history.push(to)} {...rest}>
    { children }
  </Button>
)

_LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  children: childrenType
}

export const LinkButton = withRouter(_LinkButton)
export default Button
