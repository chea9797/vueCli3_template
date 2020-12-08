import axios from "axios";
import fn from "utils/common"

// 创建axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 30 * 1000 // 请求超时时间
});

// request 拦截器
service.interceptors.request.use(
  config => {
    // 这里可以自定义一些config 配置

    const token = fn.getUrlKey("t");

    if (config.method == "post") {
      config.data = {
        ...config.data,
        t: token
      };
    } else if (config.method == "get") {
      config.params = {
        t: token,
        ...config.params
      };
    }

    return config;
  },
  error => {
    //  这里处理一些请求出错的情况

    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  response => {
    // 这里处理一些response 正常放回时的逻辑

    return response.data;
  },
  error => {
    // 这里处理一些response 出错时的逻辑

    return Promise.reject(error);
  }
);

export default service;