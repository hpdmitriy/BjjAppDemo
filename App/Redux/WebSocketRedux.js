import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  connectWebSocketRequest: ['status', 'channel', 'token'],
  connectWebSocketSuccess: ['status'],
  disconnectWebSocket: null,
  emitWebSocketRequest: ['event'],
  emitWebSocketSuccess: ['event'],
})
export const WebSocketTypes = Types
export default Creators
/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  webSocketConnection: null,
  webSocketEvent: {
    ev: null,
    d: null
  },
})

/* ------------- Reducers ------------- */

export const reducerConnectWebSocketRequest = (state) => {
  return state.merge({
    webSocketConnection: {
      connection: 'try'
    },
  })
}
export const reducerConnectWebSocketSuccess = (state, action) => {
  const {status, channel, token} = action.status
  return state.merge({
    webSocketConnection: {
      connection: status,
      userChannelName: channel,
      signedAuthToken: token
    },
  })
}
export const reducerDisconnectWebSocket = (state) => {
  return state.merge({
    ...INITIAL_STATE
  })
}
export const reducerEmitWebSocketRequest = (state, {event}) => {
  return state.merge({
    webSocketEvent: event,
  })
}
export const reducerEmitWebSocketSuccess = (state, {event}) => {
  return state.merge({
    webSocketEvent: event,
  })
}
/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE,
  {
    [Types.CONNECT_WEB_SOCKET_REQUEST]: reducerConnectWebSocketRequest,
    [Types.CONNECT_WEB_SOCKET_SUCCESS]: reducerConnectWebSocketSuccess,
    [Types.DISCONNECT_WEB_SOCKET]: reducerDisconnectWebSocket,
    [Types.EMIT_WEB_SOCKET_REQUEST]: reducerEmitWebSocketRequest,
    [Types.EMIT_WEB_SOCKET_SUCCESS]: reducerEmitWebSocketSuccess,
  }
)
