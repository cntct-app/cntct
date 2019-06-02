import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=ZCOOL+QingKe+HuangYou&display=swap');

  * {
    box-sizing: border-box;
  }
  body,
  #root {
    width: 100vw;
    height: 100vh;
  }
  body {
    margin: 0;
    color: white;
  }
`

export default GlobalStyle
