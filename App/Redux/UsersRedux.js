import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { COUNTRY_PHONES } from '../Config/Constants'
import I18n from 'react-native-i18n'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  userRegisterByPhoneNumberRequest: ['displayName', 'phoneNo', 'password', 'country', 'token'],
  userRegisterByPhoneNumberSuccess: ['userRegProfile'],
  userRegisterByPhoneNumberFailure: ['error'],
  userConfirmPhoneRequest: ['id', 'token', 'phoneNo', 'confirmCode'],
  userConfirmPhoneSuccess: ['userProfile', 'token'],
  userConfirmPhoneFailure: ['error'],
  userGetAuthTokenRequest: ['phoneNo', 'password', 'isLogin'],
  userGetAuthTokenSuccess: ['token'],
  userGetAuthTokenFailure: ['error'],
  // userConfirmPhoneSuccess:
  // userConfirmPhoneFailure:
  userGetProfileRequest: ['uid', 'token', 'isLogin'],
  userGetProfileSuccess: ['userProfile', 'isLogin'],
  userGetProfileFailure: ['error'],
  userIsLoginRequest: ['key'],
  userIsLoginSuccess: ['user'],
  userIsLoginFailure: ['error'],
  userIsLogoutRequest: ['logOut'],
  userIsLogoutSuccess: ['logOut'],
  userIsLogoutFailure: ['error'],
  clearLastAction: ['key'],
  clearUserSuccess: null,
  clearUserErrors: null,
  userGetAvailableTariffsRequest: ['uid', 'token'],
  userGetAvailableTariffsSuccess: ['availableTariffs'],
  userGetAvailableTariffsFailure: ['error'],
  /*  userUpdateProfile
   userGetAvailableTariffs
   userSetTariff http://joxi.ru/RmzVj8aHWXv5jm
   userSetRating


   userRequest: ['username'],
   userSuccess: ['avatar'],
   userFailure: null*/
})
export const UsersTypes = Types
export default Creators
/* ------------- Initial State ------------- */

export const INITIAL_STATE2 = Immutable({
  'userRegData': {
    'displayName': 'Name',
    'phoneNo': '9010000001',
    'password': '123456',
    'country': 'Russia (+7)'
  },
  'userAvailableTariffs': [{
    'kind': 'bjj#tariff',
    'id': 1,
    'active': true,
    'name': 'TARIFF_FREE',
    'amount': 0,
    'options': {
      'review': 0,
      'currency': 'usd',
      'interval': 'month',
      'paid_tags': ['free'],
      'canonical_id': 'free',
      'interval_count': 1,
      'champions_review': 0,
      'trial_period_days': null,
      'statement_descriptor': ''
    },
    'created_at': '2017-10-25T14:40:53.284Z',
    'updated_at': '2017-10-25T14:40:53.284Z',
    'deleted_at': null
  }, {
    'kind': 'bjj#tariff',
    'id': 2,
    'active': true,
    'name': 'TARIFF_PAID_WITH_UNLIMITED_COLLABORATORS',
    'amount': 600,
    'options': {
      'review': 5,
      'currency': 'usd',
      'interval': 'month',
      'paid_tags': ['free', 'collaborators'],
      'canonical_id': 'collaborators_content',
      'interval_count': 1,
      'champions_review': 0,
      'trial_period_days': null,
      'statement_descriptor': ''
    },
    'created_at': '2017-10-25T14:40:53.284Z',
    'updated_at': '2017-10-25T14:40:53.284Z',
    'deleted_at': null
  }, {
    'kind': 'bjj#tariff',
    'id': 3,
    'active': true,
    'name': 'TARIFF_PAID_BLACK_BELT_5',
    'amount': 1000,
    'options': {
      'review': 5,
      'currency': 'usd',
      'interval': 'month',
      'paid_tags': ['free', 'collaborators', 'blackbelt'],
      'canonical_id': 'blackbelt_5',
      'interval_count': 1,
      'champions_review': 0,
      'trial_period_days': null,
      'statement_descriptor': ''
    },
    'created_at': '2017-10-25T14:40:53.284Z',
    'updated_at': '2017-10-25T14:40:53.284Z',
    'deleted_at': null
  }, {
    'kind': 'bjj#tariff',
    'id': 4,
    'active': true,
    'name': 'TARIFF_PAID_BLACK_BELT_10',
    'amount': 1800,
    'options': {
      'review': 10,
      'currency': 'usd',
      'interval': 'month',
      'paid_tags': ['free', 'collaborators', 'blackbelt'],
      'canonical_id': 'blackbelt_10',
      'interval_count': 1,
      'champions_review': 0,
      'trial_period_days': null,
      'statement_descriptor': ''
    },
    'created_at': '2017-10-25T14:40:53.284Z',
    'updated_at': '2017-10-25T14:40:53.284Z',
    'deleted_at': null
  }, {
    'kind': 'bjj#tariff',
    'id': 6,
    'active': true,
    'name': 'TARIFF_PAID_WITH_CHAMPIONS_20',
    'amount': 4600,
    'options': {
      'review': 0,
      'currency': 'usd',
      'interval': 'month',
      'paid_tags': ['free', 'collaborators', 'blackbelt', 'champions'],
      'canonical_id': 'champions_20',
      'interval_count': 1,
      'champions_review': 20,
      'trial_period_days': 0,
      'statement_descriptor': ''
    },
    'created_at': '2017-10-25T14:40:53.284Z',
    'updated_at': '2017-10-25T14:40:53.284Z',
    'deleted_at': null
  }, {
    'kind': 'bjj#tariff',
    'id': 5,
    'active': true,
    'name': 'TARIFF_PAID_WITH_CHAMPIONS_10',
    'amount': 2800,
    'options': {
      'review': 0,
      'currency': 'usd',
      'interval': 'month',
      'paid_tags': ['free', 'collaborators', 'blackbelt', 'champions'],
      'canonical_id': 'champions_10',
      'interval_count': 1,
      'champions_review': 10,
      'trial_period_days': null,
      'statement_descriptor': ''
    },
    'created_at': '2017-10-25T14:40:53.284Z',
    'updated_at': '2017-10-25T14:40:53.284Z',
    'deleted_at': null
  }],
  'fetching': false,
  'error': null,
  'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjE5LCJpYXQiOjE1MjI3NjA2OTAsImV4cCI6MTUyMjg0NzA5MH0.ku1SR2lnZ7EaazcwndICpET9yTp2k2ty2AG-S7o9c-U',
  'confirmCode': null,
  'userProfile': {
    'role': 'Student',
    'hasPassword': true,
    'kind': 'bjj#user',
    'id': 19,
    'display_name': 'Test Ueer 1',
    'description': null,
    'email': null,
    'login': null,
    'phone_no': '+79010000001',
    'photo': null,
    'options': {'limits': {'review': 0, 'champions_review': 0}, 'phoneNoConfirmed': true},
    'created_at': '2017-12-20T10:46:00.596Z',
    'updated_at': '2018-02-22T14:16:01.839Z',
    'deleted_at': null,
    'entity_type': 1,
    'tariff_id': 1,
    'qualification': null,
    'entity': {'kind': 'bjj#entity', 'id': 1, 'name': 'Student'},
    'tariff': {
      'kind': 'bjj#tariff',
      'id': 1,
      'active': true,
      'name': 'TARIFF_FREE',
      'amount': 0,
      'options': {
        'review': 0,
        'currency': 'usd',
        'interval': 'month',
        'paid_tags': ['free'],
        'canonical_id': 'free',
        'interval_count': 1,
        'champions_review': 0,
        'trial_period_days': null,
        'statement_descriptor': ''
      },
      'created_at': '2017-10-25T14:40:53.284Z',
      'updated_at': '2017-10-25T14:40:53.284Z',
      'deleted_at': null
    }
  },
  'success': null,
  'isLogin': true
})

export const INITIAL_STATE = Immutable({
  userRegData: {
    displayName: I18n.t('userName'),
    phoneNo: null,
    password: null,
    country: COUNTRY_PHONES[0]
  },
  userAvailableTariffs: null,
  fetching: null,
  error: null,
  token: null,
  confirmCode: null,
  userProfile: null,
  success: null
})

/* ------------- Reducers ------------- */

export const regRequest = (state, {displayName, phoneNo, password, country, token}) =>
  state.merge({
    fetching: true,
    userRegData: {
      displayName: displayName,
      phoneNo: phoneNo,
      password: password,
      country: country
    },
    token: token
  })
export const regSuccess = (state, action) => {
  const {type} = action
  return state.merge({fetching: false, error: null, token: null, isLogin: true})
}
export const regFailure = (state, {error}) => {
  return state.merge({fetching: false, error: error})
}

export const logOutRequest = (state, action) => {
  return state.merge({
    fetching: true,
  })
}
export const logOutSuccess = (state) => {
  return state.merge({...INITIAL_STATE})
}
export const logOutFailure = (state, {error}) => {
  return state.merge({fetching: false, error: error})
}

export const confirmPhoneRequest = (state, action) => {
  const {confirmCode} = action
  return state.merge({
    fetching: true,
    confirmCode: confirmCode
  })
}
export const confirmPhoneSuccess = (state, action) => {
  return state.merge({
    success: UsersTypes.USER_CONFIRM_PHONE_SUCCESS,
    fetching: false,
    error: null,
  })
}
export const confirmPhoneFailure = (state, {error}) => {
  return state.merge({fetching: false, error: error, confirmCode: null})
}

export const getTokenRequest = (state, {phoneNo, password}) => {
  console.log('getTokenRequest')
  return state.merge({
    fetching: true,
  })
}
export const getTokenSuccess = (state, action) => {
  const {token} = action
  return state.merge({
    fetching: false,
    error: null,
    token: token,
    isLogin: true,
  })
}
export const getTokenFailure = (state, {error}) => {
  return state.merge({fetching: false, error: error})
}

export const profileRequest = (state) => {
  return state.merge({fetching: true})
}
export const profileSuccess = (state, action) => {
  const {userProfile, isLogin} = action
  const phoneNoConfirmed = userProfile.options.phoneNoConfirmed
  return state.merge({
    fetching: false,
    error: null,
    userProfile: userProfile,
    isLogin: true,
    success: isLogin && phoneNoConfirmed ? UsersTypes.USER_IS_LOGIN_SUCCESS : isLogin && !phoneNoConfirmed ? 'PHONE_NUMBER_NO_CONFIRM' : UsersTypes.USER_REGISTER_BY_PHONE_NUMBER_SUCCESS
  })
}
export const profileFailure = (state, {error}) => {
  return state.merge({fetching: false, error: error, userProfile: null, isLogin: false})
}

export const reducerUserGetAvailableTariffsRequest = (state) => {
  return state.merge({fetching: true})
}
export const reducerUserGetAvailableTariffsSuccess = (state, action) => {
  const {availableTariffs} = action
  return state.merge({
    fetching: false,
    error: null,
    userAvailableTariffs: availableTariffs
  })
}
export const reducerUserGetAvailableTariffsFailure = (state, {error}) => {
  return state.merge({fetching: false, error: error, availableTariffs: null})
}

export const isLoginRequest = (state) => {
  return state.merge({fetching: true})
}
export const isLoginSuccess = (state, action) => {
  const {user} = action
  return state.merge({...user})
}
export const isLoginFailure = (state) => {
  return state.merge({fetching: false, error: true, isLogin: null})
}

export const reducerClearLastAction = (state) => {
  return state.merge({success: null})
}
export const reducerClearUserSuccess = (state) => {
  return state.merge({success: null})
}
export const reducerClearUserErrors = (state) => {
  return state.merge({error: null})
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE,
  {
    [Types.USER_REGISTER_BY_PHONE_NUMBER_REQUEST]: regRequest,
    [Types.USER_REGISTER_BY_PHONE_NUMBER_SUCCESS]: regSuccess,
    [Types.USER_REGISTER_BY_PHONE_NUMBER_FAILURE]: regFailure,

    [Types.USER_GET_AVAILABLE_TARIFFS_REQUEST]: reducerUserGetAvailableTariffsRequest,
    [Types.USER_GET_AVAILABLE_TARIFFS_SUCCESS]: reducerUserGetAvailableTariffsSuccess,
    [Types.USER_GET_AVAILABLE_TARIFFS_FAILURE]: reducerUserGetAvailableTariffsFailure,

    [Types.USER_GET_PROFILE_REQUEST]: profileRequest,
    [Types.USER_GET_PROFILE_SUCCESS]: profileSuccess,
    [Types.USER_GET_PROFILE_FAILURE]: profileFailure,

    [Types.USER_IS_LOGIN_REQUEST]: isLoginRequest,
    [Types.USER_IS_LOGIN_SUCCESS]: isLoginSuccess,
    [Types.USER_IS_LOGIN_FAILURE]: isLoginFailure,

    [Types.USER_IS_LOGOUT_REQUEST]: logOutRequest,
    [Types.USER_IS_LOGOUT_SUCCESS]: logOutSuccess,
    [Types.USER_IS_LOGOUT_FAILURE]: logOutFailure,

    [Types.USER_CONFIRM_PHONE_REQUEST]: confirmPhoneRequest,
    [Types.USER_CONFIRM_PHONE_SUCCESS]: confirmPhoneSuccess,
    [Types.USER_CONFIRM_PHONE_FAILURE]: confirmPhoneFailure,

    [Types.USER_GET_AUTH_TOKEN_REQUEST]: getTokenRequest,
    [Types.USER_GET_AUTH_TOKEN_SUCCESS]: getTokenSuccess,
    [Types.USER_GET_AUTH_TOKEN_FAILURE]: getTokenFailure,
    [Types.CLEAR_LAST_ACTION]: reducerClearLastAction,

    [Types.CLEAR_USER_SUCCESS]: reducerClearUserSuccess,
    [Types.CLEAR_USER_ERRORS]: reducerClearUserErrors,
  }
)
