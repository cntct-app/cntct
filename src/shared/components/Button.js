import styled from 'styled-components'

import Glyph from './Glyph'
import theme from '../theme'

const Button = styled.button`
  background-color: ${theme.color.button.background};
  display: flex;
  text-decoration: none;
  padding: 0 ${theme.dimension.spacing.related};
  align-items: center;
  color: ${theme.color.content.primary};
  font-weight: ${theme.text.title.primary.fontWeight};
  font-size: ${theme.text.title.primary.size};
  width: 100%;
  border-radius: ${theme.dimension.cornerRadius};
  border: 0;
  margin-bottom: ${theme.dimension.spacing.related};
  outline: none;
  height: 48px;

  > span {
    flex-grow: 1;
    text-align: left;
  }

  /* Add spacing around glyphs inside buttons */
  > ${Glyph}:first-child {
    margin-right: ${theme.dimension.spacing.related};
  }

  > ${Glyph}:last-child {
    margin-left: ${theme.dimension.spacing.related};
  }

  &:active {
    /* TODO */
  }

  &:focus {
    /* TODO */
  }
`

export default Button
