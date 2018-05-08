import { takeLatest, takeEvery, /* fork, put, call, take, */ all } from 'redux-saga/effects'
import UsersAPI from '../Services/Users/Api'
import LocalAPI from '../Services/Storage/Api'
import EventsAPI from '../Services/Events/Api'
import MaterialsAPI from '../Services/Materials/Api'
import TechniquesAPI from '../Services/Techniques/Api'
import LessonsAPI from '../Services/Lessons/Api'
import TrainingsAPI from '../Services/Trainings/Api'
import AttachmentsAPI, {uploadToServer} from '../Services/Attachments/Api';

/* ------------- Types ------------- */

import { UsersTypes } from '../Redux/UsersRedux'
import { MaterialsTypes } from '../Redux/MaterialsRedux'
import { EventsTypes } from '../Redux/EventsRedux'
import { UpdateTypes } from '../Redux/UpdateRedux'
import { WebSocketTypes } from '../Redux/WebSocketRedux'
import { StartupTypes } from '../Redux/StartupRedux'
import { TechniquesTypes } from '../Redux/TechniquesRedux'
import { LessonsTypes } from '../Redux/LessonsRedux'
import { TrainingsTypes } from '../Redux/TrainingsRedux'
import {AttachmentsTypes} from '../Redux/AttachmentsRedux';

/* ------------- Sagas ------------- */
import { startup } from './StartupSagas'
import { checkingUpdate, downloadingUpdate, installingUpdate } from './UpdateSagas'
import { connectWebSocket, emitWebSocket } from './WebSocketSagas'
import {
  userGetProfile,
  userCheckIsAutorised,
  userRegisterByPhoneNumber,
  userConfirmPhone,
  userGetAuthToken,
  userLogOut
} from './UsersSagas'
import { getEventList, eventGetById } from './EventsSagas'

import { getCategoryList, getMaterialsList, materialGetById } from './MaterialsSagas'

import { techniquesGetCategoryList } from './TechniquesSagas'

import { lessonsGetList, lessonGetById, lessonSetFavoriteFlag, lessonSetRating, lessonCreateTraining } from './LessonsSagas'

import { trainingsList, trainingGetById, trainingSendMessage, trainingClose, trainingScoreVideo } from './TrainingsSagas'

import { attachmentGetUploadUrl, attachmentUploadToServer } from './AttachmentsSagas';

/*
 import {
 getTechniquesList,
 getTechniqueCategoryList,
 getLessonList,
 changeTechniqueCategory,
 lessonSetFavoriteFlag,
 lessonCreateTraining,
 lessonCloseTraining,
 lessonSetRating,
 getTrainingsList,
 getTrainingById,
 trainingSendMessage,
 trainingSendVideoForScore
 } from './TechniquesSagas';

 import {getEventList} from './EventsSagas';
 import {
 attachmentGetUploadUrl,
 attachmentCreate,
 attachmentUploadToServer,
 attachmentUploadToYoutube} from './AttachmentsSagas';
 */

/* ------------- API ------------- */

const usersApi = UsersAPI.create()
const localApi = LocalAPI.create()
const eventsApi = EventsAPI.create()
const materialsApi = MaterialsAPI.create()
const techniquesApi = TechniquesAPI.create()
export const trainingsApi = TrainingsAPI.create()
const lessonsApi = LessonsAPI.create()
export const attachmentsApi = AttachmentsAPI.create();

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  console.log('Root Saga')
  yield all([
    takeLatest(StartupTypes.STARTUP, startup),
    takeEvery(
      WebSocketTypes.CONNECT_WEB_SOCKET_REQUEST,
      connectWebSocket
    ),
    takeEvery(
      WebSocketTypes.EMIT_WEB_SOCKET_REQUEST,
      emitWebSocket
    ),
    takeLatest(
      UpdateTypes.CHECKING_FOR_UPDATE_REQUEST,
      checkingUpdate
    ),
    takeLatest(
      UpdateTypes.DOWNLOADING_UPDATE_REQUEST,
      downloadingUpdate
    ),
    takeLatest(
      UpdateTypes.INSTALLING_UPDATE_REQUEST,
      installingUpdate
    ),
    takeLatest(
      UsersTypes.USER_IS_LOGIN_REQUEST,
      userCheckIsAutorised,
      localApi
    ),
    takeLatest(
      UsersTypes.USER_IS_LOGOUT_REQUEST,
      userLogOut,
      localApi
    ),

    takeLatest(
      UsersTypes.USER_REGISTER_BY_PHONE_NUMBER_REQUEST,
      userRegisterByPhoneNumber,
      usersApi
    ),

    takeLatest(
      UsersTypes.USER_CONFIRM_PHONE_REQUEST,
      userConfirmPhone,
      usersApi
    ),

    takeLatest(
      UsersTypes.USER_GET_AUTH_TOKEN_REQUEST,
      userGetAuthToken,
      usersApi
    ),

    takeLatest(
      UsersTypes.USER_GET_PROFILE_REQUEST,
      userGetProfile,
      usersApi
    ),
    takeLatest(
      EventsTypes.EVENT_LIST_REQUEST,
      getEventList,
      eventsApi
    ),
    takeLatest(
      EventsTypes.EVENT_GET_BY_ID_REQUEST,
      eventGetById,
      eventsApi
    ),

    takeLatest(
      MaterialsTypes.CATEGORY_LIST_REQUEST,
      getCategoryList,
      materialsApi
    ),
    takeLatest(
      MaterialsTypes.MATERIAL_LIST_REQUEST,
      getMaterialsList,
      materialsApi
    ),
    takeLatest(
      MaterialsTypes.MATERIAL_GET_BY_ID_REQUEST,
      materialGetById,
      materialsApi
    ),
    takeLatest(
      TechniquesTypes.TECHNIQUE_CATEGORY_LIST_REQUEST,
      techniquesGetCategoryList,
      techniquesApi
    ),
    takeLatest(
      LessonsTypes.LESSON_GET_LIST_REQUEST,
      lessonsGetList,
      lessonsApi
    ),
    takeLatest(
      LessonsTypes.LESSON_GET_BY_ID_REQUEST,
      lessonGetById,
      lessonsApi
    ),
    takeLatest(
      LessonsTypes.LESSON_SET_FAVORITE_FLAG_REQUEST,
      lessonSetFavoriteFlag,
      lessonsApi
    ),
    takeLatest(
      LessonsTypes.LESSON_SET_RATING_REQUEST,
      lessonSetRating,
      lessonsApi
    ),
    takeLatest(
      LessonsTypes.LESSON_CREATE_TRAINING_REQUEST,
      lessonCreateTraining,
      lessonsApi
    ),
    takeLatest(
      TrainingsTypes.TRAINING_LIST_REQUEST,
      trainingsList,
      trainingsApi
    ),
    takeLatest(
      TrainingsTypes.TRAINING_GET_BY_ID_REQUEST,
      trainingGetById,
      trainingsApi
    ),
    takeLatest(
      TrainingsTypes.TRAINING_SEND_MESSAGE_REQUEST,
      trainingSendMessage,
      trainingsApi
    ),
    takeLatest(
      TrainingsTypes.TRAINING_SCORE_VIDEO_REQUEST,
      trainingScoreVideo,
      trainingsApi
    ),
    takeLatest(
      TrainingsTypes.TRAINING_CLOSE_REQUEST,
      trainingClose,
      trainingsApi
    ),

    takeLatest(
      AttachmentsTypes.ATTACHMENT_GET_UPLOAD_URL_REQUEST,
      attachmentGetUploadUrl,
      attachmentsApi
    ),
    takeLatest(
      AttachmentsTypes.ATTACHMENT_UPLOAD_TO_SERVER_REQUEST,
      attachmentUploadToServer,
      [uploadToServer, attachmentsApi.attachmentUploadToYoutube]
    ),
    /*
     takeLatest(
     EventsTypes.EVENT_LIST_REQUEST,
     getEventList,
     eventsApi
     ),

     takeLatest(
     TechniquesTypes.TECHNIQUE_LIST_REQUEST,
     getTechniquesList,
     materialsApi
     ),
     takeLatest(
     TechniquesTypes.LESSON_LIST_REQUEST,
     getLessonList,
     materialsApi
     ),
     takeLatest(
     TechniquesTypes.TECHNIQUE_CATEGORY_CHANGE_REQUEST,
     changeTechniqueCategory
     ),
     takeLatest(
     TechniquesTypes.LESSON_SET_FAVORITE_FLAG_REQUEST,
     lessonSetFavoriteFlag,
     materialsApi
     ),
     takeLatest(
     TechniquesTypes.LESSON_CREATE_TRAINING_REQUEST,
     lessonCreateTraining,
     materialsApi
     ),
     takeLatest(
     TechniquesTypes.LESSON_CLOSE_TRAINING_REQUEST,
     lessonCloseTraining,
     materialsApi
     ),
     takeLatest(
     TechniquesTypes.LESSON_SET_RATING_REQUEST,
     lessonSetRating,
     materialsApi
     ),
     takeLatest(
     TechniquesTypes.TRAININGS_LIST_REQUEST,
     getTrainingsList,
     materialsApi
     ),
     takeLatest(
     TechniquesTypes.TRAINING_GET_BY_ID_REQUEST,
     getTrainingById,
     materialsApi
     ),
     takeLatest(
     TechniquesTypes.TRAINING_SEND_MESSAGE_REQUEST,
     trainingSendMessage,
     materialsApi
     ),
     takeLatest(
     AttachmentsTypes.ATTACHMENT_GET_UPLOAD_URL_REQUEST,
     attachmentGetUploadUrl,
     attachmentsApi
     ),

     takeLatest(
     AttachmentsTypes.ATTACHMENT_CREATE_REQUEST,
     attachmentCreate,
     attachmentsApi
     ),
     takeLatest(
     AttachmentsTypes.ATTACHMENT_UPLOAD_TO_YOUTUBE_REQUEST,
     attachmentUploadToYoutube,
     attachmentsApi
     ),
     takeLatest(
     TechniquesTypes.TRAINING_SEND_VIDEO_FOR_SCORE_REQUEST,
     trainingSendVideoForScore,
     materialsApi
     ),
     */
  ])
}
