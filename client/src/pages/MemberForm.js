import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import isEmail from 'validator/lib/isEmail'
import { parseIncompletePhoneNumber, formatIncompletePhoneNumber } from 'libphonenumber-js'

import Button from '../shared/components/Button'
import Container from '../shared/components/Container'
import Field from '../shared/components/Field'
import Form from '../shared/components/Form'
import Glyph from '../shared/components/Glyph'
import Input from '../shared/components/Input'
import Link from '../shared/components/Link'
import PartyHeader from '../shared/components/PartyHeader'

import { validatePhoneNumber } from '../shared/util'

import { dimension } from '../shared/theme'

const NameContainer = styled(Container).attrs({
  row: true
})`
  > ${Field} {
    flex-grow: 1;
    flex-shrink: initial;
  }
`

class MemberForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    isValid: false
  }
  onInputChange = e => {
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
  validate = () => {
    const { firstName, lastName, phone, email } = this.state
    const isFirstNameValid = firstName.length && firstName.length <= 35
    const isLastNameValid = lastName.length && firstName.length <= 35
    const isPhoneBlank = phone.length === 0
    const isPhoneValid = validatePhoneNumber(phone)
    const isEmailBlank = email.length === 0
    const isEmailValid = isEmail(email)
    const isFormValid = isFirstNameValid && isLastNameValid && ((isPhoneValid && isEmailBlank) || (isEmailValid && isPhoneBlank) || (isEmailValid && isPhoneValid))

    this.setState({
      isValid: isFormValid
    })
  }
  onSubmit = async e => {
    e.preventDefault()

    const { firstName, lastName, phone, email } = this.state
    const { partyCode } = this.props.match.params

    try {
      await fetch(`/api/party/${partyCode}/join`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          email
        })
      })
    } catch (err) {
      console.error(`Error joining party: ${err}`)
      return
    }

    this.props.history.push(`${this.props.location.pathname}/members`)
  }
  render = () => (
    <>
      <PartyHeader partyCode={this.props.match.params.partyCode} />

      <Container spacing={dimension.spacing.separate}>
        <Container row spacing={dimension.spacing.connected}>
          <Glyph glyph='important' />
          <Link to='/privacy' secondary>We only store your data temporarily</Link>
        </Container>

        <Form onSubmit={this.onSubmit}>
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

          <Button primary disabled={!this.state.isValid}>Continue</Button>
        </Form>
      </Container>
    </>
  )
}

MemberForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
}

export default withRouter(MemberForm)
