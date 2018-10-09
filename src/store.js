import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import { sessionReducer, sessionService } from 'redux-react-session'

const hookMiddleware = mm => store => next => action => {
  mm.trigger('beforedispatch', action, store.getState())
  const result = next(action)
  mm.trigger('afterdispatch', action, store.getState())
  return result
}

export default (mm, options, history) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const reducers = connectRouter(history)(
    combineReducers({
      session: sessionReducer,
      ...mm.get('reducers')
    })
  )

  const sagaMiddleware = createSagaMiddleware()
  const createRootSaga = () => function* rootSaga () {
    yield all(mm.get('sagas').map(s => s()))
  }

  const store = createStore(
    reducers,
    composeEnhancers(
      applyMiddleware(
        hookMiddleware(mm),
        sagaMiddleware,
        routerMiddleware(history),
        ...mm.get('middlewares')
      )
    )
  )

  sagaMiddleware.run(createRootSaga())

  sessionService.initSessionService(store, options.sessionService)

  return store
}
