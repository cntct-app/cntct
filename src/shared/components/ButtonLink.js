import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import Button from './Button'

const ButtonLink = ({ history, location, match, staticContext, to, onClick, ...rest }) => (
  // Filter out props that button doesn’t know what to do with
  <Button
    {...rest}
    onClick={e => {
      if (onClick) {
        onClick(e)
      }

      history.push(to)
    }}
  />
)

ButtonLink.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  staticContext: PropTypes.object,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

export default withRouter(ButtonLink)
