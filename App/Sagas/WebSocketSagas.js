import { call, put, take, fork, select, spawn, join } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import WebSocketActions from '../Redux/WebSocketRedux'
import { trainingsApi, attachmentsApi } from './index'
import { trainingGetById, trainingsList } from './TrainingsSagas'
import { attachmentCreate, attachmentCheckDoneUploadToYoutube } from './AttachmentsSagas'
import AttachmentsActions from '../Redux/AttachmentsRedux'
//import TechniquesActions from '../Redux/TechniquesRedux';
//import { YOUTUBE_URL } from '../Config/Constants';

export const webSocketConnection = (state) =>
  state.sockets.webSocketConnection

export const userToken = (state) =>
  state.users.token

export const getUserProfile = (state) =>
  state.users.userProfile
/*
 export const attachmentYoutube = (state) =>
 state.attachments.attachmentYoutube;

 export const attachmentObject = (state) =>
 state.attachments.attachmentObject;

 export const progress = (state) =>
 state.attachments.progress;

 export const getCreatedAttachment = (state) =>
 state.attachments.createdAttachment;

 export const getActiveTraning = (state) =>
 state.techniques.activeTraining;
 */

export function * connectWebSocket (action) {
  yield put(WebSocketActions.connectWebSocketSuccess(action))
}
export function * emitWebSocketForce ({event}) {
  yield put(WebSocketActions.emitWebSocketSuccess({ev: event}))
}
export function * emitWebSocket (action) {
  console.log('emitWebSocket======>', action)
  const {event} = action
  yield put(WebSocketActions.emitWebSocketSuccess(event))
  const connection = yield select(webSocketConnection)
  const userProfile = yield select(getUserProfile)

  if (event.ev === 'TRAINING_NEW_MESSAGE') {
    const refreshTrainingById = yield spawn(trainingGetById, trainingsApi, {
      trainingId: event.d.training.id,
      token: connection.signedAuthToken
    })
    const refreshTrainingsList = yield spawn(trainingsList, trainingsApi, {
      studentUserId: userProfile.role !== 'Teacher' ? userProfile.id : null,
      teacherUserId: userProfile.role === 'Teacher' ? userProfile.id : null,
      token: connection.signedAuthToken
    })
    yield join(refreshTrainingById)
    yield join(refreshTrainingsList)
  }
  if (event.ev === 'YOUTUBE_UPLOAD_PROGRESS') {
    console.log(event)
    /*
     yield put(AttachmentsActions.attachmentSetProgress([
     Math.floor(event.d.raw.uploadedMBytes * 1024 * 1024),
     event.d.raw.fileSize
     ]))
     */
  }
  if (event.ev === 'YOUTUBE_UPLOAD_DONE') {
    yield fork(attachmentCheckDoneUploadToYoutube, attachmentsApi, {...event.d.raw})
    /*const {mimeType} = yield select(attachmentObject)
     const url = `${YOUTUBE_URL}${event.d.raw.id}`
     const token = yield select(userToken)
     yield put(AttachmentsActions.attachmentSetProgress([
     event.d.media.size,
     event.d.media.size,
     ]))*/
  }
  /*   const attachmentCreateTask = yield fork(attachmentCreate, attachmentsApi, {
   mimeType: mimeType,
   url: url,
   token: token
   })
   yield join(attachmentCreateTask)
   yield put(AttachmentsActions.attachmentUploadToYoutubeSuccess(event.d, false))
   const createdAttachment = yield select(getCreatedAttachment)
   const activeTraining = yield select(getActiveTraning)
   yield fork(trainingSendVideoForScore, materialsApi, {
   trainingId: activeTraining.id,
   attachmentId: createdAttachment.id,
   forMark: true,
   text: `attachmentYoutube::${event.d.raw.id}`,
   token: token,
   })
   }
   if (event.ev === 'YOUTUBE_UPLOAD_ERROR') {
   yield put(AttachmentsActions.attachmentUploadToYoutubeFailure(event.d))
   }
   */
}
