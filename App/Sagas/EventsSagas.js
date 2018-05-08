import { call, put, select } from 'redux-saga/effects'
import { isNil } from 'lodash'
import EventsActions from '../Redux/EventsRedux'
import {filterDataByTarif} from '../Services/ApiHelpers';

export const getUser = (state) =>
  state.users

export function * getEventList (api, action) {
  console.log('SAGA: getEventsList')
  const {token, limit} = action
  const response = yield call(api.getEventList, token, limit)
  if (response.ok) {
    if (isNil(response.data.error)) {
/*      const user = yield select(getUser)
      const filteredDataByUserTariff = filterDataByTarif(
        user.userProfile.tariff.options.paid_tags,
        response.data.rows || [],
        user.userProfile.role
      )
      response.data.rows = filteredDataByUserTariff
      */
      yield put(EventsActions.eventListSuccess(response.data))
    } else {
      yield put(EventsActions.eventListFailure(response.data.error))
    }
  } else {
    yield put(EventsActions.eventListFailure('Unknown Error'))
    console.log('error: ', 'Unknown Error')
  }
}
export function * eventGetById (api, action) {
  const {id, token} = action
  const response = yield call(api.eventGetById, id, token)
  if (response.ok) {
    if (isNil(response.data.error)) {
      yield put(EventsActions.eventGetByIdSuccess(response.data))
    } else {
      yield put(EventsActions.eventGetByIdFailure(response.data.error))
    }
  } else {
    yield put(EventsActions.eventGetByIdFailure('Unknown Error'))
    console.log('error: ', 'Unknown Error')
  }
}
