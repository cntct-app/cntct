import styled from 'styled-components'

const Input = styled.input.attrs(({ placeholder }) => ({
  placeholder
}))`
  color: white;
  background-color: transparent;
  width: 100%;
  border: 0;
  outline: none;

  &:focus {
    outline: none;
  }
`

export default Input
