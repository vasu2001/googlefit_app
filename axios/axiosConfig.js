import axios from 'axios';

export default axios;

export const initAxios = (accessToken) => {
  axios.defaults.baseURL = 'https://www.googleapis.com/';
  axios.defaults.headers = {Authorization: `Bearer ${accessToken}`};
};
