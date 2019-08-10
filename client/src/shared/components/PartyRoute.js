import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

import Party from '../../pages/Party'

const PartyExistsRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={() => (
    <Party render={party =>
      <Component party={party} />
    }/>
  )} />
)

PartyExistsRoute.propTypes = {
  component: PropTypes.elementType.isRequired
}

export default PartyExistsRoute
