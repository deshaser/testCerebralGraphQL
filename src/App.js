import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Container as CerebralContainer } from '@cerebral/react'

import appController from './controller'
import Layout from './components/Layout/Layout'
import PageNotFound from './components/PageNotFound/PageNotFound'

const controller = appController()

class App extends Component {
  render() {
    return (
      <CerebralContainer app={controller}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Layout} />
            <Route component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      </CerebralContainer>
    )
  }
}

export default App
