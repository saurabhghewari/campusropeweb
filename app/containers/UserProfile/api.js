import { USER_PROFILE_URL } from '../../constants/urlconstants';
import { getAxiosInstance } from '../../setup_axios';

/*eslint-disable*/
export function getUserProfile(userId) {
    const URL_WITH_QUERY = `${USER_PROFILE_URL}/${userId}`;
    return getAxiosInstance()
      .get(URL_WITH_QUERY)
      .then(res => res.data);
}
