import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import isInt from 'validator/lib/isInt'

import Error from './Error'
import Loading from '../shared/components/Loading'

class Party extends Component {
  state = {
    party: null,
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
          party,
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
      return <Loading message='Loading party...' />
    }

    if (this.state.error) {
      return <Error message='Invalid party code' />
    }

    if (!this.state.party) {
      return <Error message='Party does not exist, it may have been closed.' />
    }

    return this.props.render(this.state.party)
  }
}

Party.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired
  }).isRequired,
  render: PropTypes.func.isRequired
}

export default withRouter(Party)
