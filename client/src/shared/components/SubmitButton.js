import styled from 'styled-components'

import Button from './Button'
import { color, generateActiveColor, generateGradient, generateHighlightBoxShadow, highlight } from '../theme'

const SubmitButton = styled(Button)`
  /* Remove default background and include fallback for browsers that don't support gradients */
  background-color: ${color.brand}; 
  background-image: ${generateGradient(color.brand)};
  box-shadow: ${generateHighlightBoxShadow(highlight.brand)};

  margin-left: auto;

  /* Reset width to match text size instead of viewport width */
  width: inherit;

  &:enabled:hover,
  &:enabled:active {
    background-color: ${generateActiveColor(color.brand)}; 
    background-image: ${generateGradient(color.brand, true)};
  }
`

export default SubmitButton
