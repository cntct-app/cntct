import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { dimension } from '../theme'

const Container = styled.div`
  display: flex;
  
  align-items: ${({ center }) => center ? 'center' : 'flex-start'};

  flex-direction: ${({ row }) => row ? 'row' : 'column'};

  width: 100%;

  > * {
    flex-shrink: 0;
  }

  > *:not(:last-child) {
    ${({ row, spacing = dimension.spacing.related }) => row ? css`
      margin-right: ${spacing};
    ` : css`
      margin-bottom: ${spacing};
    `}
  }
`

Container.propTypes = {
  center: PropTypes.bool,
  row: PropTypes.bool,
  spacing: PropTypes.string
}

export default Container
