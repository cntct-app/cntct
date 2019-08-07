import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import isInt from 'validator/lib/isInt'

import Label from './Label'
import Error from '../../pages/Error'

class PartyExists extends Component {
  state = {
    name: '',
    loading: true,
    error: false
  }
  componentDidMount = async () => {
    const partyCode = this.props.match.params.partyCode

    const isPartyCodeValid = partyCode.length === 5 && isInt(partyCode)

    if (!isPartyCodeValid) {
      this.setState({
        loading: false,
        error: true
      })

      return
    }

    try {
      const resp = await fetch(`/api/party/${this.props.match.params.partyCode}/`)
      const { party } = await resp.json()

      if (party) {
        this.setState({
          name: party.name,
          loading: false
        })
      } else {
        this.setState({
          loading: false
        })
      }
    } catch (err) {
      console.error(`Error fetching party name: ${err}`)
    }
  }
  render = () => {
    if (this.state.loading) {
      return <Label>Loading...</Label>
    }

    if (this.state.error) {
      return <Error message='Invalid party code' />
    }

    if (!this.state.name.length) {
      return <Error message='This party does not exist, it may have been closed.' />
    }

    return this.props.children
  }
}

PartyExists.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default withRouter(PartyExists)
