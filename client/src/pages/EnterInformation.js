import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { lighten } from 'polished'
import { withRouter } from 'react-router-dom'
import isMobilePhone from 'validator/lib/isMobilePhone'
import isEmail from 'validator/lib/isEmail'
import { parseIncompletePhoneNumber, formatIncompletePhoneNumber } from 'libphonenumber-js'

import Header from '../shared/components/Header'
import PartyCode from '../shared/components/PartyCode'
import Field from '../shared/components/Field'
import Input from '../shared/components/Input'
import Button from '../shared/components/Button'
import Glyph from '../shared/components/Glyph'
import { activeLightenAmount, color, dimension, text } from '../shared/theme'

const PartyName = styled.h2`
  color: ${color.content.secondary};
  font-weight: ${text.title.secondary.weight};
  font-size: ${text.title.secondary.size};
`

const NameContainer = styled.div`
  display: flex;

  > *:first-child {
    margin-right: ${dimension.spacing.related}
  }

  > * {
    flex-grow: 1;
  }
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

    this.onInputChange = this.onInputChange.bind(this)

    this.state = {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      isValid: false
    }
  }
  onInputChange (e) {
    const key = e.target.name
    let value = e.target.value

    if (key === 'phone') {
      let newValue = parseIncompletePhoneNumber(value)

      if (formatIncompletePhoneNumber(newValue) === this.state.phone) {
        newValue = newValue.slice(0, -1)
      }

      value = newValue
    }

    this.setState({
      [key]: value
    }, () => this.validate())
  }
  validate () {
    const { firstName, lastName, phone, email } = this.state
    const isFirstNameValid = firstName.length > 0
    const isLastNameValid = lastName.length > 0
    const isPhoneBlank = phone.length === 0
    const isPhoneValid = isMobilePhone(phone)
    const isEmailBlank = email.length === 0
    const isEmailValid = isEmail(email)
    const isFormValid = isFirstNameValid && isLastNameValid && ((isPhoneValid && isEmailBlank) || (isEmailValid && isPhoneBlank) || (isEmailValid && isPhoneValid))

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
          <form method='POST' action={`/api/party/${partyCode}/add`}>
            <NameContainer>
              <Field>
                <Input placeholder='First Name' name='firstName' onChange={this.onInputChange} value={this.state.firstName} />
              </Field>

              <Field>
                <Input placeholder='Last Name' name='lastName' onChange={this.onInputChange} value={this.state.lastName} />
              </Field>
            </NameContainer>

            <Field>
              <Input placeholder='Phone Number' type='tel' name='phone' autocomplete='tel' onChange={this.onInputChange} value={formatIncompletePhoneNumber(this.state.phone, 'US')} />
            </Field>

            <Field>
              <Input placeholder='Email Address' type='email' name='email' onChange={this.onInputChange} value={this.state.email} />
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
