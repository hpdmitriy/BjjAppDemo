import { delay } from 'redux-saga'
import { call, put, fork, join } from 'redux-saga/effects'
import { isNil, compact, has } from 'lodash'
import LessonsActions, { LessonsTypes } from '../Redux/LessonsRedux'

export function * lessonsGetList (api, action) {
  const {activeCategory, token, limit, status, accessTags, include} = action
  const response = yield call(api.lessonsGetList, ...compact([token, limit, status, accessTags, include]))
  if (response.ok) {
    if (isNil(response.data.error)) {
      yield put(LessonsActions.lessonGetListSuccess(response.data))
      console.log('success: ', response.data)
    } else {
      yield put(LessonsActions.lessonGetListFailure(response.data.error))
      console.log('error: ', response.data.error)
    }
  } else {
    yield put(LessonsActions.lessonGetListFailure('Unknown Error'))
    console.log('error: ', 'Unknown Error')
  }
}
export function * lessonGetById (api, action) {
  const {id, token, include} = action
  const response = yield call(api.lessonGetById, id, token, include)
  if (response.ok) {
    if (isNil(response.data.error)) {
      yield put(LessonsActions.lessonGetByIdSuccess(response.data))
      console.log('success: ', response.data)
    } else {
      yield put(LessonsActions.lessonGetByIdFailure(response.data.error))
      console.log('error: ', response.data.error)
    }
  } else {
    yield put(LessonsActions.lessonGetByIdFailure('Unknown Error'))
    console.log('error: ', 'Unknown Error')
  }
}
export function * lessonSetFavoriteFlag (api, action) {
  const {lessonId, flag, token} = action
  const response = yield call(
    api.lessonSetFavoriteFlag,
    lessonId,
    flag,
    token
  )
  if (response.ok) {
    if (!has(response.data, 'error') || isNil(response.data.error)) {
      const gll = yield fork(lessonsGetList, api, {token: token})
      yield join(gll)
      yield call(delay, 50)
      yield put(LessonsActions.lessonSetFavoriteFlagSuccess(response.data))
    } else {
      yield put(LessonsActions.lessonSetFavoriteFlagFailure(response.data.error))
    }
  } else {
    yield put(LessonsActions.lessonSetFavoriteFlagFailure('Unknown Error'))
    console.log('error: ', 'Unknown Error')
  }
}
export function * lessonSetRating (api, action) {
  const {lessonId, score, comment, token} = action
  const response = yield call(
    api.lessonSetRating,
    lessonId,
    score,
    comment,
    token
  )
  if (response.ok) {
    if (!has(response.data, 'error') || isNil(response.data.error)) {
      const gll = yield fork(lessonsGetList, api, {token: token})
      yield join(gll)
      yield call(delay, 50)
      yield put(LessonsActions.lessonSetRatingSuccess(response.data))
    } else {
      yield put(LessonsActions.lessonSetRatingFailure(response.data.error))
    }
  } else {
    yield put(LessonsActions.lessonSetRatingFailure('Unknown Error'))
    console.log('error: ', 'Unknown Error')
  }
}

export function * lessonCreateTraining (api, action) {
  const {lessonId, token} = action
  const response = yield call(
    api.lessonCreateTraining,
    lessonId,
    token
  )
  if (response.ok) {
    if (!has(response.data, 'error') || isNil(response.data.error)) {
      const gll = yield fork(lessonsGetList, api, {token: token})
      yield join(gll)
      yield call(delay, 50)
      yield put(LessonsActions.lessonCreateTrainingSuccess(response.data))
    } else {
      yield put(LessonsActions.lessonCreateTrainingFailure(response.data.error))
    }
  } else {
    yield put(LessonsActions.lessonCreateTrainingFailure('Unknown Error'))
    console.log('error: ', 'Unknown Error')
  }
}
