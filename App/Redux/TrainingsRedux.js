import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const {Types, Creators} = createActions({
  trainingCloseRequest: ['trainingId', 'ignoreMark', 'token'],
  trainingCloseSuccess: ['training'],
  trainingCloseFailure: ['error'],

  trainingListRequest: ['studentUserId', 'teacherUserId', 'token'],
  trainingListSuccess: ['trainingsList'],
  trainingListFailure: ['error'],

  difficultyListRequest: null,
  difficultyListSuccess: ['difficultyList'],
  difficultyListFailure: ['error'],

  trainingGetByIdRequest: ['trainingId', 'token', 'include',],
  trainingGetByIdSuccess: ['training'],
  trainingGetByIdFailure: ['error'],

  trainingSendMessageRequest: ['trainingId', 'text', 'token'],
  trainingSendMessageSuccess: ['success'],
  trainingSendMessageFailure: ['error'],

  trainingScoreVideoRequest: ['trainingId', 'replyMessageId', 'text', 'mark', 'token'],
  trainingScoreVideoSuccess: ['success'],
  trainingScoreVideoFailure: ['error'],

  trainingSubmittingVideoForEvaluationRequest: ['trainingId', 'attachmentId', 'token', 'text'],
  trainingSubmittingVideoForEvaluationSuccess: ['success'],
  trainingSubmittingVideoForEvaluationFailure: ['error'],

  clearTrainingSuccess: null,
  clearTrainingErrors: null
})

export const TrainingsTypes = Types
export default Creators
export const INITIAL_STATE = Immutable({
  activeTraining: null,
  trainingEvents: null,
  fetching: true,
  fetched: null,
  error: null,
  success: null,
  trainingsList: null,
  difficultyList: null
})

/* ------------- Reducers ------------- */
export const reducerTrainingCloseRequest = (state) =>
  state.merge({fetching: true})

export const reducerTrainingCloseSuccess = (state, action) => {
  return state.merge({
    fetching: false,
    success: TrainingsTypes.TRAINING_CLOSE_SUCCESS
  })
}
export const reducerTrainingCloseFailure = (state, {error}) => {
  return state.merge({
    fetching: false,
    error: error
  })
}

export const reducerTrainingListRequest = (state) => {
  return state.merge({
    fetching: true
  })
}
export const reducerTrainingListSuccess = (state, {trainingsList}) => {
  return state.merge({
    fetching: false,
    success: TrainingsTypes.TRAINING_LIST_SUCCESS,
    trainingsList: trainingsList
  })
}
export const reducerTrainingListFailure = (state, {error}) => {
  return state.merge({
    fetching: false,
    error: error
  })
}

export const reducerTrainingGetByIdRequest = (state) =>
  state.merge({
    fetching: true
  });
export const reducerTrainingGetByIdSuccess = (state, {training}) => {
  return state.merge({
    fetching: false,
    error: null,
    activeTraining: training,
    success: TrainingsTypes.TRAINING_GET_BY_ID_SUCCESS
  })
};
export const reducerTrainingGetByIdFailure = (state, {error}) =>
  state.merge({
    fetching: false,
    error: error
  });

export const reducerDifficultyListRequest = (state) => {
  return state.merge({
    fetching: true
  })
}
export const reducerDifficultyListSuccess = (state, {difficultyList}) => {
  return state.merge({
    fetching: false,
    difficultyList: difficultyList
  })
}
export const reducerDifficultyListFailure = (state, {error}) => {
  return state.merge({
    fetching: false,
    error: error
  })
}
export const reducerTrainingSendMessageRequest = (state) =>
  state.merge({
    fetching: true
  })
export const reducerTrainingSendMessageSuccess = (state, action) => {
  const {success} = action
  return state.merge({
    fetching: false,
    //fetched: true,
    trainingEvents: success,
    success: TrainingsTypes.TRAINING_SEND_MESSAGE_SUCCESS
  })
}
export const reducerTrainingSendMessageFailure = (state, {error}) => {
  return state.merge({
    fetching: false,
    error: error
  })
}

export const reducerTrainingScoreVideoRequest = (state) => {
  debugger
  return state.merge({
    fetching: true
  })
}
export const reducerTrainingScoreVideoSuccess = (state, action) => {
  const {success} = action
  return state.merge({
    fetching: false,
    //fetched: true,
    trainingEvents: success,
    success: TrainingsTypes.TRAINING_SCORE_VIDEO_SUCCESS
  })
}
export const reducerTrainingScoreVideoFailure = (state, {error}) => {
  return state.merge({
    fetching: false,
    error: error
  })
}


export const reducerTrainingSubmittingVideoForEvaluationRequest = (state) =>
  state.merge({
    fetching: true
  })
export const reducerTrainingSubmittingVideoForEvaluationSuccess = (state, action) => {
  const {success} = action
  return state.merge({
    fetching: false,
    trainingEvents: success,
    //success: TrainingsTypes.TRAINING_SUBMITTING_VIDEO_FOR_EVALUATION_SUCCESS
  })
}
export const reducerTrainingSubmittingVideoForEvaluationFailure = (state, {error}) => {
  return state.merge({
    fetching: false,
    error: error
  })
}

export const reducerClearTrainingSuccess = (state) => {
  return state.merge({success: null})
}
export const reducerClearTrainingErrors = (state) => {
  return state.merge({error: null})
}
/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE,
  {
    [Types.TRAINING_CLOSE_REQUEST]: reducerTrainingCloseRequest,
    [Types.TRAINING_CLOSE_SUCCESS]: reducerTrainingCloseSuccess,
    [Types.TRAINING_CLOSE_FAILURE]: reducerTrainingCloseFailure,

    [Types.TRAINING_GET_BY_ID_REQUEST]: reducerTrainingGetByIdRequest,
    [Types.TRAINING_GET_BY_ID_SUCCESS]: reducerTrainingGetByIdSuccess,
    [Types.TRAINING_GET_BY_ID_FAILURE]: reducerTrainingGetByIdFailure,

    [Types.TRAINING_LIST_REQUEST]: reducerTrainingListRequest,
    [Types.TRAINING_LIST_SUCCESS]: reducerTrainingListSuccess,
    [Types.TRAINING_LIST_FAILURE]: reducerTrainingListFailure,

    [Types.DIFFICULTY_LIST_REQUEST]: reducerDifficultyListRequest,
    [Types.DIFFICULTY_LIST_SUCCESS]: reducerDifficultyListSuccess,
    [Types.DIFFICULTY_LIST_FAILURE]: reducerDifficultyListFailure,

    [Types.TRAINING_SEND_MESSAGE_REQUEST]: reducerTrainingSendMessageRequest,
    [Types.TRAINING_SEND_MESSAGE_SUCCESS]: reducerTrainingSendMessageSuccess,
    [Types.TRAINING_SEND_MESSAGE_FAILURE]: reducerTrainingSendMessageFailure,

    [Types.TRAINING_SCORE_VIDEO_REQUEST]: reducerTrainingScoreVideoRequest,
    [Types.TRAINING_SCORE_VIDEO_SUCCESS]: reducerTrainingScoreVideoSuccess,
    [Types.TRAINING_SCORE_VIDEO_FAILURE]: reducerTrainingScoreVideoFailure,

    [Types.TRAINING_SUBMITTING_VIDEO_FOR_EVALUATION_REQUEST]: reducerTrainingSubmittingVideoForEvaluationRequest,
    [Types.TRAINING_SUBMITTING_VIDEO_FOR_EVALUATION_SUCCESS]: reducerTrainingSubmittingVideoForEvaluationSuccess,
    [Types.TRAINING_SUBMITTING_VIDEO_FOR_EVALUATION_FAILURE]: reducerTrainingSubmittingVideoForEvaluationFailure,

    [Types.CLEAR_TRAINING_SUCCESS]: reducerClearTrainingSuccess,
    [Types.CLEAR_TRAINING_ERRORS]: reducerClearTrainingErrors,
  }
)
