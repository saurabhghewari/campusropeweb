import axios from 'axios';
import { USER_URL } from '../../constants/urlconstants';
import { getAxiosInstance } from '../../setup_axios';

export const searchUser = term => {
  const SEARCH_URL = USER_URL + '/search_user';
  return getAxiosInstance()
    .post(SEARCH_URL, { term })
    .then(res => res.data);
};
