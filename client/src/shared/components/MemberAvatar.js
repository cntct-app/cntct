import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Title } from './Label'

import { color, dimension } from '../theme'

const MemberAvatarContainer = styled.div`
  background-color: ${color.background};
  border-radius: ${dimension.border.radius};
  display: flex;

  align-items: center;
  flex-shrink: 0;
  justify-content: center;

  width: ${dimension.thumbnail.size};
  height: ${dimension.thumbnail.size};
`

const MemberAvatar = ({ image, firstName, lastName }) => (
  <MemberAvatarContainer>
    { image && !firstName && !lastName && <img src={image} /> }
    <Title secondary>{ firstName.slice(0, 1).toUpperCase() }{ lastName ? lastName.slice(0, 1).toUpperCase() : '' }</Title>
  </MemberAvatarContainer>
)

MemberAvatar.propTypes = {
  image: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string
}

export default MemberAvatar
