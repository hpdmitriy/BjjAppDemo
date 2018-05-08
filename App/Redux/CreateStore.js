import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import Config from '../Config/DebugConfig'
import RehydrationServices from '../Services/RehydrationServices'
import ReduxPersist from '../Config/ReduxPersist'
import ScreenTracking from './ScreenTrackingMiddleware'

// creates the store
export default (rootReducer, rootSaga) => {
  console.log('CreateStore')
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Analytics Middleware ------------- */
  middleware.push(ScreenTracking)
  /* ------------- Saga Middleware ------------- */

  const sagaMonitor = Config.useReactotron ? console.tron.createSagaMonitor() : null
  const sagaMiddleware = createSagaMiddleware({sagaMonitor})
  middleware.push(sagaMiddleware)
  if (Config.useReduxLogger) {
    middleware.push(logger)
  }
  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))

   // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = Config.useReactotron ? console.tron.createStore : createStore
  const store = createAppropriateStore(rootReducer, compose(...enhancers))

  // configure persistStore and check reducer version number
  if (ReduxPersist.active) {
    RehydrationServices.updateReducers(store)
  }
  let sagasManager = sagaMiddleware.run(rootSaga)

  return {
    store,
    sagasManager,
    sagaMiddleware
  }
}
