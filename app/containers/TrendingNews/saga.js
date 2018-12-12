import { takeLatest, call, put } from 'redux-saga/effects';
import { replace } from 'react-router-redux';
import {
  SUBMIT_NEW_TRENDING_NEWS,
  FETCH_TRENDING_NEWS,
  FETCH_TRENDING_NEWS_BY_ID,
} from './constants';
import { setTrendingNews, setSelectedTrendingNewsInView } from './actions';
import featherClient, { trendingNewsService } from './../../feathers';
import { startFetchingData, stopFetchingData } from '../Home/actions';

export function* submitNewTrendingNewsDetails({ values, actions }) {
  const { resetForm, setSubmitting } = actions;
  try {
    yield put(startFetchingData());
    yield featherClient.authenticate();
    yield trendingNewsService.create(values);
    yield call(resetForm);
    yield put(replace('/news/trends/admin/trends'));
    yield put(stopFetchingData());
  } catch (e) {
    yield put(stopFetchingData());
    yield call(setSubmitting, false);
  }
}

export function* fetchTrendingNewsSaga({ state }) {
  try {
    yield put(startFetchingData());
    yield featherClient.authenticate();
    let query = {};
    if (state !== 'all') {
      query = {
        state: state,
      };
    }
    const trendingNews = yield trendingNewsService.find({ query });
    yield put(setTrendingNews(trendingNews.data));
    yield put(stopFetchingData());
  } catch (e) {
    yield put(stopFetchingData());
    console.error(e);
  }
}

export function* fetchTrendingNewsByIdSaga({ trendingNewsId }) {
  try {
    yield put(startFetchingData());
    yield featherClient.authenticate();
    const selectedTrendingNews = yield trendingNewsService.get(trendingNewsId);
    yield put(setSelectedTrendingNewsInView(selectedTrendingNews));
    yield put(stopFetchingData());
  } catch (e) {
    yield put(stopFetchingData());
    console.error(e);
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield [
    takeLatest(SUBMIT_NEW_TRENDING_NEWS, submitNewTrendingNewsDetails),
    takeLatest(FETCH_TRENDING_NEWS, fetchTrendingNewsSaga),
    takeLatest(FETCH_TRENDING_NEWS_BY_ID, fetchTrendingNewsByIdSaga),
  ];
}
