import axios from 'axios';
import { USER_TOKEN } from './constants/local_storage_constants';
import ls from 'local-storage';

const axiosInstance = new axios.create();

export default function setupAxiosWithAuthHeader() {
  axiosInstance.interceptors.request.use(
    function(config) {
      const token = ls.get(USER_TOKEN);
      if (token != null) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    function(err) {
      return Promise.reject(err);
    },
  );
}

export const getAxiosInstance = () => {
  return axiosInstance;
};
