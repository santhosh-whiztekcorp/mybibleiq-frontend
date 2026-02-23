import { apiClient } from "@/config/apiClient";
import { endpoints } from "@/constants/endpoints";
import { ApiResponseEnvelope } from "@/types/resource";
import type {
  AdminUserListInput,
  AdminUserListResponse,
  AdminUserStatsResponse,
  AdminUserProfileResponse,
  AdminUserActivityResponse,
  AdminUserSettingsResponse,
  AdminUserSpiritFoodResponse,
  AdminUserBadgesListInput,
  AdminUserBadgesListResponse,
  AdminUserFeedbackListInput,
  AdminUserFeedbackListResponse,
  AdminUserSavedVersesListInput,
  AdminUserSavedVersesListResponse,
  AdminUserSuspendInput,
  AdminUserSuspendResponse,
  AdminUserActivateResponse,
  AdminUserDeleteInput,
} from "./admin-user-management.types";

/* ---- List Users ---- */
export const getAdminUserList = async (input: AdminUserListInput): Promise<AdminUserListResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminUserListResponse>>(
    endpoints.userManagementAdmin.getAll,
    { params: input }
  );
  return response.data;
};

/* ---- Get User Stats ---- */
export const getAdminUserStats = async (): Promise<AdminUserStatsResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminUserStatsResponse>>(
    endpoints.userManagementAdmin.getStats
  );
  return response.data;
};

/* ---- Get User Profile ---- */
export const getAdminUserProfile = async (userId: string): Promise<AdminUserProfileResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminUserProfileResponse>>(
    endpoints.userManagementAdmin.getProfile(userId)
  );
  return response.data;
};

/* ---- Get User Activity ---- */
export const getAdminUserActivity = async (userId: string): Promise<AdminUserActivityResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminUserActivityResponse>>(
    endpoints.userManagementAdmin.getActivity(userId)
  );
  return response.data;
};

/* ---- Get User Settings ---- */
export const getAdminUserSettings = async (userId: string): Promise<AdminUserSettingsResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminUserSettingsResponse>>(
    endpoints.userManagementAdmin.getSettings(userId)
  );
  return response.data;
};

/* ---- Get User Spirit Food ---- */
export const getAdminUserSpiritFood = async (userId: string): Promise<AdminUserSpiritFoodResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminUserSpiritFoodResponse>>(
    endpoints.userManagementAdmin.getSpiritFood(userId)
  );
  return response.data;
};

/* ---- Get User Badges ---- */
export const getAdminUserBadges = async (
  userId: string,
  input: AdminUserBadgesListInput
): Promise<AdminUserBadgesListResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminUserBadgesListResponse>>(
    endpoints.userManagementAdmin.getBadges(userId),
    { params: input }
  );
  return response.data;
};

/* ---- Get User Feedback ---- */
export const getAdminUserFeedback = async (
  userId: string,
  input: AdminUserFeedbackListInput
): Promise<AdminUserFeedbackListResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminUserFeedbackListResponse>>(
    endpoints.userManagementAdmin.getFeedback(userId),
    { params: input }
  );
  return response.data;
};

/* ---- Get User Saved Verses ---- */
export const getAdminUserSavedVerses = async (
  userId: string,
  input: AdminUserSavedVersesListInput
): Promise<AdminUserSavedVersesListResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminUserSavedVersesListResponse>>(
    endpoints.userManagementAdmin.getSavedVerses(userId),
    { params: input }
  );
  return response.data;
};

/* ---- Suspend User ---- */
export const suspendAdminUser = async (
  userId: string,
  input: AdminUserSuspendInput
): Promise<AdminUserSuspendResponse> => {
  const response = await apiClient.patch<ApiResponseEnvelope<AdminUserSuspendResponse>>(
    endpoints.userManagementAdmin.suspend(userId),
    input
  );
  return response.data;
};

/* ---- Activate User ---- */
export const activateAdminUser = async (userId: string): Promise<AdminUserActivateResponse> => {
  const response = await apiClient.patch<ApiResponseEnvelope<AdminUserActivateResponse>>(
    endpoints.userManagementAdmin.activate(userId)
  );
  return response.data;
};

/* ---- Delete User ---- */
export const deleteAdminUser = async (
  userId: string,
  input: AdminUserDeleteInput
): Promise<{ deletedUserId: string }> => {
  const response = await apiClient.delete<ApiResponseEnvelope<{ deletedUserId: string }>>(
    endpoints.userManagementAdmin.delete(userId),
    { data: input }
  );
  return response.data;
};
