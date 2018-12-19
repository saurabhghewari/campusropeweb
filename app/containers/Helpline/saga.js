import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import {
  FETCH_HELPLINES,
  FETCH_HELPLINE_BY_ID,
  CREATE_HELPLINE,
  UPDATE_HELPLINE_BY_ID,
  DELETE_HELPLINE,
} from './constants';
import { setHelplines, setInViewHelpline } from './actions';
import featherClient, { helplineService } from './../../feathers';
import { startFetchingData, stopFetchingData } from '../Home/actions';

export function* submitNewHelplineDetails({ values, actions }) {
  const { resetForm, setSubmitting } = actions;
  try {
    yield put(startFetchingData());
    yield featherClient.authenticate();
    yield helplineService.create(values);
    yield call(resetForm);
    yield put(push('/helpline/admin'));
    yield put(stopFetchingData());
  } catch (e) {
    yield put(stopFetchingData());
    yield call(setSubmitting, false);
  }
}

export function* fetchHelplinesSaga(action) {
  try {
    yield put(startFetchingData());
    yield put(setHelplines([]));
    yield featherClient.authenticate();
    const state = action.state;
    let query = {
      operatingState: state,
    };
    const helplines = yield helplineService.find({ query });
    yield put(setHelplines(helplines.data));
    yield put(stopFetchingData());
  } catch (e) {
    console.error(e);
  }
}

export function* updateHelplineBYIdSaga({ updatedHelpline }) {
  try {
    yield put(startFetchingData());
    yield featherClient.authenticate();
    const updHelpline = yield helplineService.patch(
      updatedHelpline._id,
      updatedHelpline.data,
    );
    yield put(setInViewHelpline(updHelpline));
    yield put(stopFetchingData());
  } catch (e) {
    console.error(e);
  }
}

export function* deleteHelplineSaga({ helplineId }) {
  try {
    yield put(startFetchingData());
    yield featherClient.authenticate();
    yield helplineService.remove(helplineId);
    yield put(push('/helpline/admin'));
    yield put(stopFetchingData());
  } catch (e) {
    console.error(e);
  }
}

export function* fetchHelplineByIdSaga({ helplineId }) {
  yield put(startFetchingData());
  yield put(setInViewHelpline({}));
  yield featherClient.authenticate();
  const helpline = yield helplineService.get(helplineId);
  yield put(setInViewHelpline(helpline));
  yield put(stopFetchingData());
}
// Individual exports for testing
export default function* defaultSaga() {
  yield [
    takeLatest(FETCH_HELPLINES, fetchHelplinesSaga),
    takeLatest(FETCH_HELPLINE_BY_ID, fetchHelplineByIdSaga),
    takeLatest(CREATE_HELPLINE, submitNewHelplineDetails),
    takeLatest(UPDATE_HELPLINE_BY_ID, updateHelplineBYIdSaga),
    takeLatest(DELETE_HELPLINE, deleteHelplineSaga),
  ];
}
