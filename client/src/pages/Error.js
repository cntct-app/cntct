import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { ButtonContainer, LinkButton } from '../shared/components/Button'
import Container from '../shared/components/Container'
import Header from '../shared/components/Header'
import Label from '../shared/components/Label'
import Logo from '../shared/components/Logo'

import { dimension } from '../shared/theme'

import thonkImage from '../shared/resources/thonk.svg'

const ErrorContainer = styled(Container)`
  > img {
    width: 100px;
  }

  && > p {
    margin-bottom: ${dimension.spacing.separate};
  }

  ${ButtonContainer} {
    margin-right: auto;
  }
`

const Error = ({ message, linkHome = true, thonk = false }) => (
  <>
    <Header>
      <Logo />
    </Header>

    <ErrorContainer>
      { thonk && <img src={thonkImage} alt='' /> }
      <Label>{ message }</Label>
      { linkHome && <LinkButton to='/' primary>Go Home</LinkButton> }
    </ErrorContainer>
  </>
)

Error.propTypes = {
  message: PropTypes.string.isRequired,
  linkHome: PropTypes.bool,
  thonk: PropTypes.bool
}

export default Error
