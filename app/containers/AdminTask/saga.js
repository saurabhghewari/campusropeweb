import { takeLatest, call, put } from 'redux-saga/effects';
import { FETCH_ADMIN_TASKS_OF_GIVEN_USER } from './constants';
import { getAdminTasksForUser } from './api';
import { setAdminTasks } from './actions';

export function* fetchAdminTask({ userId }) {
  const adminTasks = yield call(getAdminTasksForUser, userId);
  yield put(setAdminTasks(adminTasks));
}
// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(FETCH_ADMIN_TASKS_OF_GIVEN_USER, fetchAdminTask);
}
