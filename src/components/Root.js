import React from 'react'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import AppContainer from './AppContainer'
import GlobalStyle from './GlobalStyle'
import Landing from './Landing'

const Root = () => (
  <Router>
    <AppContainer>
      <GlobalStyle />
      <Switch>
        <Route exact path='/' component={Landing} />
      </Switch>
    </AppContainer>
  </Router>
)

export default hot(Root)
