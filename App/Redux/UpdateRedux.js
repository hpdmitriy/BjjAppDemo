import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  checkingForUpdateRequest: ['checking'],
  checkingForUpdateSuccess: ['checking'],
  downloadingUpdateRequest: ['counter'],
  downloadingUpdateSuccess: ['counter'],
  installingUpdateRequest: ['progress'],
  installingUpdateSuccess: ['progress'],
});
export const UpdateTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  checking: null,
  status: null,
  downloading: null,
  installing: null,
  upToDate: null,
  update_ignored: null,
  update_installed: null,
  errors: null,
  success: null
});

/* ------------- Reducers ------------- */

export const reducerCheckingForUpdateRequest = (state, {checking}) => {
  return state.merge({
    checking: checking,
    status: {
      code: 'checking',
      message: 'start verified',
      details: null
    }
  });
};
export const reducerCheckingForUpdateSuccess = (state, {checking}) => {
  return state.merge({
    checking: checking,
    status: {
      code: 'checking',
      message: 'end verified',
      details: null
    }
  });
};

export const reducerDownloadingUpdateRequest = (state, {counter}) => {
  return state.merge({
    downloading: true,
    status: {
      code: 'Downloading update',
      message: counter,
      details: null
    }
  });
};
export const reducerDownloadingUpdateSuccess = (state, {counter}) => {
  return state.merge({
    downloading: true,
    status: {
      code: 'Downloading update',
      message: counter,
      details: null
    }
  });
};

export const reducerInstallingUpdateRequest = (state, {progress}) => {
  return state.merge({
    downloading: false,
    installing: true,
    status: {
      code: 'Installing update',
      message: 'waiting',
      details: null
    }
  });
};
export const reducerInstallingUpdateSuccess = (state, {progress}) => {
  if (progress === 'start') {
    return state.merge({
      downloading: false,
      installing: true,
      status: {
        code: 'Installing update',
        message: 'waiting',
        details: null
      }
    });
  } else {
    return state.merge({
      installing: false,
      downloading: false,
      status: {
        code: 'Update installed',
        message: 'reload app...',
        details: null
      },
      success: 'INSTALLING_UPDATE_SUCCESS'
    });
  }
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE,
  {
    [Types.CHECKING_FOR_UPDATE_REQUEST]: reducerCheckingForUpdateRequest,
    [Types.CHECKING_FOR_UPDATE_SUCCESS]: reducerCheckingForUpdateSuccess,
    [Types.DOWNLOADING_UPDATE_REQUEST]: reducerDownloadingUpdateRequest,
    [Types.DOWNLOADING_UPDATE_SUCCESS]: reducerDownloadingUpdateSuccess,
    [Types.INSTALLING_UPDATE_REQUEST]: reducerInstallingUpdateRequest,
    [Types.INSTALLING_UPDATE_SUCCESS]: reducerInstallingUpdateSuccess,
  }
);
