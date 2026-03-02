import { apiClient } from "@/config/apiClient";
import { endpoints } from "@/constants/endpoints";
import type { ApiResponseEnvelope } from "@/types/resource";
import type { AboutResponse, TermsResponse, PrivacyResponse } from "./user-settings.types";

/* ---- Get About Information ---- */
export const getAboutInformation = async (): Promise<AboutResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AboutResponse>>(endpoints.settingsUser.getAbout);
  return response.data;
};

/* ---- Get Terms & Conditions ---- */
export const getTermsAndConditions = async (): Promise<TermsResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<TermsResponse>>(endpoints.settingsUser.getTerms);
  return response.data;
};

/* ---- Get Privacy Policy ---- */
export const getPrivacyPolicy = async (): Promise<PrivacyResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<PrivacyResponse>>(endpoints.settingsUser.getPrivacy);
  return response.data;
};
