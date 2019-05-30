import React from 'react'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Home = () => <p>Home</p>

const Root = () => (
  <Router>
    <div>
      <nav>
        <h1>cntct</h1>
      </nav>
      <Route exact path='/' component={Home} />
    </div>
  </Router>
)

export default hot(Root)
