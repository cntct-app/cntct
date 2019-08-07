import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

import PartyExists from './PartyExists'

const PartyExistsRoute = ({ component: Component, ...rest }) => <Route {...rest} render={() => <PartyExists><Component /></PartyExists>} />

PartyExistsRoute.propTypes = {
  component: PropTypes.elementType.isRequired
}

export default PartyExistsRoute
