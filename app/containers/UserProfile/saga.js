import { takeLatest, call, put, select } from 'redux-saga/effects';
import { PROFILE_INFO_FETCH_ACTION, SAVE_PROFILE_ACTION } from './constants';
import { setUserProfileAction } from './actions';
import { getUserProfile, saveUserProfile } from './api';

// Individual exports for testing
export default function* defaultSaga() {
  yield [
    takeLatest(PROFILE_INFO_FETCH_ACTION, fetchUserProfile),
    takeLatest(SAVE_PROFILE_ACTION, saveUserProfileSaga)
  ];
}

export function* fetchUserProfile({ payload }) {
  let { userId } = payload;
  try{
    const userProfile = yield call(getUserProfile, userId);
    yield put(setUserProfileAction(userProfile));
  } catch(e){

  }
}

export function* saveUserProfileSaga(action) {
  let { payload } = action;
  try{
    const userProfile = yield call(saveUserProfile, payload);
    yield put({ type: PROFILE_INFO_FETCH_ACTION });
  } catch(e){
    
  }
}

export function* saveAdminTaskToDB() {
  const { tasks, selectedUser } = yield select(selectAdminTaskDomain);
  yield call(saveAdminTasksApi, { tasks, selectedUser });
}
