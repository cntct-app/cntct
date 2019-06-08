import styled from 'styled-components'

import Glyph from './Glyph'

const Field = styled.div`
  border: 4px solid #1B1B1B;
  border-radius: 8px;
  background-color: #111111;
  width: 100%;
  height: ${({ large }) => large ? '102px' : '48px'};
  display: flex;
  align-items: center;
  padding: 0 calc(${({ large }) => large ? '24px' : '16px'} - 4px);
  margin-bottom: 16px;

  > ${Glyph} {
    margin-right: 16px;
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
