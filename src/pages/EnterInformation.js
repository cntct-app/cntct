import React from 'react'
import styled from 'styled-components'

import Header from '../shared/Header'
import Glyph from '../shared/Glyph'
import { partyCode } from '../shared/mixins'
import Field from '../shared/Field'
import Input from '../shared/Input'

const PartyCodeTitle = styled.h1`
  ${partyCode}
`

const EnterInformationPage = () => (
  <>
    <Header>
      <Glyph name='code' large />
      <PartyCodeTitle>00000</PartyCodeTitle>
    </Header>
    <main>
      <Field>
        <Input placeholder='Name' />
      </Field>
      <Field>
        <Input placeholder='Phone Number' />
      </Field>
      <Field>
        <Input placeholder='Email Address' />
      </Field>
    </main>
  </>
)

export default EnterInformationPage
