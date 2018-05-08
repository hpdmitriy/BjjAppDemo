
import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  writeError: ['screen', 'error'],
  cleanError: ['screen', 'error'],
});
export const ErrorsTypes = Types;
export default Creators;
/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  screenErrors: {}
});

/* ------------- Reducers ------------- */

export const reducerWriteError = (state, action) => {
  const {screen, error} = action;
  return state.merge({
    screenErrors: {
      [screen]: {...error}
    },
  });
};
export const reducerCleanError = (state) => {
  return state.merge({
    screenErrors: {},
  });
};
/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE,
  {
    [Types.WRITE_ERROR]: reducerWriteError,
    [Types.CLEAN_ERROR]: reducerCleanError,
  }
);
