import styled from 'styled-components'

import { color, dimension, text } from '../theme'

const Input = styled.input.attrs(({ placeholder }) => ({
  placeholder
}))`
  background-color: transparent;
  border: 0;
  color: ${color.content.primary};
  outline: none;

  /* Fix placeholder alignment in iOS Safari */
  line-height: normal;

  /* Fix the input width on Safari due to a layout bug */
  overflow: hidden; 

  flex-grow: 1;

  padding: 0 ${({ large }) => large ? dimension.large.spacing.related : dimension.spacing.related};
  
  /* Increase the tap target */
  width: 100%;
  height: 100%;

  font-family: ${text.font};
  font-size: ${text.body.primary.size};
  font-weight: ${text.body.primary.weight};

  &::placeholder {
    color: ${color.content.primary};
    opacity: .35;
  }

  /* Fix Safari autofill icon color */
  &:not(:-webkit-autofill)::-webkit-contacts-auto-fill-button {
    background-color: #fff;
  }
  &:focus {
    outline: none;
  }
`

export default Input
