import { hot } from 'react-hot-loader/root' // Must be required first to work
import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Normalize } from 'styled-normalize'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import CreateParty from './pages/CreateParty'
import Landing from './pages/Landing'
import MemberForm from './shared/components/MemberForm'
import MemberList from './shared/components/MemberList'
import Error from './pages/Error'

import Container from './shared/components/Container'
import Notifications from './shared/components/Notifications'
import PartyRoute from './shared/components/PartyRoute'
import { Title } from './shared/components/Label'

import { dimension, color } from './shared/theme'

const AppContainer = styled(Container)`
  max-width: ${dimension.appWidth};
  min-height: 100%;

  margin: 0 auto;
  padding: calc(${dimension.spacing.separate} * 2) ${dimension.spacing.separate};
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
    margin: 0;
  }
  
  html,
  body,
  #root {
    height: 100%;
  }
`

const Root = () => (
  <>
    <Notifications />

    <Router>
      <AppContainer margin={dimension.spacing.separate}>
        <Normalize />
        <GlobalStyle />

        {/* Matches in order (last route is always 404) */}
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/create' component={CreateParty} />
          <Route exact path='/help' render={() => <Title>How to Use</Title>} />
          <Route exact path='/privacy' render={() => <Title>Privacy Policy</Title>} />
          <Route exact path='/pro' render={() => <Title>Get Pro</Title>} />
          <Route exact path='/terms' render={() => <Title>Terms of Use</Title>} />

          {/* Wraps component in <Party> */}
          <PartyRoute exact path='/party/:partyCode' component={MemberForm} />
          <PartyRoute exact path='/party/:partyCode/members' component={MemberList} />

          <Route render={() => <Error message='This page does not exist' thonk />} />
        </Switch>
      </AppContainer>
    </Router>
  </>
)

export default hot(Root)
