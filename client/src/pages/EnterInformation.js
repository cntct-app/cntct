import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { lighten } from 'polished'
import { withRouter } from 'react-router-dom'
import isMobilePhone from 'validator/lib/isMobilePhone'
import isEmail from 'validator/lib/isEmail'
import { AsYouType } from 'libphonenumber-js'

import Header from '../shared/components/Header'
import PartyCode from '../shared/components/PartyCode'
import Field from '../shared/components/Field'
import Input from '../shared/components/Input'
import Button from '../shared/components/Button'
import Glyph from '../shared/components/Glyph'
import { activeLightenAmount, color, text } from '../shared/theme'

const PartyName = styled.h2`
  color: ${color.content.secondary};
  font-weight: ${text.title.secondary.weight};
  font-size: ${text.title.secondary.size};
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

class EnterInformation extends Component {
  constructor (props) {
    super(props)

    this.onNameChange = this.onNameChange.bind(this)
    this.onPhoneChange = this.onPhoneChange.bind(this)
    this.onEmailChange = this.onEmailChange.bind(this)
    this.validate = this.validate.bind(this)

    this.state = {
      name: '',
      phone: '',
      email: '',
      isValid: false
    }
  }
  onNameChange (e) {
    this.setState({
      name: e.target.value
    }, () => this.validate())
  }
  onPhoneChange (e) {
    const value = e.target.value
    const formatted = new AsYouType('US').input(value)

    this.setState({
      phone: formatted
    }, () => this.validate())
  }
  onEmailChange (e) {
    this.setState({
      email: e.target.value
    }, () => this.validate())
  }
  validate () {
    const isNameValid = this.state.name.length > 0
    const isPhoneBlank = this.state.phone.length === 0
    const isPhoneValid = isMobilePhone(this.state.phone)
    const isEmailBlank = this.state.email.length === 0
    const isEmailValid = isEmail(this.state.email)
    const isFormValid = isNameValid && ((isPhoneValid && isEmailBlank) || (isEmailValid && isPhoneBlank) || (isEmailValid && isPhoneValid))

    this.setState({
      isValid: isFormValid
    })
  }
  render () {
    // Extract party code from url
    const partyCode = location.pathname.split('/')[2]

    return (
      <>
        <Header>
          <PartyCode code={partyCode} />
          <PartyName>Hipster-Hacks</PartyName>
        </Header>

        <main>
          <form>
            <Field>
              <Input placeholder='Name' name='name' onChange={this.onNameChange} value={this.state.name} />
            </Field>

            <Field>
              <Input placeholder='Phone Number' type='tel' name='phone' autocomplete='tel' onChange={this.onPhoneChange} value={this.state.phone} />
            </Field>

            <Field>
              <Input placeholder='Email Address' type='email' name='email' onChange={this.onEmailChange} value={this.state.email} />
            </Field>

            <SubmitButton disabled={!this.state.isValid}>
              {/* span instead of p because block elements are not allowed in buttons */}
              <span>Continue</span>
              <Glyph name='arrow' />
            </SubmitButton>
          </form>
        </main>
      </>
    )
  }
}

EnterInformation.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
}

export default withRouter(EnterInformation)
