import { call, put, select, takeLatest } from 'redux-saga/effects';
import { selectLoggedUserDomain } from '../../store/loggeduser/selectors';
import { FETCH_MY_ADMIN_TASKS } from './constants';
import { setMyAdminTasks } from './actions';
import { getAdminTasksForUser } from '../AssignAdminTask/api';

export function* fetchMyAdminTask() {
  const { user } = yield select(selectLoggedUserDomain);
  if (user) {
    const adminTasks = yield call(getAdminTasksForUser, user.id);
    yield put(setMyAdminTasks(adminTasks));
  }
}

export default function* defaultSaga() {
  yield [takeLatest(FETCH_MY_ADMIN_TASKS, fetchMyAdminTask)];
}
