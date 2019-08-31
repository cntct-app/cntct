import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import isEmail from 'validator/lib/isEmail'
import { parseIncompletePhoneNumber, formatIncompletePhoneNumber } from 'libphonenumber-js'

import Button from './Button'
import Container from './Container'
import Field from './Field'
import Form from './Form'
import Glyph from './Glyph'
import Input from './Input'
import Link from './Link'

import { notificationHelper } from '../helpers'
import { validatePhoneNumber } from '../util'

import { dimension } from '../theme'

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
  componentDidMount = () => {
    this.props.memberFormDidMount()
  }
  componentWillUnmount = () => {
    this.props.memberFormWillUnmount()
  }
  onInputChange = e => {
    const key = e.target.name
    let value = e.target.value

    if (key === 'firstName' && value.length > 35) {
      notificationHelper.add({
        type: 'error',
        content: 'First name cannot be more than 35 characters'
      })
    }

    if (key === 'lastName' && value.length > 35) {
      notificationHelper.add({
        type: 'error',
        content: 'Last name cannot be more than 35 characters'
      })
    }

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
    const isLastNameValid = lastName.length <= 35 // Last name is not required
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

    try {
      await fetch(`/api/party/${this.props.party.code}/join`, {
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

    this.props.history.push(`/party/${this.props.party.code}/members`)
  }
  render = () => (
    <Container margin={dimension.spacing.separate}>
      <Container row margin={dimension.spacing.connected}>
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
  )
}

MemberForm.propTypes = {
  party: PropTypes.shape({ code: PropTypes.string.isRequired }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  memberFormWillUnmount: PropTypes.func.isRequired,
  memberFormDidMount: PropTypes.func.isRequired
}

export default withRouter(MemberForm)
