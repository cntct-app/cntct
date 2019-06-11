import styled from 'styled-components'

const Input = styled.input.attrs(({ placeholder }) => ({
  placeholder
}))`
  color: white;
  background-color: transparent;
  width: 100%;
  border: 0;
  outline: none;
  height: 100%;
  font-size: 17px;
  padding: 0;

  &:focus {
    outline: none;
  }
  &::placeholder {
    opacity: 0.5;
    color: white;
  }
`

export default Input
