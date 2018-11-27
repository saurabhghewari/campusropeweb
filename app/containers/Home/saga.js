import { call, put, takeLatest } from 'redux-saga/effects';
import { HOME_MOUNTED } from './constants';
import { fetchConstantsSaga } from '../../store/constants/saga';
import { setLoggedUser } from '../../store/loggeduser/actions';
import feathersClient, { userService } from '../../feathers';

export function* homeMountedSaga() {
  yield call(feathersClient.authenticate);
  yield call(fetchConstantsSaga);
  const payload = yield feathersClient.passport.verifyJWT(
    localStorage.getItem('feathers-jwt'),
  );
  const loggedUser = yield userService.get(payload.userId);
  feathersClient.set('user', loggedUser);
  yield put(setLoggedUser(loggedUser));
}
// Individual exports for testing
export default function* defaultSaga() {
  yield [takeLatest(HOME_MOUNTED, homeMountedSaga)];
}
