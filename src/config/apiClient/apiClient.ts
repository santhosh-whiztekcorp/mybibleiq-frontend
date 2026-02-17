import type { AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { AxiosHeaders } from "axios";
import { axiosInstance, refreshAccessToken } from "./apiClient.utils";
import {
  ENABLE_API_CLIENT_DEBUG,
  REFRESH_ENDPOINT,
  LOGOUT_ENDPOINT,
  AUTH_ENDPOINTS_FOR_RESPONSE,
} from "./apiClient.constants";
import { storageService } from "@/services/storageService/storageService";

/* ---------------- Logging ---------------- */
const timings = new Map<string, number>();

const logKey = (method?: string, url?: string) => `[API] ${method?.toUpperCase()} ${url}`;

const logRequest = (config: InternalAxiosRequestConfig) => {
  if (!ENABLE_API_CLIENT_DEBUG) return;

  const key = logKey(config.method, config.url);
  timings.set(key, Date.now());

  console.groupCollapsed(key);
  console.log("➡️ Request", {
    params: config.params,
    data: config.data,
  });
};

const logResponse = (response: AxiosResponse) => {
  if (!ENABLE_API_CLIENT_DEBUG) return;

  const key = logKey(response.config.method, response.config.url);
  const start = timings.get(key);

  console.log("✅ Response", {
    status: response.status,
    data: response.data,
  });

  if (start) console.log(`⏱ ${Date.now() - start} ms`);
  console.groupEnd();
};

const logError = (error: AxiosError) => {
  if (!ENABLE_API_CLIENT_DEBUG) return;

  const key = logKey(error.config?.method, error.config?.url);
  const start = timings.get(key);

  console.error("❌ Error", {
    status: error.response?.status,
    data: error.response?.data,
  });

  if (start) console.log(`⏱ ${Date.now() - start} ms`);
  console.groupEnd();
};

/* ---------------- Request Interceptor ---------------- */
axiosInstance.interceptors.request.use(async (config) => {
  logRequest(config);

  const isAuthEndpoint = config.url?.includes(REFRESH_ENDPOINT) || config.url?.includes(LOGOUT_ENDPOINT);

  const hasAuthHeader = config.headers?.Authorization || config.headers?.authorization;

  if (!isAuthEndpoint && !hasAuthHeader) {
    const token = await storageService.getAccessToken();
    if (token) {
      config.headers = new AxiosHeaders(config.headers);
      config.headers.set("Authorization", `Bearer ${token}`);
    }
  }

  return config;
});

/* ---------------- Response Interceptor ---------------- */
axiosInstance.interceptors.response.use(
  (response) => {
    logResponse(response);
    return response;
  },
  async (error) => {
    logError(error);

    const originalRequest = error.config;
    const status = error.response?.status;

    if (!originalRequest) throw error;

    const isAuthEndpoint = AUTH_ENDPOINTS_FOR_RESPONSE.some((endpoint) => originalRequest.url?.includes(endpoint));

    if (status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true;
      const newToken = await refreshAccessToken();
      console.log("interceptors.response: newToken", newToken);
      console.log("interceptors.response: after refreshAccessToken");
      originalRequest.headers = new AxiosHeaders(originalRequest.headers);
      originalRequest.headers.set("Authorization", `Bearer ${newToken}`);

      return axiosInstance(originalRequest);
    }

    throw error;
  }
);

/* ---------------- Thin API Wrapper ---------------- */
export const apiClient = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    (await axiosInstance.get<T>(url, config)).data,

  post: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    (await axiosInstance.post<T>(url, data, config)).data,

  put: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    (await axiosInstance.put<T>(url, data, config)).data,

  patch: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> =>
    (await axiosInstance.patch<T>(url, data, config)).data,

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    (await axiosInstance.delete<T>(url, config)).data,
};
