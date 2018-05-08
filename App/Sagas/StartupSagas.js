import { put, select } from 'redux-saga/effects'
import UsersActions from '../Redux/UsersRedux'

export const userCheckIsAutorised = (state) => {
  return state.users.isLogin
}

export function* startup (action) {
  console.log('process STARTUP actions')
  const isLogin = yield select(userCheckIsAutorised)
  //yield put(UsersActions.userIsLoginRequest('reduxPersist:users'))
  console.log('isLogin', isLogin)
}
