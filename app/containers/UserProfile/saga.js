/* import { takeLatest, call, put } from 'redux-saga/effects';
import { PROFILE_INFO_FETCH_ACTION, SAVE_PROFILE_ACTION } from './constants';
import { setUserProfileAction } from './actions';

// Individual exports for testing
export default function* defaultSaga() {
  yield [
    takeLatest(PROFILE_INFO_FETCH_ACTION, fetchUserProfile),
    takeLatest(SAVE_PROFILE_ACTION, saveUserProfileSaga),
  ];
}

export function* fetchUserProfile({ payload }) {
  const { userId } = payload;
  try {
    const userProfile = yield call(getUserProfile, userId);
    yield put(setUserProfileAction(userProfile));
  } catch (e) {
    console.log(e);
  }
}

export function* saveUserProfileSaga(action) {
  const { payload, actions } = action;
  try {
    yield call(saveUserProfile, payload);
    yield put({
      type: PROFILE_INFO_FETCH_ACTION,
      payload: {
        userId: payload.profileOf.id,
      },
    });
    actions.setSubmitting(false);
  } catch (e) {
    console.log(e);
  }
}
 */