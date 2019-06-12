import styled from 'styled-components'

import Glyph from './Glyph'
import { dimension, color, text } from '../theme'

const Button = styled.button`
  background-color: ${color.button.background};
  border: ${dimension.border.width} solid transparent;
  border-radius: ${dimension.border.radius};
  color: ${color.content.primary};
  display: flex;
  outline: none;

  align-items: center;
  
  margin-bottom: ${dimension.spacing.related};
  padding: 0 calc(${dimension.spacing.related} - ${dimension.border.width});

  height: ${dimension.control};

  font-size: ${text.title.primary.size};
  font-weight: ${text.title.primary.weight};
  text-decoration: none;
  
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

  &:active {
    background: ${color.button.activeBackground};
  }

  &:active, 
  &:focus {
    border: ${dimension.border.width} solid ${color.focusBorder};
  }
`

export default Button
