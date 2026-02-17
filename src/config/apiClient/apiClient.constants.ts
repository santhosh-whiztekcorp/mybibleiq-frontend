import { app } from "@/constants/app";
import { endpoints } from "@/constants/endpoints";

/* ---- Debug Flag ---- */
export const ENABLE_API_CLIENT_DEBUG = false;

/* ---- API Constants ---- */
export const BASE_URL = app.api.baseURL;

export const REFRESH_ENDPOINT = endpoints.auth.refresh;
export const LOGOUT_ENDPOINT = endpoints.auth.logout;

export const AUTH_ENDPOINTS_FOR_RESPONSE = [
  endpoints.auth.login,
  endpoints.auth.register,
  endpoints.auth.refresh,
  endpoints.oauth.finalize,
];
