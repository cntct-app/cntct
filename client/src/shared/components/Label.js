import styled from 'styled-components'

import { color, text } from '../theme'

const Label = styled.p`
  color: ${({ secondaryColor }) => secondaryColor ? color.content.secondary : color.content.primary};
  font-family: ${text.font};
  font-size: ${({ secondary }) => secondary ? text.body.secondary.size : text.body.primary.size};
  font-weight: ${({ secondary }) => secondary ? text.body.secondary.weight : text.body.primary.weight};

  margin: 0;
`

export const Title = styled(Label).attrs(({ secondary }) => ({
  as: secondary ? 'h2' : 'h1'
}))`
  font-size: ${({ secondary }) => secondary ? text.title.secondary.size : text.title.primary.size};
  font-weight: ${({ secondary }) => secondary ? text.title.secondary.weight : text.title.primary.weight};
`

export default Label
