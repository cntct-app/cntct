import { css } from 'styled-components'

import { text } from './theme'

const controlTransitions = css`
  transition: background-color 0.5s ease, box-shadow 0.25s ease;

  &:active, &:hover {
    transition: box-shadow 0.25s ease;
  }
`

const partyCode = css`
  font-family: ${text.partyCode.font};
  font-size: ${text.partyCode.size};
  letter-spacing: ${text.partyCode.letterSpacing};
`

export {
  controlTransitions,
  partyCode
}
