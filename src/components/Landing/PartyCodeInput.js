import React, { useState } from 'react'
import styled from 'styled-components'

import Input from '../Input'

const NumberInput = props => {
  const [number, setNumber] = useState('')

  const updateNumber = e => {
    const value = e.target.value

    const isNumber = /^[0-9]{0,5}$/

    if (isNumber.test(value)) {
      setNumber(value)
    }
  }

  return <Input {...props} onChange={updateNumber} value={number}/>
}

const PartyCodeInput = styled(NumberInput)`
  height: 36px;
  font-family: 'ZCOOL QingKe HuangYou', monospace;
  letter-spacing: 37%;
  font-size: 36px;
  letter-spacing: 0.37em;
  appearance: textfield;

  &::placeholder {
    opacity: 0.5;
  }
  &::-webkit-input-placeholder {
    color: white;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
`

export default PartyCodeInput
