import React from 'react'

import Logo from '../Logo'
import Field from '../Field'
import Glyph from '../Glyph'
import PartyCodeInput from './PartyCodeInput'

const Landing = () => (
  <>
    <Logo />
    <main>
      <Field>
        <Glyph name='code' large />
        <PartyCodeInput placeholder='00000' />
      </Field>
    </main>
    {/* <Main>
      <CodeField />
      <Nav>
        <Button>Create Party</Button>
        <Button>How to Use</Button>
        <Button>Get Pro</Button>
      </Nav>
    </Main> */}
  </>
)

export default Landing
