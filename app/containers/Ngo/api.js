import { NGOS_URL } from '../../constants/urlconstants';
import { getAxiosInstance } from '../../setup_axios';

export function createNewNgoApi(newNgoDetails) {
  const URL_WITH_QUERY = `${NGOS_URL}`;
  return getAxiosInstance()
    .post(URL_WITH_QUERY, newNgoDetails)
    .then(res => res.data);
}
