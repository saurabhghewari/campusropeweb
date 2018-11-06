import { takeLatest, call, put } from 'redux-saga/effects';
import { replace } from 'react-router-redux';
import { createNewTrendingNewsApi } from './api';
import { SUBMIT_NEW_TRENDING_NEWS } from './constants';

export function* submitNewTrendingNewsDetails({ values, actions }) {
  const { resetForm, setSubmitting } = actions;
  try {
    yield call(createNewTrendingNewsApi, values);
    yield call(resetForm);
    yield put(replace('/app/news/trends'));
  } catch (e) {
    yield call(setSubmitting, false);
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield [takeLatest(SUBMIT_NEW_TRENDING_NEWS, submitNewTrendingNewsDetails)];
}
