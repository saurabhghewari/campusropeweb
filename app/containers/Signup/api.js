import axios from 'axios';
import { USER_URL } from '../../constants/urlconstants';

const SIGNUP_URL = `${USER_URL}/signup`;
export const signUpApi = values => axios.post(SIGNUP_URL, { ...values });
