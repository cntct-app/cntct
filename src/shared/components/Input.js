import styled from 'styled-components'

import { color, text } from '../theme'

const Input = styled.input.attrs(({ placeholder }) => ({
  placeholder
}))`
  background-color: transparent;
  border: 0;
  color: ${color.content.primary};
  outline: none;

  /* Fix the input width on Safari due to a layout bug */
  overflow: hidden; 

  flex-grow: 1;

  padding: 0;
  
  /* Increase the tap target */
  height: 100%;

  font-size: ${text.body.primary.size};

  &::placeholder {
    opacity: 0.5;
    color: ${color.content.primary};
  }
`

export default Input
