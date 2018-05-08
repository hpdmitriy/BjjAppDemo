import { call, put, fork, join, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { isNil } from 'ramda'
import TrainingsActions, { TrainingsTypes } from '../Redux/TrainingsRedux'

export const getUserProfile = (state) =>
  state.users.userProfile

export function * difficultyList (api) {
  const response = yield call(api.difficultyList, {})
  if (response.ok) {
    if (isNil(response.data.error)) {
      yield put(TrainingsActions.difficultyListSuccess(response.data))
      console.log('success: ', response.data)
    } else {
      yield put(TrainingsActions.difficultyListFailure(response.data.error))
      console.log('error: ', response.data.error)
    }
  } else {
    yield put(TrainingsActions.difficultyListFailure('Unknown Error'))
    console.log('error: ', 'Unknown Error')
  }
}

export function * trainingsList (api, action) {
  console.log('SAGA: trainingsList')
  const {
    studentUserId,
    teacherUserId,
    token
  } = action
  const response = yield call(
    api.trainingList,
    studentUserId,
    teacherUserId,
    token
  )
  if (response.ok) {
    if (isNil(response.data.error)) {
      const gdl = yield fork(difficultyList, api, {token: token})
      yield join(gdl)
      yield call(delay, 50)
      yield put(TrainingsActions.trainingListSuccess(response.data))
    } else {
      yield put(TrainingsActions.trainingListFailure(response.data.error))
    }
  } else {
    yield put(TrainingsActions.trainingListFailure('Unknown Error'))
    console.log('error: ', 'Unknown Error')
  }
}
export function * trainingClose (api, action) {
  const {
    trainingId, ignoreMark, token
  } = action
  const userProfile = yield select(getUserProfile)
  const response = yield call(api.trainingClose, trainingId, ignoreMark, token)
  if (response.ok) {
    if (isNil(response.data.error)) {
      const refreshTrainingById = yield fork(trainingGetById, api, {
        trainingId: trainingId,
        token: token
      })
      const refreshTrainingsList = yield fork(trainingsList, api, {
        studentUserId: userProfile.role !== 'Teacher' ? userProfile.id : null,
        teacherUserId: userProfile.role === 'Teacher' ? userProfile.id : null,
        token: token
      })
      yield join(refreshTrainingById)
      yield join(refreshTrainingsList)
      yield call(delay, 50)
      yield put(TrainingsActions.trainingCloseSuccess(response.data))
    } else {
      yield put(TrainingsActions.trainingCloseFailure(response.data.error))
    }
  } else {
    yield put(TrainingsActions.trainingCloseFailure('Unknown Error'))
    console.log('error: ', 'Unknown Error')
  }
}

export function * trainingGetById (api, action) {
  const {trainingId, token} = action
  const response = yield call(
    api.trainingGetById,
    trainingId,
    token
  )
  if (response.ok) {
    if (isNil(response.data.error)) {
      yield put(TrainingsActions.trainingGetByIdSuccess(response.data))
    } else {
      yield put(TrainingsActions.trainingGetByIdFailure(response.data.error))
      console.log('error: ', response.data.error)
    }
  } else {
    console.log('error: ', 'Unknown Error')
  }
}

export function * trainingSendMessage (api, action) {
  const {trainingId, text, token} = action
  const response = yield call(api.trainingSendMessage, trainingId, text, token)
  if (response.ok) {
    if (isNil(response.data.error)) {
      yield put(TrainingsActions.trainingSendMessageSuccess(response.data))
      console.log('Success trainingSendMessage')
    } else {
      yield put(TrainingsActions.trainingSendMessageFailure(response.data.error))
      console.log('error: ', response.data.error)
    }
  } else {
    yield put(TrainingsActions.trainingSendMessageFailure('Unknown Error'))
    console.log('error: ', 'Unknown Error')
  }
}
export function * trainingScoreVideo (api, action) {
  const {trainingId, replyMessageId, text, mark, token} = action
  const response = yield call(api.trainingScoreVideo, trainingId, replyMessageId, text, mark, token)
  if (response.ok) {
    if (isNil(response.data.error)) {
      yield put(TrainingsActions.trainingScoreVideoSuccess(response.data))
    } else {
      yield put(TrainingsActions.trainingScoreVideoFailure(response.data.error))
      console.log('error: ', response.data.error)
    }
  } else {
    yield put(TrainingsActions.trainingScoreVideoFailure('Unknown Error'))
    console.log('error: ', 'Unknown Error')
  }
}
export function * trainingSubmittingVideoForEvaluation (api, action) {
  const {trainingId, attachmentId, token, text} = action
  const response = yield call(api, trainingId, attachmentId, token, text)
  if (response.ok) {
    if (isNil(response.data.error)) {
      yield put(TrainingsActions.trainingSubmittingVideoForEvaluationSuccess(response.data))
    } else {
      yield put(TrainingsActions.trainingSubmittingVideoForEvaluationFailure(response.data.error))
      console.log('error: ', response.data.error)
    }
  } else {
    yield put(TrainingsActions.trainingSubmittingVideoForEvaluationFailure('Unknown Error'))
    console.log('error: ', 'Unknown Error')
  }
}
