import { put } from 'redux-saga/effects';
import UpdateActions from '../Redux/UpdateRedux';


export function* checkingUpdate(action) {
  const {checking} = action;
  yield put(UpdateActions.checkingForUpdateSuccess(checking));
}
export function* downloadingUpdate(action) {
  const {counter} = action;
  yield put(UpdateActions.downloadingUpdateSuccess(counter));
}
export function* installingUpdate(action) {
  const {process} = action;
  yield put(UpdateActions.installingUpdateSuccess(process));
}
