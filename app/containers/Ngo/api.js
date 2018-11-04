import { NGOS_URL } from '../../constants/urlconstants';
import { getAxiosInstance } from '../../setup_axios';

export function createNewNgoApi(newNgoDetails) {
  const URL_WITH_QUERY = `${NGOS_URL}`;
  return getAxiosInstance()
    .post(URL_WITH_QUERY, newNgoDetails)
    .then(res => res.data);
}

export function fetchNgosApi() {
  const URL_WITH_QUERY = `${NGOS_URL}`;
  return getAxiosInstance()
    .get(URL_WITH_QUERY)
    .then(res => res.data.rows);
}

export function fetchNgoByIdApi(ngoId) {
  const URL_WITH_QUERY = `${NGOS_URL}/${ngoId}`;
  return getAxiosInstance()
    .get(URL_WITH_QUERY)
    .then(res => res.data);
}

export function updateNgoApi(ngo) {
  const URL_WITH_QUERY = `${NGOS_URL}/${ngo.id}`;
  return getAxiosInstance()
    .put(URL_WITH_QUERY, ngo)
    .then(res => res.data);
}
