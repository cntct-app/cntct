import styled, { css } from 'styled-components'
import { lighten } from 'polished'

import Glyph from './Glyph'
import { activeLightenAmount, color, dimension, effects, text } from '../theme'
import { controlTransitions } from '../mixins'

const Button = styled.button.attrs(() => ({
  onTouchStart: e => e.preventDefault()
}))`
  ${controlTransitions}

  /* Remove default background and include fallback for browsers that don't support gradients */
  background-color: ${color.button.background}; 
  background-image: linear-gradient(${lighten(0.03, color.button.background)}, ${color.button.background});
  border: 0;
  border-radius: ${dimension.border.radius};
  box-shadow: ${effects.boxShadowHighlight};
  color: ${color.content.primary};
  display: flex;
  outline: none;
  user-select: none;

  align-items: center;
  
  padding: 0 ${dimension.spacing.related};

  width: 100%;
  height: ${dimension.control};

  font-size: ${text.title.secondary.size};
  font-weight: ${text.title.secondary.weight};
  text-decoration: none;

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  ${props => props.disabled && css`
    opacity: 0.65;
    cursor: not-allowed;
  `}
  
  > span {
    text-align: left;

    flex-grow: 1;
  }

  /* Add spacing around glyphs inside buttons */
  > ${Glyph}:first-child {
    margin-right: ${dimension.spacing.related};
  }

  > ${Glyph}:last-child {
    margin-left: ${dimension.spacing.related};
  }

  &:hover,
  &:active {
    background-color: ${lighten(activeLightenAmount, color.button.background)}; 
    background-image: linear-gradient(${lighten(0.03 + activeLightenAmount, color.button.background)}, ${lighten(activeLightenAmount, color.button.background)});
  }

  &:active, 
  &:focus {
    box-shadow: ${effects.boxShadowHighlight}, 0 0 0 3px ${color.focusBorder};
    outline: none;
  }
`

export default Button
