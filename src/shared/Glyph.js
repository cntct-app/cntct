import styled from 'styled-components'
import PropTypes from 'prop-types'

import addGlyph from '../images/glyphs/add.svg'
import arrowGlyph from '../images/glyphs/arrow.svg'
import attentionGlyph from '../images/glyphs/attention.svg'
import codeGlyph from '../images/glyphs/code.svg'
import infoGlyph from '../images/glyphs/info.svg'
import proGlyph from '../images/glyphs/pro.svg'

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
    case 'pro':
      source = proGlyph
  }

  return {
    src: source,
    alt: `${name} icon`
  }
})`
  height: ${({ large }) => large ? '28px' : '14px'}
`

Glyph.propTypes = {
  name: PropTypes.string.isRequired,
  large: PropTypes.bool
}

export default Glyph
