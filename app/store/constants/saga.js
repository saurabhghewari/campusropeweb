import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_CONSTANTS } from './constants';
import { fetchConstantsApi } from './api';
import { setConstants } from './actions';

function* fetchConstantsSaga() {
  const constants = yield call(fetchConstantsApi);
  console.log(constants);
  yield put(setConstants(constants));
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(FETCH_CONSTANTS, fetchConstantsSaga);
}
