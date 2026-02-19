import { apiClient } from "@/config/apiClient";
import { endpoints } from "@/constants/endpoints";
import { ApiResponseEnvelope } from "@/types/resource";
import { USE_MOCK_DATA } from "./admin-group-management.constants";
import {
  MOCK_GROUP_STATS,
  MOCK_GROUPS,
  MOCK_GROUP_DETAILS,
  MOCK_GROUP_REPORTS,
  MOCK_GROUP_ANNOUNCEMENTS,
  MOCK_GROUP_ACTIVITY_LOGS,
  MOCK_GROUP_MEMBERS,
  MOCK_GROUP_ASSIGNMENTS,
  MOCK_GROUP_LEADERBOARD,
} from "./admin-group-management.data";
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

/* ---- Mock API Functions ---- */
const mockDelay = (ms: number = 500) => new Promise<void>((resolve) => setTimeout(() => resolve(), ms));

/* ---- List Groups ---- */
export const getAdminGroupList = async (input: AdminGroupListInput): Promise<AdminGroupListResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    let filtered = [...MOCK_GROUPS];

    // Apply search filter
    if (input.q) {
      const searchQuery = input.q.toLowerCase();
      filtered = filtered.filter(
        (group) =>
          group.name.toLowerCase().includes(searchQuery) || group.leader.name.toLowerCase().includes(searchQuery)
      );
    }

    // Apply status filter
    if (input.status) {
      filtered = filtered.filter((group) => group.status === input.status);
    }

    const page = input.page || 1;
    const pageSize = input.pageSize || 20;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
      items: filtered.slice(start, end),
      total: filtered.length,
      page,
      pageSize,
    };
  }

  const response = await apiClient.get<ApiResponseEnvelope<AdminGroupListResponse>>(
    endpoints.groupManagementAdmin.getAll,
    {
      params: input,
    }
  );
  return response.data;
};

/* ---- Get Group Stats ---- */
export const getAdminGroupStats = async (): Promise<AdminGroupStats> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    return MOCK_GROUP_STATS;
  }

  const response = await apiClient.get<ApiResponseEnvelope<AdminGroupStats>>(endpoints.groupManagementAdmin.getStats);
  return response.data;
};

/* ---- Get Group Detail ---- */
export const getAdminGroupDetail = async (groupId: string): Promise<AdminGroupDetail> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    let detail = MOCK_GROUP_DETAILS[groupId];

    if (!detail) {
      const groupListItem = MOCK_GROUPS.find((g) => g.id === groupId);
      if (groupListItem) {
        detail = {
          id: groupListItem.id,
          name: groupListItem.name,
          description: groupListItem.description,
          iconPath: groupListItem.iconPath,
          memberCount: groupListItem.memberCount,
          activityScore: groupListItem.activityScore,
          createdAt: groupListItem.createdAt,
          type: groupListItem.type,
          privacy: groupListItem.privacy,
          status: groupListItem.status,
          totalQuizzes: groupListItem.totalQuizzes,
          totalQuests: groupListItem.totalQuests,
          reportsCount: groupListItem.reportsCount,
          flaggedAnnouncementsCount: 0,
        };
      }
    }

    if (!detail) throw new Error("Group not found");
    return detail;
  }

  const response = await apiClient.get<ApiResponseEnvelope<AdminGroupDetail>>(
    endpoints.groupManagementAdmin.getById(groupId)
  );
  return response.data;
};

/* ---- List Reports ---- */
export const getAdminGroupReports = async (
  groupId: string,
  input: AdminGroupReportsListInput
): Promise<AdminGroupReportsListResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    const reports = MOCK_GROUP_REPORTS[groupId] || [];
    const page = input.page || 1;
    const pageSize = input.pageSize || 20;
    const start = (page - 1) * pageSize;

    return {
      items: reports.slice(start, start + pageSize),
      total: reports.length,
      page,
      pageSize,
    };
  }

  const response = await apiClient.get<ApiResponseEnvelope<AdminGroupReportsListResponse>>(
    endpoints.groupManagementAdmin.getReports(groupId),
    { params: input }
  );
  return response.data;
};

/* ---- List Announcements ---- */
export const getAdminGroupAnnouncements = async (
  groupId: string,
  input: AdminGroupAnnouncementsListInput
): Promise<AdminGroupAnnouncementsListResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    let announcements = MOCK_GROUP_ANNOUNCEMENTS[groupId] || [];

    // Apply status filter
    if (input.status) {
      if (input.status === "flagged") {
        announcements = announcements.filter((a) => a.isFlagged);
      } else {
        // Handle other statuses if necessary
      }
    }

    const page = input.page || 1;
    const pageSize = input.pageSize || 20;
    const start = (page - 1) * pageSize;

    return {
      items: announcements.slice(start, start + pageSize),
      total: announcements.length,
      page,
      pageSize,
    };
  }

  const response = await apiClient.get<ApiResponseEnvelope<AdminGroupAnnouncementsListResponse>>(
    endpoints.groupManagementAdmin.getAnnouncements(groupId),
    { params: input }
  );
  return response.data;
};

/* ---- Get Announcement Detail ---- */
export const getAdminGroupAnnouncementDetail = async (
  groupId: string,
  announcementId: string
): Promise<AdminGroupAnnouncement> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    const announcements = MOCK_GROUP_ANNOUNCEMENTS[groupId] || [];
    const announcement = announcements.find((a) => a.id === announcementId);
    if (!announcement) throw new Error("Announcement not found");
    return announcement;
  }

  const response = await apiClient.get<ApiResponseEnvelope<AdminGroupAnnouncement>>(
    endpoints.groupManagementAdmin.getAnnouncementById(groupId, announcementId)
  );
  return response.data;
};

/* ---- Get Announcement Reports ---- */
export const getAdminGroupAnnouncementReports = async (
  groupId: string,
  announcementId: string,
  input: AdminGroupAnnouncementReportsListInput
): Promise<AdminGroupAnnouncementReportsListResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    // Mock data: return empty list for now
    const page = input.page || 1;
    const pageSize = input.pageSize || 20;
    return {
      items: [],
      total: 0,
      page,
      pageSize,
    };
  }

  const response = await apiClient.get<ApiResponseEnvelope<AdminGroupAnnouncementReportsListResponse>>(
    endpoints.groupManagementAdmin.getAnnouncementReports(groupId, announcementId),
    { params: input }
  );
  return response.data;
};

/* ---- List Activity Log ---- */
export const getAdminGroupActivityLog = async (
  groupId: string,
  input: AdminGroupActivityLogListInput
): Promise<AdminGroupActivityLogListResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    const logs =
      MOCK_GROUP_ACTIVITY_LOGS[groupId] || MOCK_GROUP_ACTIVITY_LOGS["7f6c1b6c-1234-4d3b-9e2f-15c5c9a89a10"] || [];
    const page = input.page || 1;
    const pageSize = input.pageSize || 20;
    const start = (page - 1) * pageSize;

    return {
      items: logs.slice(start, start + pageSize),
      total: logs.length,
      page,
      pageSize,
    };
  }

  const response = await apiClient.get<ApiResponseEnvelope<AdminGroupActivityLogListResponse>>(
    endpoints.groupManagementAdmin.getActivityLog(groupId),
    { params: input }
  );
  return response.data;
};

/* ---- List Members ---- */
export const getAdminGroupMembers = async (
  groupId: string,
  input: AdminGroupMembersListInput
): Promise<AdminGroupMembersListResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    const members = MOCK_GROUP_MEMBERS[groupId] || [];
    const page = input.page || 1;
    const pageSize = input.pageSize || 20;
    const start = (page - 1) * pageSize;

    return {
      items: members.slice(start, start + pageSize),
      total: members.length,
      page,
      pageSize,
    };
  }

  const response = await apiClient.get<ApiResponseEnvelope<AdminGroupMembersListResponse>>(
    endpoints.groupManagementAdmin.getMembers(groupId),
    { params: input }
  );
  return response.data;
};

/* ---- Get Member Detail ---- */
export const getAdminGroupMemberDetail = async (groupId: string, memberId: string): Promise<AdminGroupMember> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    const members = MOCK_GROUP_MEMBERS[groupId] || [];
    const member = members.find((m) => m.id === memberId);
    if (!member) throw new Error("Member not found");
    return member;
  }

  const response = await apiClient.get<ApiResponseEnvelope<AdminGroupMember>>(
    endpoints.groupManagementAdmin.getMemberById(groupId, memberId)
  );
  return response.data;
};

/* ---- List Assignments ---- */
export const getAdminGroupAssignments = async (
  groupId: string,
  input: AdminGroupAssignmentsListInput
): Promise<AdminGroupAssignmentsListResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    let assignments = MOCK_GROUP_ASSIGNMENTS[groupId] || [];

    // Apply status filter
    if (input.status) {
      assignments = assignments.filter((a) => a.status === input.status);
    }

    // Apply type filter
    if (input.type) {
      assignments = assignments.filter((a) => a.type === input.type);
    }

    const page = input.page || 1;
    const pageSize = input.pageSize || 20;
    const start = (page - 1) * pageSize;

    return {
      items: assignments.slice(start, start + pageSize),
      total: assignments.length,
      page,
      pageSize,
    };
  }

  const response = await apiClient.get<ApiResponseEnvelope<AdminGroupAssignmentsListResponse>>(
    endpoints.groupManagementAdmin.getAssignments(groupId),
    { params: input }
  );
  return response.data;
};

/* ---- List Leaderboard ---- */
export const getAdminGroupLeaderboard = async (
  groupId: string,
  input: AdminGroupLeaderboardListInput
): Promise<AdminGroupLeaderboardListResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    let leaderboard = MOCK_GROUP_LEADERBOARD[groupId] || [];

    // Apply role filter
    if (input.role) {
      leaderboard = leaderboard.filter((entry) => entry.role === input.role);
    }

    const page = input.page || 1;
    const pageSize = input.pageSize || 20;
    const start = (page - 1) * pageSize;

    return {
      items: leaderboard.slice(start, start + pageSize),
      total: leaderboard.length,
      page,
      pageSize,
    };
  }

  const response = await apiClient.get<ApiResponseEnvelope<AdminGroupLeaderboardListResponse>>(
    endpoints.groupManagementAdmin.getLeaderboard(groupId),
    { params: input }
  );
  return response.data;
};

/* ---- Actions ---- */

export const warnLeader = async (
  groupId: string,
  input: AdminGroupWarnLeaderInput
): Promise<AdminGroupActionResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    return { success: true, message: "Leader warned successfully" };
  }
  const response = await apiClient.post<ApiResponseEnvelope<AdminGroupActionResponse>>(
    endpoints.groupManagementAdmin.warnLeader(groupId),
    input
  );
  return response.data;
};

export const dismissReport = async (groupId: string, reportId: string): Promise<AdminGroupActionResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    return { success: true, message: "Report dismissed successfully" };
  }
  const response = await apiClient.post<ApiResponseEnvelope<AdminGroupActionResponse>>(
    endpoints.groupManagementAdmin.dismissReport(groupId, reportId)
  );
  return response.data;
};

export const rejectAnnouncement = async (
  groupId: string,
  announcementId: string
): Promise<AdminGroupActionResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    return { success: true, message: "Announcement rejected successfully" };
  }
  const response = await apiClient.post<ApiResponseEnvelope<AdminGroupActionResponse>>(
    endpoints.groupManagementAdmin.rejectAnnouncement(groupId, announcementId)
  );
  return response.data;
};

export const exportActivityLog = async (groupId: string, params: AdminGroupActivityLogListInput): Promise<string> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    let logs = MOCK_GROUP_ACTIVITY_LOGS[groupId] || [];

    // Filter by date if provided
    if (params.dateFrom) {
      const from = new Date(params.dateFrom).getTime();
      logs = logs.filter((log) => new Date(log.timestamp).getTime() >= from);
    }
    if (params.dateTo) {
      const to = new Date(params.dateTo).getTime();
      logs = logs.filter((log) => new Date(log.timestamp).getTime() <= to);
    }
    if (params.type) {
      logs = logs.filter((log) => log.type === params.type);
    }

    const headers = ["Type", "Title", "Description", "Timestamp", "Actor Name", "Actor Role"];
    const headerRow = headers.join(",");
    const rows = logs.map((entry) => {
      const escape = (v: string) => `"${v?.replace(/"/g, '""')}"`;
      return [
        escape(entry.type),
        escape(entry.metadata.title),
        escape(entry.metadata.description),
        escape(entry.timestamp),
        escape(entry.actor.name),
        escape(entry.actor.role),
      ].join(",");
    });
    return [headerRow, ...rows].join("\n");
  }
  const response = await apiClient.get<string>(endpoints.groupManagementAdmin.exportActivityLog(groupId), {
    params,
    responseType: "text",
  });
  return response as unknown as string;
};

export const removeGroupMember = async (groupId: string, memberId: string): Promise<AdminGroupActionResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    return { success: true, message: "Member removed successfully" };
  }
  const response = await apiClient.delete<ApiResponseEnvelope<AdminGroupActionResponse>>(
    endpoints.groupManagementAdmin.removeMember(groupId, memberId)
  );
  return response.data;
};

export const banGroupMember = async (groupId: string, memberId: string): Promise<AdminGroupActionResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    return { success: true, message: "Member banned successfully" };
  }
  const response = await apiClient.delete<ApiResponseEnvelope<AdminGroupActionResponse>>(
    endpoints.groupManagementAdmin.banMember(groupId, memberId)
  );
  return response.data;
};

export const banGroup = async (groupId: string, input: AdminGroupBanInput): Promise<AdminGroupActionResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    return { success: true, message: "Group banned successfully" };
  }
  const response = await apiClient.post<ApiResponseEnvelope<AdminGroupActionResponse>>(
    endpoints.groupManagementAdmin.banGroup(groupId),
    input
  );
  return response.data;
};

export const unbanGroup = async (groupId: string, input: AdminGroupUnbanInput): Promise<AdminGroupActionResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    return { success: true, message: "Group unbanned successfully" };
  }
  const response = await apiClient.post<ApiResponseEnvelope<AdminGroupActionResponse>>(
    endpoints.groupManagementAdmin.unbanGroup(groupId),
    input
  );
  return response.data;
};

export const deleteGroup = async (groupId: string): Promise<AdminGroupActionResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    return { success: true, message: "Group deleted successfully" };
  }
  const response = await apiClient.delete<ApiResponseEnvelope<AdminGroupActionResponse>>(
    endpoints.groupManagementAdmin.deleteGroup(groupId)
  );
  return response.data;
};

export const updateGroupSettings = async (
  groupId: string,
  input: AdminGroupUpdateSettingsInput
): Promise<AdminGroupActionResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    return { success: true, message: "Settings updated successfully" };
  }
  const response = await apiClient.put<ApiResponseEnvelope<AdminGroupActionResponse>>(
    endpoints.groupManagementAdmin.updateSettings(groupId),
    input
  );
  return response.data;
};

export const changeGroupMemberRole = async (
  groupId: string,
  userId: string,
  input: AdminGroupChangeRoleInput
): Promise<AdminGroupActionResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    return { success: true, message: "Role updated successfully" };
  }
  const response = await apiClient.put<ApiResponseEnvelope<AdminGroupActionResponse>>(
    endpoints.groupManagementAdmin.changeRole(groupId, userId),
    input
  );
  return response.data;
};
