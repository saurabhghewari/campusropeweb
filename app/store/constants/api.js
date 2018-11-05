import { CONSTANTS_URL } from '../../constants/urlconstants';
import { getAxiosInstance } from '../../setup_axios';

export function fetchConstantsApi() {
  const URL_WITH_QUERY = `${CONSTANTS_URL}/all`;
  return getAxiosInstance()
    .get(URL_WITH_QUERY)
    .then(res => res.data);
}
