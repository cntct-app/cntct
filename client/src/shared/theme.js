import { lighten } from 'polished'

const gradientLightenAmount = 0.03
const activeLightenAmount = 0.03

export const generateActiveColor = color => lighten(activeLightenAmount, color)

export const generateHighlightBoxShadow = color => `0 0 4px rgba(255, 255, 255, 0.05) inset, 0 1px 0 ${color} inset`

export const generateGradient = (color, isActive = false) => {
  const lightenAmount = isActive ? activeLightenAmount : 0
  return `linear-gradient(${lighten(gradientLightenAmount + lightenAmount, color)}, ${lighten(lightenAmount, color)})`
}

export const color = {
  background: '#000000',
  brand: '#5674DE',
  error: '#ea3939',
  focusBorder: '#3d3d3d',
  button: {
    background: '#1b1b1b'
  },
  content: {
    important: '#ffd600',
    placeholder: '#ffffff7f',
    primary: '#ffffff',
    secondary: '#ffffffbf'
  },
  field: {
    background: '#191919'
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

export const dimension = {
  appWidth: '600px',
  control: '48px',
  border: {
    radius: '8px',
    width: '4px'
  },
  glyph: {
    height: '14px',
    large: {
      height: '28px'
    }
  },
  header: {
    height: '72px'
  },
  large: {
    control: '102px',
    spacing: {
      related: '24px'
    }
  },
  spacing: {
    connected: '8px',
    related: '16px',
    separate: '24px'
  }
}

export const text = {
  body: {
    font: '-apple-system, BlinkMacSystemFont, Segoe UI, Ubuntu, Cantarell, Roboto, Helvetica Neue, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol',
    primary: {
      size: '17px',
      weight: '500'
    },
    secondary: {
      size: '13px',
      weight: '500'
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
    font: '\'ZCOOL QingKe HuangYou\', monospace',
    size: '36px',
    letterSpacing: '0.37em'
  },
  title: {
    primary: {
      size: '24px',
      weight: '600'
    },
    secondary: {
      size: '17px',
      weight: '600'
    },
    tertiary: {
      size: '13px',
      weight: '600'
    }
  }
}
