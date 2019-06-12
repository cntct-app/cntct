import styled from 'styled-components'

import Glyph from './Glyph'
import { dimension, color } from '../theme'

const Field = styled.div`
  background-color: ${color.field.background};
  border: ${dimension.border.width} solid ${color.field.border};
  border-radius: ${dimension.border.radius};
  display: flex;

  align-items: center;

  margin-bottom: ${dimension.spacing.related};
  padding: 0 ${({ large }) => large ? dimension.large.spacing.related : dimension.spacing.related};

  height: ${({ large }) => large ? dimension.large.control : dimension.control};

  > ${Glyph} {
    flex-shrink: 0;
    
    margin-right: ${dimension.spacing.related};
  }
  
  /* Only supported in modern browsers, but cursor should be enough */
  &:focus-within {
    border: ${dimension.border.width} solid ${color.focusBorder};
  }
`

export default Field
