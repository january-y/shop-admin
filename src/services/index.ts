import { BASE_URL, TIME_OUT } from "./config";
import AxRequtst from "./request";
const axRequest = new AxRequtst({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSucessFn: (config) => {
      // console.log('axRequest的请求成功拦截')
      return config;
    },
    requestFailureFn: (err) => {
      // console.log('axRequest的请求失败拦截')
      return err;
    },
    responseSucessFn: (res) => {
      // console.log('axRequest的响应成功拦截')
      return res.data;
    },
    responseFailureFn: (err) => {
      // console.log('axRequest的响应失败拦截')
      return err;
    },
  },
});
// 测试拦截不同关系请求
const mockRequest = new AxRequtst({
  timeout: 8000,
  interceptors: {
    requestSucessFn: (config) => {
      // console.log("请求成功拦截");
      return config;
    },
    requestFailureFn: (err) => {
      // console.log("请求失败拦截");
      return err;
    },
    responseSucessFn: (res) => {
      // console.log("响应成功拦截");
      return res;
    },
    responseFailureFn: (err) => {
      // console.log("响应失败拦截");
      return err;
    },
  },
  // headers: {
  //   'content-type': 'application/json',
  // },
});

export { axRequest, mockRequest };
