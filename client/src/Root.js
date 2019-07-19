import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Normalize } from 'styled-normalize'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader/root'

import Notifications from './shared/components/Notifications'
import Landing from './pages/Landing'
import Party from './pages/Party'
import NotFound from './pages/NotFound'
import { dimension, color, text } from './shared/theme'

const AppContainer = styled.div`
  margin: 0 auto;
  padding: calc(${dimension.spacing.separate} * 2) ${dimension.spacing.separate};

  display: flex;
  flex-direction: column;

  max-width: ${dimension.appWidth};
  width: 100%;
  min-height: 100vh;
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
    font-size: ${text.body.primary.size};
    font-weight: ${text.body.primary.weight};
  }

  body,
  h1, 
  h2,
  p {
    margin: 0;
  }

  form > *, main > *, nav > * {
    margin-bottom: ${dimension.spacing.related};
  }

  form > *:last-child, main > *:last-child, nav > *:last-child {
    margin-bottom: 0;
  }
`

const Root = () => (
  <>
    <Notifications />
    <Router>
      <AppContainer>
        <Normalize />
        <GlobalStyle />

        <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/party/:partyCode' render={Party} />
          <Route exact path='/create' render={() => <h1>Create Party</h1>} />
          <Route exact path='/help' render={() => <h1>How to Use</h1>} />
          <Route exact path='/pro' render={() => <h1>Get Pro</h1>} />
          <Route exact path='/terms' render={() => <h1>Terms of Use</h1>} />
          <Route exact path='/privacy' render={() => <h1>Privacy Policy</h1>} />
          <Route component={NotFound} />
        </Switch>
      </AppContainer>
    </Router>
  </>
)

export default hot(Root)
