import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'

import LandingPage from './pages/Landing'
import EnterInformationPage from './pages/EnterInformation'
import NotFound from './pages/NotFound'
import theme from './shared/theme'

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 48px 24px;
  max-width: 600px;
  margin: 0 auto;
`

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=ZCOOL+QingKe+HuangYou&display=swap&text=0123456789');

  * {
    box-sizing: border-box;
  }

  html {
    background-color: black;
  }

  body {
    margin: 0;
    color: white;
    font-family: ${theme.text.body.font};
  }

  h1, 
  p {
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
