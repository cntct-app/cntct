import styled from 'styled-components'
import { lighten } from 'polished'

import Glyph from './Glyph'
import { dimension, color, effects } from '../theme'
import { controlTransitions } from '../mixins'

const Field = styled.div`
  ${controlTransitions}

  background-image: linear-gradient(${color.field.background}, ${lighten(0.03, color.field.background)});
  box-shadow: ${effects.boxShadowHighlight};
  border-radius: ${dimension.border.radius};
  display: flex;
  outline: none;

  align-items: center;

  margin-bottom: ${dimension.spacing.related};
  
  height: ${({ large }) => large ? dimension.large.control : dimension.control};

  > ${Glyph} {
    flex-shrink: 0;
    
    margin-right: ${dimension.spacing.related};
  }
  
  /* Only supported in modern browsers, but cursor should be enough */
  &:focus-within {
    box-shadow: ${effects.boxShadowHighlight}, 0px 0px 0px 3px ${color.focusBorder};
  }
`

export default Field
