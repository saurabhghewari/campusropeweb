import axios from 'axios';
import ls from 'local-storage';
import { loadProgressBar } from 'axios-progress-bar';
import 'axios-progress-bar/dist/nprogress.css';
import { USER_TOKEN } from './constants/local_storage_constants';

/*eslint-disable*/
const axiosInstance = new axios.create();
let progressConfigured = false;

export default function setupAxiosWithAuthHeader() {
  if (!progressConfigured) {
    loadProgressBar({}, axiosInstance);
    progressConfigured = true;
  }
  axiosInstance.interceptors.request.use(
    config => {
      const token = ls.get(USER_TOKEN);
      if (token != null) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    err => Promise.reject(err),
  );
}

export const getAxiosInstance = () => axiosInstance;
