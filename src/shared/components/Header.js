import styled from 'styled-components'

import Glyph from './Glyph'
import { dimension } from '../theme'

const Header = styled.header`
  display: flex;
  align-items: center;

  margin-bottom: ${dimension.spacing.related};
  
  height: ${dimension.header.height};

  > ${Glyph} {
    margin-right: ${dimension.spacing.related};
  }
`

export default Header
