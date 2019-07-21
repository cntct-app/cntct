import styled from 'styled-components'

import { dimension } from '../theme'

const Header = styled.header`
  display: flex;

  flex-direction: column;
  justify-content: flex-end;
  
  margin-bottom: ${dimension.spacing.separate};
  
  height: ${dimension.header.height};

  /* Party Code */
  > div {
    margin-bottom: ${dimension.spacing.connected}
  }

  /* Logo */
  > img {
    margin-right: auto;
  }
`

export default Header
