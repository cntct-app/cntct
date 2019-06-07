import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import Header from '../shared/Header'
import Glyph from '../shared/Glyph'
import { partyCode } from '../shared/mixins'
import Field from '../shared/Field'
import Input from '../shared/Input'
import Button from '../shared/Button'

const PartyCodeTitle = styled.h1`
  ${partyCode}
`

const SubmitButton = styled(Button)`
  background-color: #5674DE;
  width: inherit;
  margin-left: auto;
`

const EnterInformation = ({ location }) => (
  <>
    <Header>
      <Glyph name='code' large />
      <PartyCodeTitle>{ location.pathname.split('/')[2] }</PartyCodeTitle>
    </Header>
    <main>
      <form>
        <Field>
          <Input placeholder='Name' />
        </Field>

        <Field>
          <Input placeholder='Phone Number' type='tel' />
        </Field>

        <Field>
          <Input placeholder='Email Address' type='email' />
        </Field>

        <SubmitButton>
          <span>Continue</span>
          <Glyph name='arrow' />
        </SubmitButton>
      </form>
    </main>
  </>
)

EnterInformation.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default withRouter(EnterInformation)
