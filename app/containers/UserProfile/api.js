import { USER_PROFILE_URL } from '../../constants/urlconstants';
import { getAxiosInstance } from '../../setup_axios';

export function getUserProfile(userId) {
  const URL_WITH_QUERY = `${USER_PROFILE_URL}/${userId}`;
  return getAxiosInstance()
    .get(URL_WITH_QUERY)
    .then(res => res.data);
}

export function saveUserProfile(payload) {
  const URL_WITH_QUERY = `${USER_PROFILE_URL}`;
  return getAxiosInstance()
    .post(URL_WITH_QUERY, {profileOf: payload.userId, ...payload})
    .then(res => res.data);
}