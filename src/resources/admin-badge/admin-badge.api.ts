import { apiClient } from "@/config/apiClient";
import { endpoints } from "@/constants/endpoints";
import { ApiResponseEnvelope } from "@/types/resource";
import type {
  AdminBadgeListInput,
  AdminBadgeListResponse,
  AdminBadgeDetail,
  CreateAdminBadgeInput,
  UpdateAdminBadgeInput,
  UpdateAdminBadgeStatusInput,
  UpdateAdminBadgeStatusResponse,
  AdminBadgeStatusStatsResponse,
} from "./admin-badge.types";

/* ---- List Badges ---- */
export const getAdminBadgeList = async (input: AdminBadgeListInput): Promise<AdminBadgeListResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminBadgeListResponse>>(endpoints.badgesAdmin.getAll, {
    params: input,
  });

  // Handle both wrapped and unwrapped responses
  if (response && "data" in response && response.data) {
    return response.data;
  }

  // If response is already the list response (not wrapped)
  if (response && "items" in response) {
    return response as unknown as AdminBadgeListResponse;
  }

  throw new Error("Unexpected API response structure");
};

/* ---- Get Badge Detail ---- */
export const getAdminBadgeDetail = async (id: string): Promise<AdminBadgeDetail> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminBadgeDetail>>(endpoints.badgesAdmin.getById(id));

  // Handle both wrapped and unwrapped responses
  if (response && "data" in response && response.data) {
    return response.data;
  }

  // If response is already the detail (not wrapped)
  if (response && "id" in response) {
    return response as unknown as AdminBadgeDetail;
  }

  throw new Error("Unexpected API response structure");
};

/* ---- Create Badge ---- */
export const createAdminBadge = async (input: CreateAdminBadgeInput): Promise<AdminBadgeDetail> => {
  const response = await apiClient.post<ApiResponseEnvelope<AdminBadgeDetail>>(endpoints.badgesAdmin.create, input);

  // Handle both wrapped and unwrapped (direct) responses
  if (response && "data" in response && response.data) {
    return response.data;
  }
  return response as unknown as AdminBadgeDetail;
};

/* ---- Update Badge ---- */
export const updateAdminBadge = async (id: string, input: UpdateAdminBadgeInput): Promise<AdminBadgeDetail> => {
  const response = await apiClient.put<ApiResponseEnvelope<AdminBadgeDetail>>(
    endpoints.badgesAdmin.updateById(id),
    input
  );

  // Handle both wrapped and unwrapped (direct) responses
  if (response && "data" in response && response.data) {
    return response.data;
  }
  return response as unknown as AdminBadgeDetail;
};

/* ---- Update Badge Status ---- */
export const updateAdminBadgeStatus = async (
  id: string,
  input: UpdateAdminBadgeStatusInput
): Promise<UpdateAdminBadgeStatusResponse> => {
  const response = await apiClient.patch<ApiResponseEnvelope<UpdateAdminBadgeStatusResponse>>(
    endpoints.badgesAdmin.changeStatusById(id),
    input
  );

  // Handle both wrapped and unwrapped (direct) responses
  if (response && "data" in response && response.data) {
    return response.data;
  }
  return response as unknown as UpdateAdminBadgeStatusResponse;
};

/* ---- Delete Badge ---- */
export const deleteAdminBadge = async (id: string): Promise<void> => {
  await apiClient.delete(endpoints.badgesAdmin.deleteById(id));
};

/* ---- Get Badge Status Stats ---- */
export const getAdminBadgeStatusStats = async (): Promise<AdminBadgeStatusStatsResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminBadgeStatusStatsResponse>>(
    endpoints.badgesAdmin.getStats
  );

  if (response && "data" in response && response.data) {
    return response.data;
  }
  return response as unknown as AdminBadgeStatusStatsResponse;
};
