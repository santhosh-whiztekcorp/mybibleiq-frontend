import { apiClient } from "@/config/apiClient";
import { endpoints } from "@/constants/endpoints";
import { ApiResponseEnvelope } from "@/types/resource";
import { unwrapApiResponse } from "@/utils/network";
import type {
  AdminGroupStats,
  AdminGroupListInput,
  AdminGroupListResponse,
  AdminGroupDetail,
  AdminGroupReportsListInput,
  AdminGroupReportsListResponse,
  AdminGroupAnnouncementsListInput,
  AdminGroupAnnouncementsListResponse,
  AdminGroupAnnouncement,
  AdminGroupAnnouncementReportsListInput,
  AdminGroupAnnouncementReportsListResponse,
  AdminGroupActivityLogListInput,
  AdminGroupActivityLogListResponse,
  AdminGroupMembersListInput,
  AdminGroupMembersListResponse,
  AdminGroupMember,
  AdminGroupAssignmentsListInput,
  AdminGroupAssignmentsListResponse,
  AdminGroupLeaderboardListInput,
  AdminGroupLeaderboardListResponse,
  AdminGroupWarnLeaderInput,
  AdminGroupBanInput,
  AdminGroupUnbanInput,
  AdminGroupUpdateSettingsInput,
  AdminGroupChangeRoleInput,
  AdminGroupActionResponse,
} from "./admin-group-management.types";

/* ---- List Groups ---- */
export const getAdminGroupList = async (input: AdminGroupListInput): Promise<AdminGroupListResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminGroupListResponse>>(
    endpoints.groupManagementAdmin.getAll,
    { params: input }
  );
  return unwrapApiResponse(response);
};

/* ---- Get Group Stats ---- */
export const getAdminGroupStats = async (): Promise<AdminGroupStats> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminGroupStats>>(endpoints.groupManagementAdmin.getStats);
  return unwrapApiResponse(response);
};

/* ---- Get Group Detail ---- */
export const getAdminGroupDetail = async (groupId: string): Promise<AdminGroupDetail> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminGroupDetail>>(
    endpoints.groupManagementAdmin.getById(groupId)
  );
  return unwrapApiResponse(response);
};

/* ---- List Reports ---- */
export const getAdminGroupReports = async (
  groupId: string,
  input: AdminGroupReportsListInput
): Promise<AdminGroupReportsListResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminGroupReportsListResponse>>(
    endpoints.groupManagementAdmin.getReports(groupId),
    { params: input }
  );
  return unwrapApiResponse(response);
};

/* ---- List Announcements ---- */
export const getAdminGroupAnnouncements = async (
  groupId: string,
  input: AdminGroupAnnouncementsListInput
): Promise<AdminGroupAnnouncementsListResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminGroupAnnouncementsListResponse>>(
    endpoints.groupManagementAdmin.getAnnouncements(groupId),
    { params: input }
  );
  return unwrapApiResponse(response);
};

/* ---- Get Announcement Detail ---- */
export const getAdminGroupAnnouncementDetail = async (
  groupId: string,
  announcementId: string
): Promise<AdminGroupAnnouncement> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminGroupAnnouncement>>(
    endpoints.groupManagementAdmin.getAnnouncementById(groupId, announcementId)
  );
  return unwrapApiResponse(response);
};

/* ---- Get Announcement Reports ---- */
export const getAdminGroupAnnouncementReports = async (
  groupId: string,
  announcementId: string,
  input: AdminGroupAnnouncementReportsListInput
): Promise<AdminGroupAnnouncementReportsListResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminGroupAnnouncementReportsListResponse>>(
    endpoints.groupManagementAdmin.getAnnouncementReports(groupId, announcementId),
    { params: input }
  );
  return unwrapApiResponse(response);
};

/* ---- List Activity Log ---- */
export const getAdminGroupActivityLog = async (
  groupId: string,
  input: AdminGroupActivityLogListInput
): Promise<AdminGroupActivityLogListResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminGroupActivityLogListResponse>>(
    endpoints.groupManagementAdmin.getActivityLog(groupId),
    { params: input }
  );
  return unwrapApiResponse(response);
};

/* ---- List Members ---- */
export const getAdminGroupMembers = async (
  groupId: string,
  input: AdminGroupMembersListInput
): Promise<AdminGroupMembersListResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminGroupMembersListResponse>>(
    endpoints.groupManagementAdmin.getMembers(groupId),
    { params: input }
  );
  return unwrapApiResponse(response);
};

/* ---- Get Member Detail ---- */
export const getAdminGroupMemberDetail = async (groupId: string, memberId: string): Promise<AdminGroupMember> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminGroupMember>>(
    endpoints.groupManagementAdmin.getMemberById(groupId, memberId)
  );
  return unwrapApiResponse(response);
};

/* ---- List Assignments ---- */
export const getAdminGroupAssignments = async (
  groupId: string,
  input: AdminGroupAssignmentsListInput
): Promise<AdminGroupAssignmentsListResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminGroupAssignmentsListResponse>>(
    endpoints.groupManagementAdmin.getAssignments(groupId),
    { params: input }
  );
  return unwrapApiResponse(response);
};

/* ---- List Leaderboard ---- */
export const getAdminGroupLeaderboard = async (
  groupId: string,
  input: AdminGroupLeaderboardListInput
): Promise<AdminGroupLeaderboardListResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminGroupLeaderboardListResponse>>(
    endpoints.groupManagementAdmin.getLeaderboard(groupId),
    { params: input }
  );
  return unwrapApiResponse(response);
};

/* ---- Actions ---- */

export const warnLeader = async (
  groupId: string,
  input: AdminGroupWarnLeaderInput
): Promise<AdminGroupActionResponse> => {
  const response = await apiClient.post<ApiResponseEnvelope<AdminGroupActionResponse>>(
    endpoints.groupManagementAdmin.warnLeader(groupId),
    input
  );
  return unwrapApiResponse(response);
};

export const dismissReport = async (groupId: string, reportId: string): Promise<AdminGroupActionResponse> => {
  const response = await apiClient.post<ApiResponseEnvelope<AdminGroupActionResponse>>(
    endpoints.groupManagementAdmin.dismissReport(groupId, reportId)
  );
  return unwrapApiResponse(response);
};

export const rejectAnnouncement = async (
  groupId: string,
  announcementId: string
): Promise<AdminGroupActionResponse> => {
  const response = await apiClient.post<ApiResponseEnvelope<AdminGroupActionResponse>>(
    endpoints.groupManagementAdmin.rejectAnnouncement(groupId, announcementId)
  );
  return unwrapApiResponse(response);
};

export const exportActivityLog = async (groupId: string, params: AdminGroupActivityLogListInput): Promise<string> => {
  const response = await apiClient.get<string>(endpoints.groupManagementAdmin.exportActivityLog(groupId), {
    params,
    responseType: "text",
  });
  return response as unknown as string;
};

export const removeGroupMember = async (groupId: string, memberId: string): Promise<AdminGroupActionResponse> => {
  const response = await apiClient.delete<ApiResponseEnvelope<AdminGroupActionResponse>>(
    endpoints.groupManagementAdmin.removeMember(groupId, memberId)
  );
  return unwrapApiResponse(response);
};

export const banGroupMember = async (groupId: string, memberId: string): Promise<AdminGroupActionResponse> => {
  const response = await apiClient.delete<ApiResponseEnvelope<AdminGroupActionResponse>>(
    endpoints.groupManagementAdmin.banMember(groupId, memberId)
  );
  return unwrapApiResponse(response);
};

export const banGroup = async (groupId: string, input: AdminGroupBanInput): Promise<AdminGroupActionResponse> => {
  const response = await apiClient.post<ApiResponseEnvelope<AdminGroupActionResponse>>(
    endpoints.groupManagementAdmin.banGroup(groupId),
    input
  );
  return unwrapApiResponse(response);
};

export const unbanGroup = async (groupId: string, input: AdminGroupUnbanInput): Promise<AdminGroupActionResponse> => {
  const response = await apiClient.post<ApiResponseEnvelope<AdminGroupActionResponse>>(
    endpoints.groupManagementAdmin.unbanGroup(groupId),
    input
  );
  return unwrapApiResponse(response);
};

export const deleteGroup = async (groupId: string): Promise<AdminGroupActionResponse> => {
  const response = await apiClient.delete<ApiResponseEnvelope<AdminGroupActionResponse>>(
    endpoints.groupManagementAdmin.deleteGroup(groupId)
  );
  return unwrapApiResponse(response);
};

export const updateGroupSettings = async (
  groupId: string,
  input: AdminGroupUpdateSettingsInput
): Promise<AdminGroupActionResponse> => {
  const response = await apiClient.put<ApiResponseEnvelope<AdminGroupActionResponse>>(
    endpoints.groupManagementAdmin.updateSettings(groupId),
    input
  );
  return unwrapApiResponse(response);
};

export const changeGroupMemberRole = async (
  groupId: string,
  userId: string,
  input: AdminGroupChangeRoleInput
): Promise<AdminGroupActionResponse> => {
  const response = await apiClient.put<ApiResponseEnvelope<AdminGroupActionResponse>>(
    endpoints.groupManagementAdmin.changeRole(groupId, userId),
    input
  );
  return response.data;
};
