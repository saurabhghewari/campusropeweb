import { USER_URL } from '../../constants/urlconstants';
import { getAxiosInstance } from '../../setup_axios';

export function fetchLoggedUserApi() {
  const URL_WITH_QUERY = `${USER_URL}/me`;
  return getAxiosInstance()
    .get(URL_WITH_QUERY)
    .then(res => res.data);
}
