import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Container from './Container'
import Label from './Label'
import MemberButton from './MemberButton'
import { LinkButton } from './Button'

import { memberType } from '../types'

const MemberListContainer = styled(Container).attrs(() => ({
  as: 'ul'
}))`
  list-style: none;
  
  margin: 0;
  padding: 0;
`

const MemberList = ({ party: { code: partyCode, members } }) => {
  if (!members.length) {
    return (
      <>
        <Label>There are no members in this party yet.</Label>
        <LinkButton to={`/party/${partyCode}`} primary>Join Party</LinkButton>
      </>
    )
  }

  return (
    <MemberListContainer>
      { members.map(member => (
        <li key={member._id} css={`width: 100%;`}>
          <MemberButton member={member} onClick={() => { window.location.href = `/api/generate_vcard/${member._id}` }} />
        </li>
      )) }
    </MemberListContainer>
  )
}

MemberList.propTypes = {
  party: PropTypes.shape({
    members: PropTypes.arrayOf(memberType).isRequired,
    code: PropTypes.string.isRequired
  }).isRequired
}

export default MemberList
