import React from 'react'
import { Link } from 'react-router-dom'

import Logo from '../Logo'
import Field from '../Field'
import Glyph from '../Glyph'
import PartyCodeInput from './PartyCodeInput'
import Button from '../Button'

const Landing = () => (
  <>
    <Logo />

    <main>
      <Field>
        <Glyph name='code' large />
        <PartyCodeInput placeholder='00000' />
      </Field>

      <nav>
        <Button as={Link} to='/create' glyph='add'>Create Party</Button>
        <Button as={Link} to='/info' glyph='info'> How to Use</Button>
        <Button as={Link} to='/pro' glyph='pro'>Get Pro</Button>
      </nav>
    </main>
  </>
)

export default Landing
