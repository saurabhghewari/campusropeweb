import { call, put, takeLatest } from 'redux-saga/effects';
import { replace } from 'react-router-redux';
import { HOME_MOUNTED, CHANGE_ROUTE } from './constants';
import { fetchConstantsSaga } from '../../store/constants/saga';
import { setLoggedUser } from '../../store/loggeduser/actions';
import feathersClient, { userService } from '../../feathers';
import { startFetchingData, stopFetchingData } from './actions';

export function* homeMountedSaga() {
  yield put(startFetchingData());
  yield call(feathersClient.authenticate);
  yield call(fetchConstantsSaga);
  const payload = yield feathersClient.passport.verifyJWT(
    localStorage.getItem('feathers-jwt'),
  );
  const loggedUser = yield userService.get(payload.userId);
  feathersClient.set('user', loggedUser);
  yield put(setLoggedUser(loggedUser));
  yield put(stopFetchingData());
}

export function* changeRouteSaga({ route, actionToFetchDataForRoute, param }) {
  yield put(startFetchingData());
  yield put(actionToFetchDataForRoute(param));
  yield put(stopFetchingData());
  yield put(replace(route));
}

// Individual exports for testing
export default function* defaultSaga() {
  yield [takeLatest(HOME_MOUNTED, homeMountedSaga)];
  yield [takeLatest(CHANGE_ROUTE, changeRouteSaga)];
}
