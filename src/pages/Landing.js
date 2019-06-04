import React from 'react'
import styled from 'styled-components'

import Field from '../shared/Field'
import Glyph from '../shared/Glyph'
import { NumberInput } from '../shared/Input'
import { partyCode } from '../shared/mixins'
import Header from '../shared/Header'
import Logo from '../shared/Logo'
import ButtonLink from '../shared/ButtonLink'

const PartyCodeInput = styled(NumberInput).attrs(() => ({
  placeholder: '00000'
}))`
  ${partyCode}
`

const Landing = () => (
  <>
    <Header>
      <Logo />
    </Header>
    <main>
      <Field large>
        <Glyph name='code' large />
        <PartyCodeInput />
      </Field>
      <nav>
        <ButtonLink to='/create' glyph='add'>Create Party</ButtonLink>
        <ButtonLink to='/help' glyph='info'> How to Use</ButtonLink>
        <ButtonLink to='/pro' glyph='pro'>Get Pro</ButtonLink>
      </nav>
    </main>
  </>
)

export default Landing
