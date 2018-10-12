import { call, put, takeLatest } from 'redux-saga/effects';
import { replace } from 'react-router-redux';
import { SIGNUP_SUBMIT, EMAIL_ALREADY_EXISTS_MESSGE } from './constants';
import { signUpApi } from './api';
import { storeToken } from '../Login/saga';

export function* submitSignupDetails({ values, actions }) {
  const { resetForm, setErrors, setSubmitting } = actions;
  try {
    const response = yield call(signUpApi, values);
    yield call(resetForm);
    yield call(storeToken, response.data.token);
    yield put(replace('/app'));
  } catch (e) {
    if (e.response.status === 409) {
      yield call(setErrors, {
        exists: EMAIL_ALREADY_EXISTS_MESSGE,
      });
    }

    yield call(setSubmitting, false);
  }
}

export default function* defaultSaga() {
  yield takeLatest(SIGNUP_SUBMIT, submitSignupDetails);
}
