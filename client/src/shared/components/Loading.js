import React from 'react'
import PropTypes from 'prop-types'
import MDSpinner from 'react-md-spinner'

import Container from './Container'
import Label from './Label'

import { color } from '../theme'

const Loading = ({ message = 'Loading...' }) => (
  <Container>
    <Label>{ message }</Label>
    <MDSpinner singleColor={color.content.primary} />
  </Container>
)

Loading.propTypes = {
  message: PropTypes.string
}

export default Loading
