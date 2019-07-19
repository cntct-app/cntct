import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter, Route, Switch } from 'react-router-dom'
import isInt from 'validator/lib/isInt'

import Header from '../shared/components/Header'
import PartyCode from '../shared/components/PartyCode'
import MemberForm from '../shared/components/MemberForm'
import MemberList from '../shared/components/MemberList'
import NotFound from '../pages/NotFound'
import ThonkError from '../shared/components/ThonkError'
import { color, text } from '../shared/theme'

const PartyName = styled.h2`
  color: ${color.content.secondary};
  font-weight: ${text.title.secondary.weight};
  font-size: ${text.title.secondary.size};
`

const Party = ({ match }) => {
  const partyError = 'Party does not exist'
  const { partyCode } = match.params

  if (!isInt(partyCode) || partyCode.length !== 5) {
    return <NotFound />
  }

  const [partyName, setPartyName] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await fetch(`/api/party/${partyCode}`)
        const { party } = await resp.json()

        if (party) {
          setPartyName(party.name)
        } else {
          setPartyName(partyError)
        }
      } catch (err) {
        console.error(`Error fetching party name: ${err}`)
      }
    }

    fetchData()
  }, [])

  let bodyComponent

  switch (partyName) {
    case null:
      bodyComponent = <p>Loading...</p>
      break
    case partyError:
      bodyComponent = <ThonkError />
      break
    default:
      bodyComponent = (
        <Switch>
          <Route exact path='/party/:partyCode' component={MemberForm} />
          <Route path='/party/:partyCode/members' render={MemberList} />
        </Switch>
      )
      break
  }

  return (
    <>
      <Header>
        <PartyCode code={partyCode} />
        <PartyName>{partyName}</PartyName>
      </Header>

      { bodyComponent }
    </>
  )
}

Party.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired
}

export default withRouter(Party)
