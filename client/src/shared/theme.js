import { lighten } from 'polished'

import { ButtonState } from './enums'

const gradientLightenAmount = 0.03
const hoverLightenAmount = 0.03
const activeLightenAmount = 0.05

const buttonStateToLightenAmount = {
  [ButtonState.NORMAL]: 0,
  [ButtonState.HOVER]: hoverLightenAmount,
  [ButtonState.ACTIVE]: activeLightenAmount
}

export const generateColorVariant = (color, state) => {
  switch (state) {
    case ButtonState.ACTIVE:
      return lighten(activeLightenAmount, color)
    case ButtonState.HOVER:
      return lighten(hoverLightenAmount, color)
  }
}

export const generateGradient = (color, state = ButtonState.NORMAL) => {
  const lightenAmount = buttonStateToLightenAmount[state]
  return `linear-gradient(${lighten(gradientLightenAmount + lightenAmount, color)}, ${lighten(lightenAmount, color)})`
}

export const generateHighlightBoxShadow = color => `0 0 4px rgba(255, 255, 255, 0.05) inset, 0 1px 0 ${color} inset`

export const color = {
  background: '#000',
  brand: '#5674de',
  error: '#ea3939',
  focusBorder: '#3d3d3d',
  important: '#ffd600',
  button: {
    background: '#1b1b1b'
  },
  content: {
    primary: '#ffffff',
    secondary: '#ffffff7f'
  },
  field: {
    background: '#191919'
  }
}

export const dimension = {
  appWidth: '600px',
  border: {
    radius: '8px',
    width: '4px'
  },
  control: {
    size: '48px'
  },
  glyph: {
    size: '14px'
  },
  header: {
    height: '72px'
  },
  small: {
    spacing: {
      connected: '4px'
    }
  },
  large: {
    control: {
      size: '102px'
    },
    glyph: {
      size: '28px'
    },
    spacing: {
      related: '24px'
    }
  },
  spacing: {
    connected: '8px',
    related: '16px',
    separate: '24px'
  },
  thumbnail: {
    size: '44px'
  }
}

export const effect = {
  dropShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)'
}

export const highlight = {
  brand: '#81AAEC',
  button: '#333333',
  error: '#F35B5B',
  field: '#282828'
}

export const text = {
  font: '-apple-system, BlinkMacSystemFont, Segoe UI, Ubuntu, Cantarell, Roboto, Helvetica Neue, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol',
  body: {
    primary: {
      size: '17px',
      weight: '400'
    },
    secondary: {
      size: '13px',
      weight: '400'
    }
  },
  link: {
    primary: {
      size: '17px',
      weight: '500'
    },
    secondary: {
      size: '13px',
      weight: '500'
    }
  },
  partyCode: {
    font: '"ZCOOL QingKe HuangYou", monospace',
    letterSpacing: '0.37em',
    size: '36px'
  },
  title: {
    primary: {
      size: '32px',
      weight: '600'
    },
    secondary: {
      size: '17px',
      weight: '500'
    }
  }
}
