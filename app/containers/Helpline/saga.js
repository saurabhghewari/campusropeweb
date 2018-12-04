import { takeLatest, call, put } from 'redux-saga/effects';
import { replace } from 'react-router-redux';
import {
  FETCH_HELPLINES,
  FETCH_HELPLINE_BY_ID,
  CREATE_HELPLINE,
} from './constants';
import { setHelplines, setInViewHelpline } from './actions';
import featherClient, { helplineService } from './../../feathers';

export function* submitNewHelplineDetails({ values, actions }) {
  const { resetForm, setSubmitting } = actions;
  try {
    yield featherClient.authenticate();
    yield helplineService.create(values);
    yield call(resetForm);
    yield put(replace('/app/helpline'));
  } catch (e) {
    yield call(setSubmitting, false);
  }
}

export function* fetchHelplinesSaga(action) {
  try {
    yield featherClient.authenticate();
    const state = action.state
    let query = {};
    if(state !== 'all'){
      query = {
        operatingState:state
      }
    }
    const helplines = yield helplineService.find({query});
    yield put(setHelplines(helplines.data));
  } catch (e) {
    console.error(e);
  }
}

export function* fetchHelplineByIdSaga({ helplineId }) {
  yield featherClient.authenticate();
  const helpline = yield helplineService.get(helplineId);
  yield put(setInViewHelpline(helpline));
}
// Individual exports for testing
export default function* defaultSaga() {
  yield [
    takeLatest(FETCH_HELPLINES, fetchHelplinesSaga),
    takeLatest(FETCH_HELPLINE_BY_ID, fetchHelplineByIdSaga),
    takeLatest(CREATE_HELPLINE, submitNewHelplineDetails),
  ];
}
