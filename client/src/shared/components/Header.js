import styled from 'styled-components'

import Container from './Container'

import { dimension } from '../theme'

const Header = styled(Container).attrs(() => ({
  as: 'header'
}))`
  justify-content: flex-end;
  
  height: ${dimension.header.height};
`

export default Header
