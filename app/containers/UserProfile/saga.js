import { takeLatest, put } from 'redux-saga/effects';
import { FETCH_USER_PROFILE, SAVE_USER_PROFILE } from './constants';
import { setUserProfile } from './actions';
import featherClient, { userService } from './../../feathers';
import { startFetchingData, stopFetchingData } from '../Home/actions';

// Individual exports for testing
export default function* defaultSaga() {
  yield [
    takeLatest(FETCH_USER_PROFILE, fetchUserProfile),
    takeLatest(SAVE_USER_PROFILE, saveUserProfileSaga),
  ];
}

export function* fetchUserProfile({ payload }) {
  const { userId } = payload;
  try {
    yield put(startFetchingData());
    yield featherClient.authenticate();
    const userProfile = yield userService.get(userId);
    yield put(setUserProfile(userProfile));
    yield put(stopFetchingData());
  } catch (e) {
    yield put(stopFetchingData());
  }
}

export function* saveUserProfileSaga(action) {
  const { payload, actions } = action;
  try {
    yield put(startFetchingData());
    yield featherClient.authenticate();
    const userProfile = yield userService.patch(payload._id, payload);
    yield put(setUserProfile(userProfile));
    actions.setSubmitting(false);
    yield put(stopFetchingData());
  } catch (e) {
    yield put(stopFetchingData());
    actions.setSubmitting(false);
  }
}
