import { TRENDING_NEWS_URL } from '../../constants/urlconstants';
import { getAxiosInstance } from '../../setup_axios';

export function createNewTrendingNewsApi(newTrendingNewsDetails) {
  const URL_WITH_QUERY = `${TRENDING_NEWS_URL}`;
  return getAxiosInstance()
    .post(URL_WITH_QUERY, newTrendingNewsDetails)
    .then(res => res.data);
}

export function fetchTrendingNewsApi() {
  const URL_WITH_QUERY = `${TRENDING_NEWS_URL}`;
  return getAxiosInstance()
    .get(URL_WITH_QUERY)
    .then(res => res.data.rows);
}
