import styled from 'styled-components'

import Glyph from './Glyph'
import { dimension, color, text } from '../theme'
import { controlTransitions } from '../mixins'

const Button = styled.button.attrs(() => ({
  onTouchStart: e => e.preventDefault()
}))`
  ${controlTransitions}

  background-color: ${color.button.background};
  border: 0;
  border-radius: ${dimension.border.radius};
  color: ${color.content.primary};
  display: flex;
  outline: none;
  user-select: none;

  align-items: center;
  
  margin-bottom: ${dimension.spacing.related};
  padding: 0 ${dimension.spacing.related};

  width: 100%;
  height: ${dimension.control};

  font-size: ${text.title.primary.size};
  font-weight: ${text.title.primary.weight};
  text-decoration: none;

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  
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
    background: ${color.button.activeBackground};
  }

  &:active, 
  &:focus {
    box-shadow: 0px 0px 0px 3px ${color.focusBorder};
    outline: none;
  }
`

export default Button
