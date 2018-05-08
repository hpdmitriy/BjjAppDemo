import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const {Types, Creators} = createActions({
  lessonGetListRequest: ['activeCategory', 'token', 'ownerUserId', 'limit', 'status', 'accessTags', 'include'],
  lessonGetListSuccess: ['lessonList'],
  lessonGetListFailure: ['error'],

  lessonGetByIdRequest: ['id', 'token', 'include'],
  lessonGetByIdSuccess: ['lesson'],
  lessonGetByIdFailure: ['error'],

  lessonSetFavoriteFlagRequest: ['lessonId', 'flag', 'token'],
  lessonSetFavoriteFlagSuccess: ['favorite'],
  lessonSetFavoriteFlagFailure: ['error'],

  lessonSetRatingRequest: ['lessonId', 'score', 'comment', 'token'],
  lessonSetRatingSuccess: ['favorite'],
  lessonSetRatingFailure: ['error'],

  lessonCreateTrainingRequest: ['lessonId', 'token'],
  lessonCreateTrainingSuccess: ['training'],
  lessonCreateTrainingFailure: ['error'],

  clearLessonSuccess: null,
  clearLessonErrors: null
})

export const LessonsTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  lessonList: null,
  fetching: false,
  fetched: null,
  error: null,
  success: null,
  activeLesson: null,
  createdTraining: null
})

/* ------------- Reducers ------------- */

export const reducerLessonGetByIdRequest = (state) => {
  return state.merge({fetching: true})
}
export const reducerLessonGetByIdSuccess = (state, {lesson}) => {
  return state.merge({
    fetching: false,
    error: null,
    activeLesson: lesson,
    success: Types.LESSON_GET_BY_ID_SUCCESS
  })
}
export const reducerLessonGetByIdFailure = (state, {error}) => {
  return state.merge({fetching: false, error: error})
}

export const reducerLessonGetListRequest = (state) => {
  return state.merge({
    fetching: true
  })
}
export const reducerLessonGetListSuccess = (state, action) => {
  const {lessonList} = action
  return state.merge({
    fetching: false,
    error: null,
    lessonList: lessonList,
    success: Types.LESSON_GET_LIST_SUCCESS
  })
}
export const reducerLessonGetListFailure = (state, {error}) => {
  return state.merge({
    fetching: false,
    error: error
  })
}

export const reducerLessonSetFavoriteFlagRequest = (state) =>
  state.merge({fetching: true})

export const reducerLessonSetFavoriteFlagSuccess = (state) => {
  return state.merge({
    fetching: false,
    fetched: true,
    success: Types.LESSON_SET_FAVORITE_FLAG_SUCCESS
  })
}
export const reducerLessonSetFavoriteFlagFailure = (state, {error}) =>
  state.merge({fetching: false, error: error})


export const reducerLessonSetRatingRequest = (state) => {
  return state.merge({fetching: true})
}
export const reducerLessonSetRatingSuccess = (state, action) => {
  return state.merge({
    fetching: false,
    fetched: true,
    success: Types.LESSON_SET_RATING_SUCCESS
  })
}
export const reducerLessonSetRatingFailure = (state, {error}) =>
  state.merge({fetching: false, error: error})

export const reducerClearLessonSuccess = (state) => {
  return state.merge({success: null, fetched: null})
}
export const reducerClearLessonErrors = (state) => {
  return state.merge({error: null, fetched: null})
}

export const reducerLessonCreateTrainingRequest = (state) => {
  return state.merge({fetching: true})
}
export const reducerLessonCreateTrainingSuccess = (state, {training}) => {
  return state.merge({
    fetching: false,
    fetched: true,
    createdTraining: training,
    success: Types.LESSON_CREATE_TRAINING_SUCCESS
  })
}
export const reducerLessonCreateTrainingFailure = (state, {error}) => {
  return state.merge({fetching: false, error: error})
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE,
  {
    [Types.LESSON_GET_LIST_REQUEST]: reducerLessonGetListRequest,
    [Types.LESSON_GET_LIST_SUCCESS]: reducerLessonGetListSuccess,
    [Types.LESSON_GET_LIST_FAILURE]: reducerLessonGetListFailure,

    [Types.LESSON_GET_BY_ID_REQUEST]: reducerLessonGetByIdRequest,
    [Types.LESSON_GET_BY_ID_SUCCESS]: reducerLessonGetByIdSuccess,
    [Types.LESSON_GET_BY_ID_FAILURE]: reducerLessonGetByIdFailure,

    [Types.LESSON_SET_FAVORITE_FLAG_REQUEST]: reducerLessonSetFavoriteFlagRequest,
    [Types.LESSON_SET_FAVORITE_FLAG_SUCCESS]: reducerLessonSetFavoriteFlagSuccess,
    [Types.LESSON_SET_FAVORITE_FLAG_FAILURE]: reducerLessonSetFavoriteFlagFailure,

    [Types.LESSON_SET_RATING_REQUEST]: reducerLessonSetRatingRequest,
    [Types.LESSON_SET_RATING_SUCCESS]: reducerLessonSetRatingSuccess,
    [Types.LESSON_SET_RATING_FAILURE]: reducerLessonSetRatingFailure,

    [Types.LESSON_CREATE_TRAINING_REQUEST]: reducerLessonCreateTrainingRequest,
    [Types.LESSON_CREATE_TRAINING_SUCCESS]: reducerLessonCreateTrainingSuccess,
    [Types.LESSON_CREATE_TRAINING_FAILURE]: reducerLessonCreateTrainingFailure,

    [Types.CLEAR_LESSON_SUCCESS]: reducerClearLessonSuccess,
    [Types.CLEAR_LESSON_ERRORS]: reducerClearLessonErrors,

  }
)
