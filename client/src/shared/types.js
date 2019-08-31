import PropTypes from 'prop-types'

export const childrenType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node
])

export const memberType = PropTypes.shape({
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  partyCode: PropTypes.string.isRequired
})
