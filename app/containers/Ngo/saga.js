import { takeLatest, call, put } from 'redux-saga/effects';
import { replace } from 'react-router-redux';
import { SUBMIT_NEW_NGO } from './constants';
import { createNewNgoApi } from './api';

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
// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(SUBMIT_NEW_NGO, submitNewNgoDetails);
}
