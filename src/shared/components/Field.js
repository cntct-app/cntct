import styled from 'styled-components'

import Glyph from './Glyph'
import { dimension, color } from '../theme'
import { controlTransitions } from '../mixins'

const Field = styled.div`
  ${controlTransitions}

  background-color: ${color.field.background};
  /* border: ${dimension.border.width} solid ${color.field.border}; */
  border-radius: ${dimension.border.radius};
  display: flex;
  outline: none;

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
    box-shadow: 0px 0px 0px 3px ${color.focusBorder};
  }
`

export default Field
