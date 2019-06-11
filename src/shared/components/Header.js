import styled from 'styled-components'

import Glyph from './Glyph'

const Header = styled.header`
  display: flex;
  align-items: center;
  height: 72px;
  margin-bottom: 16px;

  > ${Glyph} {
    margin-right: 16px;
  }
`

export default Header
