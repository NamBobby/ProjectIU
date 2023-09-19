import axios from "axios";
import { BASE_URL_API_DEV } from "@configs/api";

const axiosCreate = axios.create({
  baseURL: BASE_URL_API_DEV,
});

// axiosCreate
//   .request({
//     baseURL: BASE_URL_API
//     // You can add your headers here
//   })
//   .catch(function (error) {
//     if (!error.response) {
//       // network error
//       // console.error('network error');
//       // console.error(error);
//     } else {
//       // console.error('Error status');
//       // console.error(error.response.status);
//       // http status code
//       const code = error.response.status
//       // response data
//       const response = error.response.data
//       console.log(code, response)
//     }
//   })

axiosCreate.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  }
);
axiosCreate.interceptors.request.use((request) => {
  return request;
});

export default axiosCreate;
