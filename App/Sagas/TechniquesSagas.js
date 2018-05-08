import { call, put, select, take, fork, join } from 'redux-saga/effects'
import { path, isEmpty, isNil } from 'ramda'
import TechniquesActions, { TechniquesTypes }  from '../Redux/TechniquesRedux'

/*export function* techniqueGetById(api, action) {
 const { uid } = action;
 // make the call to the api
 const response = yield call(api.userGetProfile, uid);
 debugger;
 if (response) {
 console.log(response);
 const firstUser = path(['data', 'items'], response)[0];
 const avatar = firstUser.avatar_url;
 // do data conversion here if needed
 yield put(UsersActions.userGetProfileSuccess(avatar));
 } else {
 yield put(UsersActions.userGetProfileFailure());
 }
 }
 */
export const techniqueCheckCategory = (state) =>
  state.techniques.activeTechniqueCategory

export const getUserProfile = (state) =>
  state.users.userProfile

// process STARTUP actions
export function* changeTechniqueCategory (action) {
  const {id, name} = action
  const activeCategory = yield select(techniqueCheckCategory)
  if (isNil(activeCategory) || activeCategory.id !== id) {
    yield put(TechniquesActions.techniqueCategoryChangeSuccess(id, name))
  } else {
    yield put(TechniquesActions.techniqueCategoryChangeFailure('Nothing to change'))
  }
}

export function* techniquesGetCategoryList (api, action) {
  console.log('SAGA: techniqueCategoryList')
  const {token, entityName = 'Technique'} = action
  const response = yield call(api.techniquesGetCategoryList, token, entityName)
  if (response.ok) {
    if (isNil(response.data.error)) {
      yield put(TechniquesActions.techniqueCategoryListSuccess(response.data))
      console.log('success: ', response.data)
    } else {
      yield put(TechniquesActions.techniqueCategoryListFailure(response.data.error))
      console.log('error: ', response.data.error)
    }
  } else {
    yield put(TechniquesActions.techniqueCategoryListFailure('Unknown Error'))
    console.log('error: ', 'Unknown Error')
  }
}
