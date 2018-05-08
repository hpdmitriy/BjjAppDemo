import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { signIn } from '../Themes/Content'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  materialGetByIdRequest: ['id', 'token'],
  materialGetByIdSuccess: ['material'],
  materialGetByIdFailure: ['error'],
  materialListRequest: ['activeCategory', 'token', 'limit', 'status', 'accessTags', 'include'],
  materialListSuccess: ['materialsList'],
  materialListFailure: ['error'],
  categoryListRequest: ['entityName', 'token'],
  categoryListSuccess: ['categoryesList'],
  categoryListFailure: ['error'],
  clearMaterialsSuccess: null,
  clearMaterialsErrors: null
})
export const MaterialsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  currentMaterial: null,
  materialsList: null,
  categoryesList: null,
  category: null,
  activeCategory: null,
  fetching: false,
  error: null,
  success: null,
})

/* ------------- Reducers ------------- */

export const reducerMaterialGetByIdRequest = (state, {token, mid}) =>
  state.merge({
    fetching: true,
  })
export const reducerMaterialGetByIdSuccess = (state, action) => {
  const {material} = action
  return state.merge({
    fetching: false,
    error: null,
    currentMaterial: material,
    success: Types['MATERIAL_GET_BY_ID_SUCCESS']
  })
}
export const reducerMaterialGetByIdFailure = (state, {error}) => {
  return state.merge({fetching: false, error: error})
}

export const reducerMaterialListRequest = (state) => {
  return state.merge({
    fetching: true
  })
}

export const reducerMaterialListSuccess = (state, action) => {
  const {materialsList} = action
  return state.merge({
    fetching: false,
    error: null,
    materialsList: materialsList,
    success: Types['MATERIAL_LIST_SUCCESS']
  })
}
export const reducerMaterialListFailure = (state, {error}) => {
  return state.merge({fetching: false, error: error})
}

export const reducerCategoryListRequest = (state, {entityName, token}) =>
  state.merge({
    fetching: true,
    category: entityName,
  })
export const reducerCategoryListSuccess = (state, action) => {
  const {categoryesList} = action
  return state.merge({
    success: Types['CATEGORY_LIST_SUCCESS'],
    fetching: false,
    error: null,
    categoryesList: categoryesList
  })
}
export const reducerCategoryListFailure = (state, {error}) => {
  return state.merge({fetching: false, error: error})
}

export const reducerClearMaterialsSuccess = (state) => {
  return state.merge({success: null})
}
export const reducerClearMaterialsErrors = (state) => {
  return state.merge({error: null})
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE,
  {
    [Types.MATERIAL_GET_BY_ID_REQUEST]: reducerMaterialGetByIdRequest,
    [Types.MATERIAL_GET_BY_ID_SUCCESS]: reducerMaterialGetByIdSuccess,
    [Types.MATERIAL_GET_BY_ID_FAILURE]: reducerMaterialGetByIdFailure,

    [Types.MATERIAL_LIST_REQUEST]: reducerMaterialListRequest,
    [Types.MATERIAL_LIST_SUCCESS]: reducerMaterialListSuccess,
    [Types.MATERIAL_LIST_FAILURE]: reducerMaterialListFailure,

    [Types.CATEGORY_LIST_REQUEST]: reducerCategoryListRequest,
    [Types.CATEGORY_LIST_SUCCESS]: reducerCategoryListSuccess,
    [Types.CATEGORY_LIST_FAILURE]: reducerCategoryListFailure,

    [Types.CLEAR_MATERIALS_SUCCESS]: reducerClearMaterialsSuccess,
    [Types.CLEAR_MATERIALS_ERRORS]: reducerClearMaterialsErrors
  }
)
