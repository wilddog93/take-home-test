import axios, {
  AxiosDefaults,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import UrlPattern from "url-pattern";

import { ResponseAPI, PaginationAPI } from "./type";
import { ApiError } from "./api-errors";

export interface Result<T> extends PaginationAPI {
  data: T;
  response: ResponseAPI;
  errorData?: Record<string, unknown>;
}

interface ResponseResult {
  data: Record<string, unknown>;
  response?: {
    code?: string;
    description?: string;
  };
}

type SetAuthorizationHeaderParams = {
  request: AxiosDefaults | AxiosRequestConfig;
  token: string;
};

const generateUrlParams = (params = {}, endpoint: string) => {
  return new UrlPattern(endpoint).stringify(params);
};

const catchError = (error: AxiosError) => {
  const { response, config } = error || {};
  const errorCatch = new Error(
    `API ERROR: ${config?.url}, Status: ${response?.status}`,
  );

  // Catch error
  const errorAPI = errorCatch as unknown as ApiError;

  console.log(errorAPI, "error API");

  // Redirect to login page if error is 401
  // if (response?.status === 401) {
  //   localStorage.removeItem('token')
  //   window.location.reload()
  //   return
  // }

  // Return data if response is not null
  if (response) {
    const responseData = response as AxiosResponse<ResponseResult>;

    if (responseData?.data?.response) {
      return {
        data: {
          errorData: {
            ...responseData.data.data,
          },
          response: {
            ...responseData.data.response,
          },
        },
      };
    }
  }

  throw error;
};

const API_URL =
  process.env.NODE_ENV === "development" ? process.env.API_URL : undefined;

export const api = axios.create({
  baseURL: API_URL || "https://reqres.in/api",
  // headers: {
  //   Accept: 'application/json, text/plain, */*',
  //   'Content-Type': 'application/json',
  // },
  // timeout: 180000, // 3 min
});

api.interceptors.response.use((response) => response, catchError);

// CRUD API
export const get = async <T>(
  endpoint: string,
  params: Record<string, unknown> = {},
): Promise<Result<T>> => {
  const response = await api.get<Result<T>>(endpoint, params);

  return response.data;
};

export const post = async <T>(
  endpoint: string,
  data: Record<string, unknown>,
): Promise<Result<T>> => {
  const response = await api.post<Result<T>>(endpoint, data);

  return response.data;
};

export const put = async <T>(
  endpoint: string,
  data: Record<string, unknown>,
): Promise<Result<T>> => {
  const response = await api.put<Result<T>>(endpoint, data);

  return response.data;
};

export const patch = async <T>(
  endpoint: string,
  data: Record<string, unknown>,
): Promise<Result<T>> => {
  const response = await api.patch<Result<T>>(endpoint, data);

  return response.data;
};

export const deleteRequest = async <T>(
  endpoint: string,
  data: Record<string, unknown>,
): Promise<Result<T>> => {
  const response = await api.delete<Result<T>>(endpoint, data);

  return response.data;
};

export const getApiUrl = (
  endpoint: string,
  params: Record<string, unknown>,
) => {
  const url = generateUrlParams(params, endpoint);

  return url;
};

export const getApiUrlWithToken = (
  endpoint: string,
  params: Record<string, unknown>,
) => {
  const url = generateUrlParams(params, endpoint);

  return url;
};

export const getApiUrlWithTokenAndId = (
  endpoint: string,
  params: Record<string, unknown>,
) => {
  const url = generateUrlParams(params, endpoint);

  return url;
};

export const setAuthorizationHeader = (
  params: SetAuthorizationHeaderParams,
) => {
  const { request, token } = params;

  (request.headers as Record<string, unknown>)["Authorization"] =
    `Bearer ${token}`;
};
