import styled from 'styled-components'

import Glyph from './Glyph'

const Button = styled.button`
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

  > span {
    flex-grow: 1;
    text-align: left;
  }

  > ${Glyph}:first-child {
    margin-right: 16px;
  }

  > ${Glyph}:last-child {
    margin-left: 16px;
  }

  &:active {
    /* TODO */
  }

  &:focus {
    /* TODO */
  }
`

export default Button
