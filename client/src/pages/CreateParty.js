import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import Header from '../shared/components/Header'
import Field from '../shared/components/Field'
import Input from '../shared/components/Input'
import SubmitButton from '../shared/components/SubmitButton'
import Glyph from '../shared/components/Glyph'
import notificationHelper from '../shared/notificationHelper'

class CreateParty extends Component {
  constructor (props) {
    super(props)

    this.onInputChange = this.onInputChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      partyName: ''
    }
  }
  onInputChange (e) {
    const value = e.target.value

    if (value.length < 1) {
      this.setState({
        isValid: false
      })
    } else {
      if (value.length > 30) {
        if (this.state.isValid) {
          notificationHelper.add({
            content: 'Party name cannot be more than 30 characters'
          })
        }

        this.setState({
          isValid: false
        })
      } else {
        this.setState({
          isValid: true
        })
      }
    }

    this.setState({
      partyName: value
    })
  }
  async onSubmit (e) {
    e.preventDefault()

    const { partyName } = this.state

    try {
      const resp = await fetch('/api/create_party', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ partyName })
      })
      const { code } = await resp.json()

      this.props.history.push(`/party/${code}`)
    } catch (err) {
      console.error(`Error creating party: ${err}`)

      notificationHelper.add({
        type: 'error',
        content: 'Error creating party'
      })
    }
  }
  render () {
    return (
      <div>
        <Header>
          <h1>Create Party</h1>
        </Header>
        <form onSubmit={this.onSubmit}>
          <Field>
            <Input placeholder='Party Name' name='partyName' onChange={this.onInputChange} value={this.state.partyName} />
          </Field>
          <SubmitButton disabled={!this.state.isValid}>
            <span>Continue</span>
            <Glyph name='arrow' />
          </SubmitButton>
        </form>
      </div>
    )
  }
}

CreateParty.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(CreateParty)
