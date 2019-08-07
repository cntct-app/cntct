import styled from 'styled-components'

import { ButtonContainer } from './Button'
import Container from './Container'

const Form = styled(Container).attrs(() => ({
  as: 'form'
}))`
  ${ButtonContainer} {
    margin-left: auto;
  }
`

export default Form
