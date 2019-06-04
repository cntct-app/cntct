import styled from 'styled-components'

const Input = styled.input.attrs(({ placeholder }) => ({
  placeholder
}))`
  color: white;
  background-color: transparent;
  width: 100%;
  border: 0;
  outline: none;
  height: 36px;
  font-size: 17px;
  font-weight: 500;

  &:focus {
    outline: none;
  }
  &::placeholder {
    opacity: 0.5;
    color: white;
  }
`

const NumberInput = styled(Input).attrs(() => ({
  type: 'number'
}))`
  appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
`

export default Input
export {
  NumberInput
}
