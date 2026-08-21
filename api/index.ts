import axios from "axios";
import { log } from "console";

//* create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  //   headers: {
  //     "Content-Type": "",
  //   },
});

//interceptor
api.interceptors.request.use(
  function (config) {
    console.log("request intercept", config.url);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// api.interceptors.response.use(
//   function (config) {
//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   },
// );
export default api;
