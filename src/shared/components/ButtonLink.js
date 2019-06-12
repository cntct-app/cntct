import React from 'react'
import { Link } from 'react-router-dom'

import Button from './Button'

const ButtonLink = props => <Button as={Link} {...props} />

export default ButtonLink
