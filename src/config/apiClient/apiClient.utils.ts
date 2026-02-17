import axios from "axios";
import { BASE_URL, REFRESH_ENDPOINT } from "./apiClient.constants";
import type { RefreshResponse } from "./apiClient.types";
import { storageService } from "@/services/storageService/storageService";
import { ApiResponseEnvelope } from "@/types/resource";
import { navigationService } from "@/services/navigationService";
import { clearAllStorageAndState } from "@/resources/auth/auth.utils";

/* ---------- Axios Instance ---------- */
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
});

/* ---------- Refresh Token Logic ---------- */
let isRefreshing = false;
let queue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null) => {
  queue.forEach((p) => {
    if (error) {
      p.reject(error);
    } else if (token) {
      p.resolve(token);
    }
  });
  queue = [];
};

export const refreshAccessToken = async (): Promise<string> => {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      queue.push({ resolve, reject });
    });
  }

  isRefreshing = true;

  try {
    const refreshToken = await storageService.getRefreshToken();
    if (!refreshToken) throw new Error("Missing refresh token");

    const res = await axiosInstance.post<ApiResponseEnvelope<RefreshResponse>>(
      REFRESH_ENDPOINT,
      {},
      {
        headers: { Authorization: `Bearer ${refreshToken}` },
      }
    );

    const { accessToken, refreshToken: newRefreshToken } = res.data.data;

    await storageService.saveAccessToken(accessToken);
    await storageService.saveRefreshToken(newRefreshToken);

    processQueue(null, accessToken);
    return accessToken;
  } catch (error) {
    processQueue(error, null);

    await clearAllStorageAndState();

    if (navigationService.isReady()) {
      navigationService.resetToAuth();
    }

    throw error;
  } finally {
    isRefreshing = false;
  }
};
