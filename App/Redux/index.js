import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'
import { reducer as UsersReducer } from './UsersRedux'
import { reducer as MaterialsReducer } from './MaterialsRedux'
import { reducer as EventsReducer } from './EventsRedux'
import { reducer as TechniquesReducer } from './TechniquesRedux'
import { reducer as LessonsReducer } from './LessonsRedux'
import { reducer as TrainingsReducer } from './TrainingsRedux'
import { reducer as UpdateReducer } from './UpdateRedux'
import { reducer as WebSocketReducer } from './WebSocketRedux'
import { reducer as AttachmentsReducer } from './AttachmentsRedux'
import { reducer as HashesReducer } from './HashesRedux'
//import { reducer as NavigationReducer } from './NavigationRedux'
import { reducer as ErrorsReducer } from './ErrorsRedux'
import { reducer as SuccessReducer } from './SuccessRedux'

export const reducers = combineReducers({
  users: UsersReducer,
  materials: MaterialsReducer,
  events: EventsReducer,
  techniques: TechniquesReducer,
  update: UpdateReducer,
  sockets: WebSocketReducer,
  attachments: AttachmentsReducer,
  lessons: LessonsReducer,
  trainings: TrainingsReducer,
  nav: require('./NavigationRedux').reducer,
  errors: ErrorsReducer,
  success: SuccessReducer,
  hashes: HashesReducer
})
export default () => {
  let finalReducers = reducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }
  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)
  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }
  return store
}
