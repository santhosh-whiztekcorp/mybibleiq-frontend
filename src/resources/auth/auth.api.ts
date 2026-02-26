import { apiClient } from "@/config/apiClient";
import { endpoints } from "@/constants/endpoints";
import { ApiResponseEnvelope } from "@/types/resource";
import { storageService } from "@/services/storageService";
import {
  AuthLoginInput,
  AuthLoginResponse,
  AuthLoginRawResponse,
  AuthRegisterInput,
  AuthRegisterResponse,
  AuthRegisterRawResponse,
  CheckUsernameResponse,
  OAuthFinalizeInput,
  OAuthFinalizeResponse,
  OAuthFinalizeRawResponse,
  OAuthInitiateResponse,
} from "./auth.types";

/* ---- Check Username ---- */
export const checkUsername = async (username: string): Promise<CheckUsernameResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<CheckUsernameResponse>>(
    endpoints.users.getUsernameAvailability,
    { params: { username } }
  );
  return response.data;
};

/* ---- Login ---- */
export const loginUser = async (input: AuthLoginInput): Promise<AuthLoginResponse> => {
  const response = await apiClient.post<ApiResponseEnvelope<AuthLoginRawResponse>>(endpoints.auth.login, input);

  // Extract data from envelope
  const responseData = response.data;

  // Handle nested tokens structure: data.tokens.accessToken and data.tokens.refreshToken
  if (responseData && typeof responseData === "object" && "tokens" in responseData) {
    const { user, tokens } = responseData;
    return {
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  // Fallback to direct structure (if tokens are at top level)
  return responseData as AuthLoginResponse;
};

/* ---- Logout ---- */
export const logoutUser = async (): Promise<void> => {
  const refreshToken = await storageService.getRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token available for logout");
  }
  await apiClient.post(
    endpoints.auth.logout,
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );
};

/* ---- OAuth ---- */
export const initiateOAuth = async (provider: string): Promise<OAuthInitiateResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<OAuthInitiateResponse>>(endpoints.oauth.initiate(provider));
  return response.data;
};

export const finalizeOAuth = async (input: OAuthFinalizeInput): Promise<OAuthFinalizeResponse> => {
  const response = await apiClient.post<ApiResponseEnvelope<OAuthFinalizeRawResponse>>(endpoints.oauth.finalize, input);

  // Extract data from envelope
  const responseData = response.data;

  // Handle nested tokens structure: data.tokens.accessToken and data.tokens.refreshToken
  if (responseData && typeof responseData === "object" && "tokens" in responseData) {
    const { user, tokens } = responseData;
    return {
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  // Fallback to direct structure (if tokens are at top level)
  return responseData as OAuthFinalizeResponse;
};

/* ---- Register ---- */
export const registerUser = async (input: AuthRegisterInput): Promise<AuthRegisterResponse> => {
  const response = await apiClient.post<ApiResponseEnvelope<AuthRegisterRawResponse>>(endpoints.auth.register, input);

  // Extract data from envelope
  const responseData = response.data;

  // Handle nested tokens structure: data.tokens.accessToken and data.tokens.refreshToken
  if (responseData && typeof responseData === "object" && "tokens" in responseData) {
    const { user, tokens } = responseData;
    return {
      user,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  // Fallback to direct structure (if tokens are at top level)
  return responseData as AuthRegisterResponse;
};

/* ---- Register Device Token ---- */
export const registerDeviceToken = async (
  payload: {
    deviceToken: string;
    deviceType: string;
    deviceId: string;
    appVersion: string;
  },
  accessToken: string
): Promise<ApiResponseEnvelope<unknown>> => {
  const response = await apiClient.post<ApiResponseEnvelope<unknown>>(endpoints.users.deviceTokens, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data as ApiResponseEnvelope<unknown>;
};
