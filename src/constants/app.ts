export const app = {
  api: {
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
    timeout: 10000,
  },

  environment: {
    isDev: process.env.NODE_ENV === "development",
    isProd: process.env.NODE_ENV === "production",
  },

  storageKeys: {
    accessToken: process.env.NEXT_PUBLIC_STORAGE_ACCESS_TOKEN || "accessToken",
    refreshToken: process.env.NEXT_PUBLIC_STORAGE_REFRESH_TOKEN || "refreshToken",
    userInfo: process.env.NEXT_PUBLIC_STORAGE_USER_INFO || "userInfo",
  },
};
