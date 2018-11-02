import { takeLatest, call, put } from 'redux-saga/effects';
import { replace } from 'react-router-redux';
import { SUBMIT_NEW_NGO, FETCH_NGOS } from './constants';
import { createNewNgoApi, fetchNgosApi } from './api';
import { setNgos } from './actions';

export function* submitNewNgoDetails({ values, actions }) {
  const { resetForm, setSubmitting } = actions;
  try {
    yield call(createNewNgoApi, values);
    yield call(resetForm);
    yield put(replace('/app/ngos'));
  } catch (e) {
    yield call(setSubmitting, false);
  }
}

export function* fetchNgosSaga() {
  const ngos = yield call(fetchNgosApi);
  yield put(setNgos(ngos));
}
// Individual exports for testing
export default function* defaultSaga() {
  yield [
    takeLatest(SUBMIT_NEW_NGO, submitNewNgoDetails),
    takeLatest(FETCH_NGOS, fetchNgosSaga),
  ];
}
