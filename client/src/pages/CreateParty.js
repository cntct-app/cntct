import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import Button from '../shared/components/Button'
import Field from '../shared/components/Field'
import Form from '../shared/components/Form'
import Header from '../shared/components/Header'
import Input from '../shared/components/Input'
import { Title } from '../shared/components/Label'

import notificationHelper from '../shared/notificationHelper'

class CreateParty extends Component {
  state = {
    name: ''
  }
  onInputChange = e => {
    const value = e.target.value

    if (value.length < 1) {
      this.setState({
        isValid: false
      })
    } else {
      if (value.length > 30) {
        if (this.state.isValid) {
          notificationHelper.add({
            content: 'Name cannot be more than 30 characters'
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
      name: value
    })
  }
  onSubmit = async e => {
    e.preventDefault()

    const { name } = this.state

    try {
      const resp = await fetch('/api/create_party', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name })
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
  render = () => (
    <>
      <Header>
        <Title>Create Party</Title>
      </Header>

      <Form onSubmit={this.onSubmit}>
        <Field>
          <Input placeholder='Party Name' name='name' onChange={this.onInputChange} value={this.state.name} />
        </Field>

        <Button primary disabled={!this.state.isValid}>Continue</Button>
      </Form>
    </>
  )
}

CreateParty.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(CreateParty)
