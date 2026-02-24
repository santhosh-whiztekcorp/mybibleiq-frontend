import { apiClient } from "@/config/apiClient";
import { endpoints } from "@/constants/endpoints";
import { ApiResponseEnvelope } from "@/types/resource";
import { unwrapApiResponse } from "@/utils/network";
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
  const response = await apiClient.get<ApiResponseEnvelope<AdminBadgeListResponse> | AdminBadgeListResponse>(
    endpoints.badgesAdmin.getAll,
    {
      params: input,
    }
  );

  return unwrapApiResponse(response);
};

/* ---- Get Badge Detail ---- */
export const getAdminBadgeDetail = async (id: string): Promise<AdminBadgeDetail> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminBadgeDetail> | AdminBadgeDetail>(
    endpoints.badgesAdmin.getById(id)
  );

  return unwrapApiResponse(response);
};

/* ---- Create Badge ---- */
export const createAdminBadge = async (input: CreateAdminBadgeInput): Promise<AdminBadgeDetail> => {
  const response = await apiClient.post<ApiResponseEnvelope<AdminBadgeDetail> | AdminBadgeDetail>(
    endpoints.badgesAdmin.create,
    input
  );

  return unwrapApiResponse(response);
};

/* ---- Update Badge ---- */
export const updateAdminBadge = async (id: string, input: UpdateAdminBadgeInput): Promise<AdminBadgeDetail> => {
  const response = await apiClient.put<ApiResponseEnvelope<AdminBadgeDetail> | AdminBadgeDetail>(
    endpoints.badgesAdmin.updateById(id),
    input
  );

  return unwrapApiResponse(response);
};

/* ---- Update Badge Status ---- */
export const updateAdminBadgeStatus = async (
  id: string,
  input: UpdateAdminBadgeStatusInput
): Promise<UpdateAdminBadgeStatusResponse> => {
  const response = await apiClient.patch<
    ApiResponseEnvelope<UpdateAdminBadgeStatusResponse> | UpdateAdminBadgeStatusResponse
  >(endpoints.badgesAdmin.changeStatusById(id), input);

  return unwrapApiResponse(response);
};

/* ---- Delete Badge ---- */
export const deleteAdminBadge = async (id: string): Promise<void> => {
  await apiClient.delete(endpoints.badgesAdmin.deleteById(id));
};

/* ---- Get Badge Status Stats ---- */
export const getAdminBadgeStatusStats = async (): Promise<AdminBadgeStatusStatsResponse> => {
  const response = await apiClient.get<
    ApiResponseEnvelope<AdminBadgeStatusStatsResponse> | AdminBadgeStatusStatsResponse
  >(endpoints.badgesAdmin.getStats);

  return unwrapApiResponse(response);
};
