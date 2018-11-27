import { takeLatest, call, put } from 'redux-saga/effects';
import { replace } from 'react-router-redux';
import {
  SUBMIT_NEW_NGO,
  FETCH_NGOS,
  FETCH_NGO_BY_ID,
  UPDATE_NGO_BY_ID,
} from './constants';
import { setNgos, setInViewNgo } from './actions';
import { ngoService } from './../../feathers';

export function* submitNewNgoDetails({ values, actions }) {
  const { resetForm, setSubmitting } = actions;
  try {
    yield ngoService.create(values);
    yield call(resetForm);
    yield put(replace('/app/ngos'));
  } catch (e) {
    yield call(setSubmitting, false);
  }
}

export function* fetchNgosSaga() {
  const ngos = yield ngoService.find({});
  yield put(setNgos(ngos.data));
}

export function* updateNgoSaga({ ngo }) {
  yield ngoService.patch(ngo._id, ngo);
  yield put(replace('/app/ngos/verification'));
}

export function* fetchNgoByIdSaga({ ngoId }) {
  const ngo = yield ngoService.get(ngoId);
  yield put(setInViewNgo(ngo));
}
// Individual exports for testing
export default function* defaultSaga() {
  yield [
    takeLatest(SUBMIT_NEW_NGO, submitNewNgoDetails),
    takeLatest(FETCH_NGOS, fetchNgosSaga),
    takeLatest(FETCH_NGO_BY_ID, fetchNgoByIdSaga),
    takeLatest(UPDATE_NGO_BY_ID, updateNgoSaga),
  ];
}
