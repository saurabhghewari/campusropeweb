import axios from 'axios';
import { AUTH_URL } from '../../constants/urlconstants';

const LOGIN_URL = `${AUTH_URL}/login`;
export const loginApi = (email, password) => {
  const basicAuth = {
    username: email,
    password,
  };
  return axios.post(LOGIN_URL, {}, { auth: basicAuth });
};
