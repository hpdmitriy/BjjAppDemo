import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  attachmentGetUploadUrlRequest: ['mimeType', 'token'],
  attachmentGetUploadUrlSuccess: ['uri'],
  attachmentGetUploadUrlFailure: ['error'],

  attachmentCreateRequest: ['mimType', 'url', 'token'],
  attachmentCreateSuccess: ['createdAttachment', 'continueUpload'],
  attachmentCreateFailure: ['error'],

  attachmentUploadToServerRequest: ['options', 'data', 'cb'],
  attachmentUploadToServerSuccess: ['attachment', 'continueUpload'],
  attachmentUploadToServerFailure: ['error'],

  attachmentUploadToYoutubeRequest: [
    'mediaHash',
    'title',
    'description',
    'privacyStatus',
    'notifySubscribers',
    'progressInterval',
    'deleteMediaAfterUpload',
    'token'
  ],
  attachmentUploadToYoutubeSuccess: ['attachmentYoutube', 'continueUpload'],
  attachmentUploadToYoutubeFailure: ['error'],

  attachmentSetProgress: ['progress'],

  clearAttachmentSuccess: null,
  clearAttachmentErrors: null

})
export const AttachmentsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  attachment: null,
  attachmentYoutube: null,
  attachmentObject: null,
  attachmentUrl: null,
  createdAttachment: null,
  progress: null,
  fetching: false,
  fetched: false,
  success: null,
  error: null
})

/* ------------- Reducers ------------- */

export const reducerAttachmentGetUploadUrlRequest = (state, {mimeType}) => {
  return state.merge({
    fetching: true,
    attachmentObject: mimeType
  })
}
export const reducerAttachmentGetUploadUrlSuccess = (state, {uri}) => {
  return state.merge({attachmentUrl: uri, fetching: false, success: Types.ATTACHMENT_GET_UPLOAD_URL_SUCCESS})
}
export const reducerAttachmentGetUploadUrlFailure = (state, {error}) =>
  state.merge({fetching: false, error: error})

export const reducerAttachmentCreateRequest = (state) =>
  state.merge({
    fetching: true,
  })
export const reducerAttachmentCreateSuccess = (state, {createdAttachment, continueUpload}) => {
  return state.merge({fetching: continueUpload, error: null, createdAttachment})
}
export const reducerAttachmentCreateFailure = (state, {error}) => {
  return state.merge({fetching: false, error: error})
}

export const reducerAttachmentUploadToServerRequest = (state) =>
  state.merge({
    fetching: true
  })
export const reducerAttachmentUploadToServerSuccess = (state, {attachment, continueUpload}) => {
  if (continueUpload) {
    return state.merge({
      fetching: true,
      attachment: attachment,
    })
  } else {
    return state.merge({
      fetching: false,
      fetched: true,
      error: null,
      attachment: attachment,
      success: Types.ATTACHMENT_UPLOAD_TO_SERVER_SUCCESS
    })
  }
}
export const reducerAttachmentUploadToServerFailure = (state, {error}) => {
  return state.merge({fetching: false, attachment: null, error})
}

export const reducerAttachmentUploadToYoutubeRequest = (state) =>
  state.merge({
    fetching: true,
  })
export const reducerAttachmentUploadToYoutubeSuccess = (state, {attachmentYoutube, continueUpload}) => {
  if (continueUpload) {
    return state.merge({
      fetching: true,
      fetched: false,
      attachmentYoutube
    })
  } else {
    return state.merge({
      fetching: false,
      error: null,
      fetched: true,
      success: AttachmentsTypes.ATTACHMENT_UPLOAD_TO_YOUTUBE_SUCCESS,
      attachmentYoutube
    })
  }
}
export const reducerAttachmentUploadToYoutubeFailure = (state, {error}) => {
  return state.merge({fetching: false, fetched: true, attachmentYoutube: null, error})
}

export const reducerAttachmentSetProgress = (state, {progress}) =>
  state.merge({progress})

export const reducerClearAttachmentSuccess = (state) => {
  return state.merge({success: null, fetched: null})
}
export const reducerClearAttachmentErrors = (state) => {
  return state.merge({error: null, fetched: null})
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE,
  {
    [Types.ATTACHMENT_GET_UPLOAD_URL_REQUEST]: reducerAttachmentGetUploadUrlRequest,
    [Types.ATTACHMENT_GET_UPLOAD_URL_SUCCESS]: reducerAttachmentGetUploadUrlSuccess,
    [Types.ATTACHMENT_GET_UPLOAD_URL_FAILURE]: reducerAttachmentGetUploadUrlFailure,

    [Types.ATTACHMENT_CREATE_REQUEST]: reducerAttachmentCreateRequest,
    [Types.ATTACHMENT_CREATE_SUCCESS]: reducerAttachmentCreateSuccess,
    [Types.ATTACHMENT_CREATE_FAILURE]: reducerAttachmentCreateFailure,

    [Types.ATTACHMENT_UPLOAD_TO_SERVER_REQUEST]: reducerAttachmentUploadToServerRequest,
    [Types.ATTACHMENT_UPLOAD_TO_SERVER_SUCCESS]: reducerAttachmentUploadToServerSuccess,
    [Types.ATTACHMENT_UPLOAD_TO_SERVER_FAILURE]: reducerAttachmentUploadToServerFailure,

    [Types.ATTACHMENT_UPLOAD_TO_YOUTUBE_REQUEST]: reducerAttachmentUploadToYoutubeRequest,
    [Types.ATTACHMENT_UPLOAD_TO_YOUTUBE_SUCCESS]: reducerAttachmentUploadToYoutubeSuccess,
    [Types.ATTACHMENT_UPLOAD_TO_YOUTUBE_FAILURE]: reducerAttachmentUploadToYoutubeFailure,

    [Types.ATTACHMENT_SET_PROGRESS]: reducerAttachmentSetProgress,

    [Types.CLEAR_ATTACHMENT_SUCCESS]: reducerClearAttachmentSuccess,
    [Types.CLEAR_ATTACHMENT_ERRORS]: reducerClearAttachmentErrors,
  }
)
