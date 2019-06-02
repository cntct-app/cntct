import React from 'react'
import PropTypes from 'prop-types'

import addGlyph from '../images/glyphs/add.svg'
import arrowGlyph from '../images/glyphs/arrow.svg'
import attentionGlyph from '../images/glyphs/attention.svg'
import codeGlyph from '../images/glyphs/code.svg'
import infoGlyph from '../images/glyphs/info.svg'
import proGlyph from '../images/glyphs/pro.svg'

const Glpyh = ({ name, large }) => {
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

  return <img height={ large ? '28px' : '14px'} src={source} alt={`${name} icon`} />
}

Glpyh.propTypes = {
  name: PropTypes.string.isRequired,
  large: PropTypes.bool
}

export default Glpyh
