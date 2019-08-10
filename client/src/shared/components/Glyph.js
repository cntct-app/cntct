import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

import addGlyph from '../resources/glyphs/add.svg'
import arrowGlyph from '../resources/glyphs/arrow.svg'
import attentionGlyph from '../resources/glyphs/attention.svg'
import codeGlyph from '../resources/glyphs/code.svg'
import errorGlyph from '../resources/glyphs/error.svg'
import infoGlyph from '../resources/glyphs/info.svg'
import importantGlyph from '../resources/glyphs/important.svg'
import notificationGlyph from '../resources/glyphs/notification.svg'
import proGlyph from '../resources/glyphs/pro.svg'

import { dimension } from '../theme'

const glyphNameToImageSource = {
  add: addGlyph,
  arrow: arrowGlyph,
  attention: attentionGlyph,
  code: codeGlyph,
  error: errorGlyph,
  info: infoGlyph,
  important: importantGlyph,
  notification: notificationGlyph,
  pro: proGlyph
}

const Glyph = styled.img.attrs(({ glyph }) => {
  return ({
    src: glyphNameToImageSource[glyph],
    alt: `${glyph} icon`
  })
})`
  flex-shrink: 0;
  
  pointer-events: none;
  user-select: none;

  width: ${({ large }) => large ? dimension.large.glyph.size : dimension.glyph.size};
  height: ${({ large }) => large ? dimension.large.glyph.size : dimension.glyph.size};
`

Glyph.propTypes = {
  glyph: PropTypes.string.isRequired,
  large: PropTypes.bool
}

export default Glyph
