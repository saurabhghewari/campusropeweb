import { call, put, takeLatest } from 'redux-saga/effects';
import { HOME_MOUNTED } from './constants';
import { fetchConstantsSaga } from '../../store/constants/saga';
import { fetchLoggedUserApi } from '../../store/loggeduser/api';
import { setLoggedUser } from '../../store/loggeduser/actions';

export function* homeMountedSaga() {
  yield call(fetchConstantsSaga);
  const loggedUser = yield call(fetchLoggedUserApi);
  yield put(setLoggedUser(loggedUser));
}
// Individual exports for testing
export default function* defaultSaga() {
  yield [takeLatest(HOME_MOUNTED, homeMountedSaga)];
}
