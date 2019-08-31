import React from 'react'
import PropTypes from 'prop-types'

import Button from './Button'
import Container from './Container'
import Label, { Title } from './Label'
import MemberAvatar from './MemberAvatar'

import { formatPhoneNumber } from '../util'
import { dimension } from '../theme'

const MemberDetails = ({ firstName, lastName, phone, email }) => (
  <Container margin={dimension.spacing.connected}>
    <Title secondary>{firstName} {lastName || ''}</Title>
    <Label secondary secondaryColor>{phone ? formatPhoneNumber(phone) : email}</Label>
  </Container>
)

MemberDetails.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string
}

const MemberButton = ({ member, onClick }) => (
  <Button actionGlyph='add' onClick={onClick} stretch noLabel>
    <MemberAvatar firstName={member.firstName} lastName={member.lastName} />
    <MemberDetails firstName={member.firstName} lastName={member.lastName} phone={member.phone} email={member.email} />
  </Button>
)

MemberButton.propTypes = {
  member: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired
}

export default MemberButton
