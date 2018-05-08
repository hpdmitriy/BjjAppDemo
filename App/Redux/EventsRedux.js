import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { signIn } from '../Themes/Content'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  eventGetByIdRequest: ['id', 'token'],
  eventGetByIdSuccess: ['event'],
  eventGetByIdFailure: ['error'],
  eventListRequest: ['token', 'limit'],
  eventListSuccess: ['eventsList'],
  eventListFailure: ['error'],
  clearEventsSuccess: null,
  clearEventsErrors: null
})
export const EventsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  eventsList: null,
  fetching: false,
  error: null,
  success: null,
  currentEvent: null
})

/* ------------- Reducers ------------- */

export const reducerEventGetByIdRequest = (state) => {
  return state.merge({
    fetching: true,
  })
}
export const reducerEventGetByIdSuccess = (state, action) => {
  const {event} = action
  return state.merge({
    success: Types.EVENT_GET_BY_ID_SUCCESS,
    fetching: false,
    error: null,
    currentEvent: event
  })
}
export const reducerEventGetByIdFailure = (state, {error}) => {
  return state.merge({
    fetching: false,
    error: error
  })
}

export const reducerEventListRequest = (state) => {
  return state.merge({fetching: true})
}
export const reducerEventListSuccess = (state, action) => {
  const {eventsList} = action
  return state.merge({success: Types.EVENT_LIST_SUCCESS, fetching: false, errors: null, eventsList})
}
export const reducerEventListFailure = (state, {error}) => {
  return state.merge({fetching: false, errors: error})
}
export const reducerClearEventsSuccess = (state) => {
  return state.merge({success: null})
}
export const reducerClearEventsErrors = (state) => {
  return state.merge({error: null})
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE,
  {
    [Types.EVENT_GET_BY_ID_REQUEST]: reducerEventGetByIdRequest,
    [Types.EVENT_GET_BY_ID_SUCCESS]: reducerEventGetByIdSuccess,
    [Types.EVENT_GET_BY_ID_FAILURE]: reducerEventGetByIdFailure,

    [Types.EVENT_LIST_REQUEST]: reducerEventListRequest,
    [Types.EVENT_LIST_SUCCESS]: reducerEventListSuccess,
    [Types.EVENT_LIST_FAILURE]: reducerEventListFailure,

    [Types.CLEAR_EVENTS_SUCCESS]: reducerClearEventsSuccess,
    [Types.CLEAR_EVENTS_ERRORS]: reducerClearEventsErrors

  }
)
