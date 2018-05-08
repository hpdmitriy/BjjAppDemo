import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  writeSuccess: ['screen', 'success'],
  cleanSuccess: ['screen', 'success']
});
export const SuccessTypes = Types;
export default Creators;
/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  screenSuccess: {}
});

/* ------------- Reducers ------------- */

export const reducerWriteSuccess = (state, action) => {
  const {screen, success} = action;
  return state.merge({
    screenSuccess: {
      [screen]: success
    }
  });
};
export const reducerCleanSuccess = (state, {screen}) => {
  return state.merge({
    screenSuccess: {}
  });
};
/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE,
  {
    [Types.WRITE_SUCCESS]: reducerWriteSuccess,
    [Types.CLEAN_SUCCESS]: reducerCleanSuccess,
  }
);
