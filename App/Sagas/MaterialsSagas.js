import { call, put } from 'redux-saga/effects'
import { isNil, compact, filter } from 'lodash'
import MaterialsActions from '../Redux/MaterialsRedux'


export function* getMaterialsList (api, action) {
  const {activeCategory, token, limit, status, accessTags, include} = action
  const response = yield call(api.getMaterialsList, ...compact([token, limit, status, accessTags, include]))
  if (response.ok) {
    if (isNil(response.data.error)) {
      let {data} = response
      data.rows = filter(data.rows, (o) => o.category_id === activeCategory)
      yield put(MaterialsActions.materialListSuccess(data))
      console.log('success: ', response.data)
    } else {
      yield put(MaterialsActions.materialListFailure(response.data.error))
      console.log('error: ', response.data.error)
    }
  } else {
    yield put(MaterialsActions.materialListFailure('Unknown Error'))
    console.log('error: ', 'Unknown Error')
  }
}

export function* getCategoryList (api, action) {
  console.log('SAGA: categoryList')
  const {entityName, token} = action
  const response = yield call(api.getCategoryList, entityName, token)
  if (response.ok) {
    if (isNil(response.data.error)) {
      yield put(MaterialsActions.categoryListSuccess(response.data))
      console.log('success: ', response.data)
    } else {
      yield put(MaterialsActions.categoryListFailure(response.data.error))
      console.log('error: ', response.data.error)
    }
  } else {
    yield put(MaterialsActions.categoryListFailure('Unknown Error'))
    console.log('error: ', 'Unknown Error')
  }
}

export function * materialGetById (api, action) {
  const {id, token} = action
  const response = yield call(api.materialGetById, id, token)
  if (response.ok) {
    if (isNil(response.data.error)) {
      yield put(MaterialsActions.materialGetByIdSuccess(response.data))
    } else {
      yield put(MaterialsActions.materialGetByIdFailure(response.data.error))
    }
  } else {
    yield put(MaterialsActions.materialGetByIdFailure('Unknown Error'))
    console.log('error: ', 'Unknown Error')
  }
}
