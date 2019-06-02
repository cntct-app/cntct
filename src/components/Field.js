import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const FieldContainer = styled.div`
  border: 4px solid #1B1B1B;
  border-radius: 6px;
  background-color: #111111;
  width: 100%;
  height: 102px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  margin-bottom: 16px;

  > img {
    margin-right: 16px;
  }

  &:focus {
    outline: none;
    /* TODO */
  }

  &:active {
    /* TODO */
  }
`

const Field = ({ children }) => (
  <FieldContainer>
    { children }
  </FieldContainer>
)

Field.propTypes = {
  children: PropTypes.node.isRequired
}

export default Field
