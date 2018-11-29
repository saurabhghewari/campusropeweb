import { takeLatest, call, put } from 'redux-saga/effects';
import { replace } from 'react-router-redux';
import {
  SUBMIT_NEW_TRENDING_NEWS,
  FETCH_TRENDING_NEWS,
  FETCH_TRENDING_NEWS_BY_ID,
} from './constants';
import { setTrendingNews, setSelectedTrendingNewsInView } from './actions';

export function* submitNewTrendingNewsDetails({ values, actions }) {
  const { resetForm, setSubmitting } = actions;
  try {
    yield call(createNewTrendingNewsApi, values);
    yield call(resetForm);
    yield put(replace('/app/news/trends/admin/trends'));
  } catch (e) {
    yield call(setSubmitting, false);
  }
}

export function* fetchTrendingNewsSaga() {
  const trendingNews = yield call(fetchTrendingNewsApi);
  yield put(setTrendingNews(trendingNews));
}

export function* fetchTrendingNewsByIdSaga({ trendingNewsId }) {
  const selectedTrendingNews = yield call(
    fetchTrendingNewsByIdApi,
    trendingNewsId,
  );
  yield put(setSelectedTrendingNewsInView(selectedTrendingNews));
}

// Individual exports for testing
export default function* defaultSaga() {
  yield [
    takeLatest(SUBMIT_NEW_TRENDING_NEWS, submitNewTrendingNewsDetails),
    takeLatest(FETCH_TRENDING_NEWS, fetchTrendingNewsSaga),
    takeLatest(FETCH_TRENDING_NEWS_BY_ID, fetchTrendingNewsByIdSaga),
  ];
}
