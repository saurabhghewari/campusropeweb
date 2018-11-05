import { takeLatest, call, put, select } from 'redux-saga/effects';
import { PROFILE_INFO_FETCH_ACTION } from './constants';
import { setUserProfileAction } from './actions';
import { getUserProfile } from './api';

// Individual exports for testing
export default function* defaultSaga() {
  yield [takeLatest(PROFILE_INFO_FETCH_ACTION, fetchUserProfile)];
}

export function* fetchUserProfile({ userId }) {
  const userProfile = yield call(getUserProfile, userId);
  yield put(setUserProfileAction(userProfile));
}

export function* saveAdminTaskToDB() {
  const { tasks, selectedUser } = yield select(selectAdminTaskDomain);
  yield call(saveAdminTasksApi, { tasks, selectedUser });
}
