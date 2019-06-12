import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Normalize } from 'styled-normalize'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'

import LandingPage from './pages/Landing'
import EnterInformationPage from './pages/EnterInformation'
import NotFound from './pages/NotFound'
import { dimension, color, text } from './shared/theme'

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: ${dimension.appWidth};

  margin: 0 auto;
  padding: ${dimension.large.spacing.separate} ${dimension.spacing.separate};
`

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=ZCOOL+QingKe+HuangYou&display=swap&text=0123456789');

  * {
    box-sizing: border-box;
  }

  html {
    background-color: ${color.background};
  }

  body {
    color: ${color.content.primary};

    font-family: ${text.body.font};
  }

  body,
  h1, 
  p {
    margin: 0;
  }
`

const Root = () => (
  <Router>
    <AppContainer>
      <GlobalStyle />
      <Normalize />

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
