import { call, put, select, fork, join, all } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { isNil, has, toUpper } from 'lodash'
import RNFetchBlob from 'react-native-fetch-blob'
import { YOUTUBE_URL } from '../Config/Constants'
import AttachmentsActions, { AttachmentsTypes } from '../Redux/AttachmentsRedux'
import HashesActions  from '../Redux/HashesRedux'
import { uploadToServer } from '../Services/Attachments/Api'
import { trainingSubmittingVideoForEvaluation } from '../Sagas/TrainingsSagas'
import { emitWebSocketForce } from '../Sagas/WebSocketSagas'
import { trainingsApi } from '../Sagas'

const attachmentUploadData = (state) => {
  return [state.attachments.attachmentUrl, state.attachments.attachmentObject]
}
const attachmentCreatedData = (state) => {
  return state.attachments.createdAttachment
}
const activeTrainingData = (state) => {
  return state.trainings.activeTraining
}
const getOldHashes = (state) => {
  return state.hashes.usedHashes
}
const getUserToken = (state) => {
  return state.users.token
}

export function* attachmentGetUploadUrl (api, action) {
  const {mimeType, token} = action
  const response = yield call(api.attachmentGetUploadUrl, mimeType, token)
  if (response.ok) {
    if (isNil(response.data.error)) {
      yield put(AttachmentsActions.attachmentGetUploadUrlSuccess(response.data))
    } else {
      yield put(AttachmentsActions.attachmentGetUploadUrlFailure(response.data.error))
      console.log('error: ', response.data.error)
    }
  } else {
    yield put(AttachmentsActions.attachmentGetUploadUrlFailure('Unknown Error'))
    console.log('error: ', 'Unknown Error')
  }
}
export function* attachmentCreate (api, action) {
  const {mimeType, url, token} = action
  const response = yield call(api.attachmentCreate, mimeType, url, token)
  if (response.ok) {
    if (isNil(response.data.error)) {
      yield put(AttachmentsActions.attachmentCreateSuccess(response.data, false))
      console.log(response.data)
    } else {
      yield put(AttachmentsActions.attachmentCreateFailure(response.data.error))
      console.log('error: ', response.data.error)
    }
  } else {
    yield put(AttachmentsActions.attachmentCreateFailure('Unknown Error'))
    console.log('error: ', 'Unknown Error')
  }
}

export function* attachmentUploadToServer (api, action) {
  const {options, data, cb} = action
  const stats = yield RNFetchBlob.fs.stat(data.path)
  //const fileToBase64 = yield RNFetchBlob.fs.readFile(data.path, 'base64')

  if (stats.size / 1e6 > 50) {
    yield put(AttachmentsActions.attachmentUploadToServerFailure({
      code: 'FILE_IS_LARGE'
    }))
    return
  }
  const hash = yield RNFetchBlob.fs.hash(data.path, 'sha1')
  if (hash.length) {
    const oldHashes = yield select(getOldHashes)
    const oldHashesSet = new Set([...oldHashes])
    if (oldHashesSet.has(hash)) {
      return yield put(AttachmentsActions.attachmentUploadToServerFailure({
        code: 'REPEATED_UPLOAD'
      }))
    } else {
      const response = yield call(api[0], options, data, cb)
      const {name, message} = response
      if (name === 'Error') {
        yield put(AttachmentsActions.attachmentUploadToServerFailure({
          title: 'UPLOAD_ERROR',
          code: message ? toUpper(message.replace(/\s/g, '_')) : 'UPLOAD_ERROR'
        }))
      } else {
        const attachment = JSON.parse(response.data)
        if (!isNil(attachment.size) && attachment.size > 0) {
          const userToken = yield select(getUserToken)
          yield put(AttachmentsActions.attachmentUploadToServerSuccess(attachment, true))
          const uploadToYoutubeResult = yield fork(attachmentUploadToYoutube, api[1], {
            mediaHash: attachment.hash,
            title: options.title,
            description: options.comment,
            token: userToken
          })
          yield join(uploadToYoutubeResult)
          yield put(HashesActions.setHashes(oldHashesSet.add(hash)))
        } else {
          yield put(AttachmentsActions.attachmentUploadToServerFailure(
            {
              title: 'UPLOAD ERROR',
              message: 'Try again'
            }
          ))
        }
      }
    }
  } else {
    yield put(AttachmentsActions.attachmentUploadToServerFailure(
      {
        title: 'UPLOAD ERROR',
        message: 'Try again'
      }
    ))
  }
}

export function* attachmentUploadToYoutube (api, action) {
  const {
    mediaHash,
    title,
    description,
    token
  } = action
  const response = yield call(
    api,
    mediaHash,
    title,
    description,
    token)
  if (response.ok) {
    if (isNil(response.data.error)) {
      console.log(response.data)
      yield put(AttachmentsActions.attachmentUploadToYoutubeSuccess(response.data, true))
    } else {
      yield put(AttachmentsActions.attachmentUploadToYoutubeFailure(response.data.error))
      console.log('error: ', response.data.error)
    }
  } else {
    yield put(AttachmentsActions.attachmentUploadToYoutubeFailure('Unknown Error'))
    console.log('error: ', 'Unknown Error')
  }
}
export function * attachmentCheckDoneUploadToYoutube (api, action) {
  const response = yield call(api.attachmentCheckDoneUploadToYoutube, action.id)
  if (response.ok) {
    const createAttachData = yield all([select(attachmentUploadData), select(getUserToken)])
    const createAttach = yield fork(attachmentCreate, api, {
      mimeType: createAttachData[0][1],
      url: `${YOUTUBE_URL}${action.id}`,
      token: createAttachData[1]
    })
    yield join(createAttach)
    yield fork(emitWebSocketForce, {event: 'CREATE_ATTACH'})
    const getCreatedAttachData = yield all([select(attachmentCreatedData), select(activeTrainingData)])
    const submittingForEvaluation = yield fork(
      trainingSubmittingVideoForEvaluation,
      trainingsApi.trainingSubmittingVideoForEvaluation,
      {
        trainingId: getCreatedAttachData[1].id,
        attachmentId: getCreatedAttachData[0].id,
        token: createAttachData[1],
        text: `trainingVideo::${action.id}`
      }
    )
    yield join(submittingForEvaluation)
    yield put(AttachmentsActions.attachmentUploadToYoutubeSuccess(action, false))
    yield fork(emitWebSocketForce, {event: 'COMPLETE_UPLOAD'})
  } else {
    yield fork(emitWebSocketForce, {event: 'FAILURE_UPLOAD'})
    yield put(AttachmentsActions.attachmentUploadToYoutubeFailure({
      code: 'CLIENT_ERROR',
      title: 'Not Found',
    }))
  }
}
