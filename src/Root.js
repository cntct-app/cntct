import React from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'

import LandingPage from './pages/Landing'
import EnterInformationPage from './pages/EnterInformation'
import NotFound from './pages/NotFound'

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 48px 24px;
`

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'ZCOOL QingKe HuangYou';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: local('ZCOOL QingKe HuangYou Regular'), local('ZCOOLQingKeHuangYou-Regular'), url(https://fonts.gstatic.com/l/font?kit=2Eb5L_R5IXJEWhD3AOhSvFC554MOOahI4mRIjv26c8ftUxB6aFL5CSg2i_o&skey=bbcabec4d8024b03&v=v4) format('woff2');
  }
  
  @font-face {
    font-family: system;
    font-style: normal;
    font-weight: 300;
    src: local(".SFNSText-Light"), local(".HelveticaNeueDeskInterface-Light"), local(".LucidaGrandeUI"), local("Ubuntu Light"), local("Segoe UI Light"), local("Roboto-Light"), local("DroidSans"), local("Tahoma");
  }

  * {
    box-sizing: border-box;
  }
  /* body, #root {
    width: 100vw;
    height: 100vh;
  } */
  html {
    background-color: black;
  }
  body {
    margin: 0;
    color: white;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  }
  h1, p {
    margin: 0;
  }
`

const Root = () => (
  <Router>
    <AppContainer>
      <GlobalStyle />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/party/:partyCode' render={EnterInformationPage} />
        <Route exact path='/create' render={() => <h1>Create Party</h1>} />
        <Route exact path='/help' render={() => <h1>How to Use</h1>} />
        <Route exact path='/pro' render={() => <h1>Get Pro</h1>} />
        <Route component={NotFound} />
      </Switch>
    </AppContainer>
  </Router>
)

export default hot(Root)
