import React from 'react'
import styled from 'styled-components'

import thonk from '../resources/thonk.svg'
import { dimension } from '../theme'

const ThonkErrorContainer = styled.div`
  > img {
    margin-bottom: ${dimension.spacing.related}
  }
`

const ThonkError = () => (
  <ThonkErrorContainer>
    <img width='100px' src={thonk} />
    <p>How did you find yourself here?</p>
  </ThonkErrorContainer>
)

export default ThonkError
