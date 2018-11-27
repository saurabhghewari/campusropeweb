import { put, select, takeLatest } from 'redux-saga/effects';
import { selectLoggedUserDomain } from '../../store/loggeduser/selectors';
import { FETCH_MY_ADMIN_TASKS } from './constants';
import { setMyAdminTasks } from './actions';
import { adminTasksService } from '../../feathers';
/*eslint-disable*/
export function* fetchMyAdminTask() {
  const { user } = yield select(selectLoggedUserDomain);
  if (user) {
    const adminTaskModel = yield adminTasksService.findOne({
      query: { userId: user._id },
    });
    yield put(setMyAdminTasks(adminTaskModel.tasks));
  }
}

export default function* defaultSaga() {
  yield [takeLatest(FETCH_MY_ADMIN_TASKS, fetchMyAdminTask)];
}
