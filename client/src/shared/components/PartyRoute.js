import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

import Party from '../../pages/Party'

const PartyExistsRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={() => (
    <Party render={(party, memberFormDidMount, memberFormWillUnmount) =>
      <Component party={party} memberFormDidMount={memberFormDidMount} memberFormWillUnmount={memberFormWillUnmount} />
    }/>
  )} />
)

PartyExistsRoute.propTypes = {
  component: PropTypes.elementType.isRequired
}

export default PartyExistsRoute
