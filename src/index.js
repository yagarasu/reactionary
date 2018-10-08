import React from 'react'
import { createBrowserHistory } from 'history'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import ModuleManager from './ModuleManager'
import DefaultNoMatch from './components/DefaultNoMatch'
import createStore from './store'

export default modules => {
  // Build the thing...
  const mm = new ModuleManager(modules)
  // Default 404
  mm.registerNotFound(DefaultNoMatch)
  // Register the other things...
  mm.register()

  // Routing
  const { routeNotFound } = mm
  const routes = mm.getFrom('routes')
  const history = createBrowserHistory()

  // Reducers
  const store = createStore(mm, history)

  const Kernel = props => (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          {routes.map(route => (
            <Route key={route.path} {...route} />
          ))}
          <Route {...routeNotFound} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  )
  return Kernel
}