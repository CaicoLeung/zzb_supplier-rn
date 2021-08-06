import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import qs from "qs";
import baseUrl from "@/config";
import { API } from "@/types/api";
import { Toast } from "@ant-design/react-native";
import { isBlob } from "@/utils";

/*
 * 状态码对应信息
 * */
const codeMessage: Record<number, string> = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
};

// axios.defaults.withCredentials = true;
axios.defaults.timeout = 5000;

const http = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json"
  }
});

const fileService = axios.create({
  timeout: 30000,
  baseURL: baseUrl
});

const requestInterceptors = [
  (config: AxiosRequestConfig) => {
    const token = '29f3cf0060ad59f46dbebad75956ed80';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(config);
    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
];

const responseInterceptors: [(value: AxiosResponse<API.ResponseType>) => Promise<AxiosResponse<API.ResponseType>>, (error: Error) => void] = [
  (response: AxiosResponse<API.ResponseType>) => {
    const { status, data, headers } = response;
    if (headers["content-type"]?.includes("text/html")) {
      Toast.fail('服务器错误');
      return Promise.reject(response);
    }
    if ((status >= 200 && status <= 300) || status === 305) {
      if (isBlob(data)) {
        return Promise.resolve(response);
      }
      if (data) {
        if (data.code === 200) {
          return Promise.resolve(response);
        }
        // 登录过期
        if (data.code === 499 && location.pathname !== "/login") {

        } else {
          Toast.fail(data.msg);
        }
      }
      return Promise.reject(response);
    } else {
      const errortext = codeMessage[status] || response.statusText;
      Toast.offline(errortext);
      return Promise.reject(response);
    }
  },
  (error: Error) => {
    Toast.fail(error.message);
    throw error;
  }
];

http.interceptors.request.use(...requestInterceptors);
fileService.interceptors.request.use(...requestInterceptors);

http.interceptors.response.use(...responseInterceptors);
fileService.interceptors.response.use(...responseInterceptors);

export default {
  get: async <T>(url: string, params?: unknown): Promise<API.ResponseType<T>> => await (await http.get(url, { params })).data,
  download: async <T>(url: string, params?: unknown): Promise<API.ResponseType<T>> => await (await fileService.get(url, { params })).data,
  upload: async <T>(url: string, params: FormData): Promise<API.ResponseType<T>> => await (await fileService.post(url, params)).data,
  post: async <T>(url: string, params: unknown): Promise<API.ResponseType<T>> => await (await http.post(url, params)).data,
  put: async <T>(url: string, params: unknown): Promise<API.ResponseType<T>> => await (await http.put(url, qs.stringify(params))).data,
  patch: async <T>(url: string, params: unknown): Promise<API.ResponseType<T>> => await (await http.patch(url, qs.stringify(params))).data,
  delete: async <T>(url: string): Promise<API.ResponseType<T>> => await (await http.delete(url)).data
};
