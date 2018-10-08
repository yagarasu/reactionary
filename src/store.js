import {
  createStore,
  combineReducers,
  applyMiddleware,
  compose
} from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

export default (mm, history) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  const reducers = connectRouter(history)(
    combineReducers({ ...mm.reducers })
  )

  const sagaMiddleware = createSagaMiddleware()
  const createRootSaga = () => function* rootSaga () {
    yield all(mm.getFrom('sagas').map(s => s()))
  }

  const store = createStore(
    reducers,
    composeEnhancers(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history),
        ...mm.getFrom('middlewares')
      )
    )
  )

  sagaMiddleware.run(createRootSaga())

  return store
}