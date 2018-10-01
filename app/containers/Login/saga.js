import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import {
  LOGIN_FORM_SUBMIT,
  NON_EXIST_EMAIL_PASSWORD_ERROR_MESSAGE,
} from './constants';
import { loginApi } from './api';

// Function for storing our API token, perhaps in localStorage or Redux state.
function* storeToken(token) {
  yield `${token}`;
}

// Our SUBMIT_LOGIN action passes along the form values as the payload and form actions as
// meta data. This allows us to not only use the values to do whatever API calls and such
// we need, but also to maintain control flow here in our saga.
function* submitLogin({ values, actions }) {
  const { resetForm, setErrors, setSubmitting } = actions;
  try {
    // Connect to our "API" and get an API token for future API calls.
    const response = yield call(loginApi, values.email, values.password);
    console.log(response);
    yield call(storeToken, response);
    // Reset the form just to be clean, then send the user to our home  which "requires" authentication
    yield call(resetForm);
    yield put(push('/app'));
  } catch (e) {
    if (e.status === 401) {
      // If our API throws an error we will leverage Formik's existing error system to pass it along
      // to the view layer, as well as clearing the loading indicator.
      yield call(setErrors, {
        authentication: NON_EXIST_EMAIL_PASSWORD_ERROR_MESSAGE,
      });
    }

    yield call(setSubmitting, false);
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(LOGIN_FORM_SUBMIT, submitLogin);
}
