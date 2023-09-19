import axios from 'axios';
import {BASE_URL_API} from '../configs/apiFireBase';

const axiosCreate = axios.create({
  baseURL: BASE_URL_API,
  // You can add your headers here
});

axiosCreate
  .request({
    baseURL: BASE_URL_API,
    // You can add your headers here
  })
  .catch(function (error) {
    if (!error.response) {
      // network error
      // console.error('network error');
      // console.error(error);
    } else {
      // console.error('Error status');
      // console.error(error.response.status);
      // http status code
      const code = error.response.status;
      // response data
      const response = error.response.data;
    }
  });

axiosCreate.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    // console.error('network error');
    // console.error(error);
    return Promise.reject(error.message);
  },
);
axiosCreate.interceptors.request.use(request => {
  // console.log(request);
  return request;
});

export default axiosCreate;
