import * as Axios from 'axios';

const axios = Axios.default.create({});
axios.interceptors.request.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
)

export default axios;