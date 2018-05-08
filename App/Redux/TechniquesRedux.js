import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const {Types, Creators} = createActions({
  techniqueCategoryChange: ['id', 'name'],
  techniqueCategoryListRequest: ['token', 'entityName'],
  techniqueCategoryListSuccess: ['techniques'],
  techniqueCategoryListFailure: ['error'],
  clearTechniqueSuccess: null,
  clearTechniqueErrors: null
})

export const TechniquesTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  techniquesList: null,
  activeTechnique: null,
  fetching: false,
  success: null,
  error: null
})

/* ------------- Reducers ------------- */
export const reducerTechniqueCategoryListRequest = (state) =>
  state.merge({
    fetching: true
  })
export const reducerTechniqueCategoryListSuccess = (state, action) => {
  const {techniques} = action
  return state.merge({
    fetching: false,
    error: null,
    techniquesList: techniques,
    success: Types.TECHNIQUE_CATEGORY_LIST_SUCCESS
  })
}
export const reducerTechniqueCategoryListFailure = (state, {error}) =>
  state.merge({fetching: false, error: error})


export const reducerTechniqueCategoryChange = (state, action) => {
  const {id, name} = action
  return state.merge({
    activeTechnique: {
      id: id,
      name: name
    }
  })
}
export const reducerClearTechniqueSuccess = (state) => {
  return state.merge({success: null})
}
export const reducerClearTechniqueErrors = (state) => {
  return state.merge({error: null})
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE,
  {
    [Types.TECHNIQUE_CATEGORY_CHANGE]: reducerTechniqueCategoryChange,

    [Types.TECHNIQUE_CATEGORY_LIST_REQUEST]: reducerTechniqueCategoryListRequest,
    [Types.TECHNIQUE_CATEGORY_LIST_SUCCESS]: reducerTechniqueCategoryListSuccess,
    [Types.TECHNIQUE_CATEGORY_LIST_FAILURE]: reducerTechniqueCategoryListFailure,
    [Types.CLEAR_TECHNIQUE_SUCCESS]: reducerClearTechniqueSuccess,
    [Types.CLEAR_TECHNIQUE_ERRORS]: reducerClearTechniqueErrors,
  }
)
