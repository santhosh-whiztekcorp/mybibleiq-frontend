import { User } from "@/resources/auth";
import { getValue, setValue, removeValue } from "./storage.utils";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_INFO_KEY } from "./storage.constants";

export const storageService = {
  /* ---- Access Token ---- */
  saveAccessToken: async (token: string): Promise<void> => setValue(ACCESS_TOKEN_KEY, token),
  getAccessToken: async (): Promise<string | null> => getValue(ACCESS_TOKEN_KEY),
  removeAccessToken: async (): Promise<void> => removeValue(ACCESS_TOKEN_KEY),

  /* ---- Refresh Token ---- */
  saveRefreshToken: async (token: string): Promise<void> => setValue(REFRESH_TOKEN_KEY, token),
  getRefreshToken: async (): Promise<string | null> => getValue(REFRESH_TOKEN_KEY),
  removeRefreshToken: async (): Promise<void> => removeValue(REFRESH_TOKEN_KEY),

  /* ---- User Info ---- */
  saveUserInfo: async (userInfo: User): Promise<void> => setValue(USER_INFO_KEY, JSON.stringify(userInfo)),
  getUserInfo: async (): Promise<User | null> => {
    const value = await getValue(USER_INFO_KEY);
    return value ? JSON.parse(value) : null;
  },
  removeUserInfo: async (): Promise<void> => removeValue(USER_INFO_KEY),
};
