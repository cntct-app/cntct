import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import isMobilePhone from 'validator/lib/isMobilePhone'
import isEmail from 'validator/lib/isEmail'
import { parseIncompletePhoneNumber, formatIncompletePhoneNumber } from 'libphonenumber-js'

import Field from './Field'
import Input from './Input'
import Glyph from './Glyph'
import SubmitButton from './SubmitButton'
import { color, dimension } from '../theme'

const NameContainer = styled.div`
  display: flex;

  > *:first-child {
    margin-right: ${dimension.spacing.related}
  }

  > * {
    flex-grow: 1;
  }
`

const Info = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  > img {
    margin-right: ${dimension.spacing.connected};
    fill: ${color.content.important}
  }
`

class MemberForm extends Component {
  constructor (props) {
    super(props)

    this.onInputChange = this.onInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

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
  async onSubmit (e) {
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

    this.props.history.push(`${this.props.location.pathname}/list`)
  }
  render () {
    return (
      <>
        <Info>
          <Glyph name='important' />
          <p>We only store your data temporarily</p>
        </Info>
        <form onSubmit={this.onSubmit}>
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
      </>
    )
  }
}

MemberForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(MemberForm)
