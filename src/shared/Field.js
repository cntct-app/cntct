import styled from 'styled-components'

import Glyph from './Glyph'
import theme from './theme'

const Field = styled.div`
  border: 4px solid #1B1B1B;
  border-radius: ${theme.dimension.cornerRadius};
  background-color: #111111;
  width: 100%;
  height: ${({ large }) => large ? '102px' : '48px'};
  display: flex;
  align-items: center;
  padding: 0 calc(${({ large }) => large ? '24px' : '16px'} - 4px);
  margin-bottom: ${theme.dimension.spacing.related};

  > ${Glyph} {
    margin-right: ${theme.dimension.spacing.related};
  }

  &:focus {
    outline: none;
    /* TODO */
  }

  &:active {
    /* TODO */
  }
`

export default Field
