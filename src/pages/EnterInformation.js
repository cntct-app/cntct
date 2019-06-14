import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { lighten } from 'polished'
import { withRouter } from 'react-router-dom'

import Button from '../shared/components/Button'
import Field from '../shared/components/Field'
import Glyph from '../shared/components/Glyph'
import Header from '../shared/components/Header'
import Input from '../shared/components/Input'
import { activeLightenAmount, color } from '../shared/theme'
import { partyCode } from '../shared/mixins'

const PartyCodeTitle = styled.h1`
  /* Include font styles for displaying party codes */
  ${partyCode}
`

const SubmitButton = styled(Button)`
  /* Remove default background and include fallback for browsers that don't support gradients */
  background-color: ${color.brand}; 
  background-image: linear-gradient(${lighten(0.05, color.brand)}, ${color.brand});

  margin-left: auto;

  /* Reset width to match text size instead of viewport width */
  width: inherit;

  &:hover,
  &:active {
    background-color: ${color.brand}; 
    background-image: linear-gradient(${lighten(0.05 + activeLightenAmount, color.brand)}, ${lighten(activeLightenAmount, color.brand)});
  }
`

const EnterInformation = ({ location }) => {
  // Extract party code from url
  const partyCode = location.pathname.split('/')[2]

  return (
    <>
      <Header>
        <Glyph name='code' large />
        <PartyCodeTitle>{partyCode}</PartyCodeTitle>
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
            {/* <span> is used instead of <p> because block elements are not allowed inside of buttons */}
            <span>Continue</span>
            <Glyph name='arrow' />
          </SubmitButton>
        </form>
      </main>
    </>
  )
}

EnterInformation.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default withRouter(EnterInformation)
