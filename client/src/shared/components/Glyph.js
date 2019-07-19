import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import addGlyph from '../resources/glyphs/add.svg'
import arrowGlyph from '../resources/glyphs/arrow.svg'
import attentionGlyph from '../resources/glyphs/attention.svg'
import codeGlyph from '../resources/glyphs/code.svg'
import infoGlyph from '../resources/glyphs/info.svg'
import importantGlyph from '../resources/glyphs/important.svg'
import errorGlyph from '../resources/glyphs/error.svg'
import proGlyph from '../resources/glyphs/pro.svg'
import { dimension } from '../theme'

const Glyph = styled.img.attrs(({ name }) => {
  let source

  switch (name) {
    case 'add':
      source = addGlyph
      break
    case 'arrow':
      source = arrowGlyph
      break
    case 'attention':
      source = attentionGlyph
      break
    case 'code':
      source = codeGlyph
      break
    case 'info':
      source = infoGlyph
      break
    case 'important':
      source = importantGlyph
      break
    case 'error':
      source = errorGlyph
      break
    case 'pro':
      source = proGlyph
  }

  return {
    src: source,
    alt: `${name} icon`
  }
})`
  flex-shrink: 0;
  
  pointer-events: none;
  user-select: none;

  width: ${({ large }) => large ? dimension.glyph.large.height : dimension.glyph.height};
  height: ${({ large }) => large ? dimension.glyph.large.height : dimension.glyph.height};

  ${({ secondary }) => secondary && css`
    opacity: .25;
  `}
`

Glyph.propTypes = {
  name: PropTypes.string.isRequired,
  large: PropTypes.bool
}

export default Glyph
