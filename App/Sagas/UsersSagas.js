import { call, put, fork, join, select } from 'redux-saga/effects'
import { path, isEmpty, isNil } from 'ramda'
import { isUndefined } from 'lodash'
import UsersActions from '../Redux/UsersRedux'
import { decodeToken, returnResError } from '../Services/ApiHelpers'

const usersInState = (state) => {
  return state.users
}

export function* userRegisterByPhoneNumber (api, action) {
  console.log('userRegisterByPhoneNumber')
  const {phoneNo, password, displayName, country} = action

  const registerRequest = yield call(
    api.userRegisterByPhoneNumber,
    displayName,
    phoneNo,
    password,
    country)
  if (registerRequest.ok) {
    const {error} = registerRequest.data
    if (isNil(error)) {
      yield fork(userGetAuthToken, api, {
        phoneNo: country.split(' ')[1].slice(1, -1) + phoneNo,
        password: password,
        isLogin: false
      })
    } else if (!isNil(error) && error.code === 'PHONE_NUMBER_ALREADY_EXISTS') {
      yield fork(userGetAuthToken, api, {
        phoneNo: country.split(' ')[1].slice(1, -1) + phoneNo,
        password: password,
        isLogin: true
      })
    } else {
      yield put(UsersActions.userRegisterByPhoneNumberFailure(
        registerRequest.data.error ? registerRequest.data.error : 'Unknown Error'
      ))
    }
  } else {
    yield put(UsersActions.userRegisterByPhoneNumberFailure(
      returnResError(registerRequest)
    ))
  }
}

export function* userConfirmPhone (api, action) {
  console.log('userConfirmPhone')
  const {id, token, phoneNo, confirmCode} = action
  const response = yield call(
    api.userConfirmPhone,
    phoneNo,
    confirmCode,
    token
  )
  if (response.ok) {
    if (isNil(response.data.error)) {
      yield fork(userGetProfile, api, {
        uid: id,
        token: token,
        isLogin: true
      })
      //yield put(UsersActions.userConfirmPhoneSuccess(response.data))
    } else {
      yield put(UsersActions.userConfirmPhoneFailure(response.data.error))
      console.log('error: ', response.data.error)
    }
  } else {
    yield put(UsersActions.userConfirmPhoneFailure('Unknown Error'))
  }
}

export function* userGetAuthToken (api, action) {
  console.log('userGetAuthToken')
  const {phoneNo, password, isLogin} = action
  const response = yield call(
    api.userGetAuthToken,
    phoneNo,
    password)
  if (response.ok) {
    if (isNil(response.data.error)) {
      yield put(UsersActions.userGetAuthTokenSuccess(response.data.token))
      const userTariffs = yield fork(userGetAvailableTariffs, api, {
        uid: decodeToken('uid', response.data.token),
        token: response.data.token
      })
      const userProfile = yield fork(userGetProfile, api, {
        uid: decodeToken('uid', response.data.token),
        token: response.data.token,
        isLogin: isLogin
      })
      yield join(userTariffs)
      yield join(userProfile)
    } else {
      yield put(UsersActions.userGetAuthTokenFailure(response.data.error))
      console.log('error: ', response.data.error)
    }
  } else {
    yield put(UsersActions.userConfirmPhoneFailure('Unknown Error'))
    console.log('error: ', 'Unknown Error')
  }
}

export function* userGetProfile (api, action) {
  const {uid, token, isLogin} = action
  const response = yield call(api.userGetProfile, uid, token)
  if (response.ok) {
    if (isNil(response.data.error)) {
      yield put(UsersActions.userGetProfileSuccess(
        response.data, isLogin
      ))
      console.log('success: ', response.data)
    } else {
      yield put(UsersActions.userGetProfileFailure(response.data.error))
      console.log('error: ', response.data.error)
    }
  } else {
    yield put(UsersActions.userGetProfileFailure('Unknown Error'))
    console.log('error: ', 'Unknown Error')
  }
}

export function* userGetAvailableTariffs (api, action) {
  const {uid, token} = action
  const response = yield call(api.userGetAvailableTariffs, uid, token)
  if (response.ok) {
    if (isNil(response.data.error)) {
      yield put(UsersActions.userGetAvailableTariffsSuccess(response.data))
    } else {
      yield put(UsersActions.userGetAvailableTariffsFailure(response.data.error))
      console.log('error: ', response.data.error)
    }
  } else {
    yield put(UsersActions.userGetAvailableTariffsFailure('Unknown Error'))
    console.log('error: ', 'Unknown Error')
  }
}

export function* userCheckIsAutorised (api, action) {
  const _usersInState = yield select(usersInState)
  const {key} = action
  const response = yield call(api.storageGetItem, key)
  if (response) {
    console.log(JSON.parse(response))
    yield put(UsersActions.userIsLoginSuccess(JSON.parse(response)))
  } else {
    yield put(UsersActions.userIsLoginFailure(false))
    console.log('no users')
  }
}

export function* userLogOut (api, action) {
  const {logOut} = action
  if (logOut) {
    //const response = yield call(api.storageSetItem, 'reduxPersist:users')
    yield put(UsersActions.userIsLogoutSuccess(logOut))
    const _usersInState = yield select(usersInState)
  }
}
