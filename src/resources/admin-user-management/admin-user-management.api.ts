import { apiClient } from "@/config/apiClient";
import { endpoints } from "@/constants/endpoints";
import { ApiResponseEnvelope } from "@/types/resource";
import { USE_MOCK_DATA } from "./admin-user-management.constants";
import {
  MOCK_USERS,
  MOCK_STATS,
  MOCK_USER_PROFILES,
  MOCK_USER_ACTIVITIES,
  MOCK_USER_SETTINGS,
  MOCK_USER_SPIRIT_FOOD,
  MOCK_USER_BADGES,
  MOCK_USER_FEEDBACK,
  MOCK_USER_SAVED_VERSES,
} from "./admin-user-management.data";
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

/* ---- Mock API Functions ---- */
const mockDelay = (ms: number = 500) => new Promise<void>((resolve) => setTimeout(() => resolve(), ms));

/* ---- List Users ---- */
export const getAdminUserList = async (input: AdminUserListInput): Promise<AdminUserListResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    let filtered = [...MOCK_USERS];

    // Apply search filter
    if (input.q) {
      const searchQuery = input.q.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery) ||
          user.username.toLowerCase().includes(searchQuery) ||
          user.location?.toLowerCase().includes(searchQuery)
      );
    }

    // Apply status filter
    if (input.status) {
      filtered = filtered.filter((user) => user.status === input.status);
    }

    // Apply sort
    if (input.sort) {
      const sortField = input.sort.startsWith("-") ? input.sort.slice(1) : input.sort;
      const isDesc = input.sort.startsWith("-");
      filtered.sort((a, b) => {
        let aVal: string | number;
        let bVal: string | number;
        if (sortField === "joinedAt" || sortField === "createdAt") {
          aVal = a.joinedAt;
          bVal = b.joinedAt;
        } else if (sortField === "name") {
          aVal = a.name;
          bVal = b.name;
        } else {
          aVal = a.joinedAt;
          bVal = b.joinedAt;
        }
        if (typeof aVal === "string" && typeof bVal === "string") {
          return isDesc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
        }
        return 0;
      });
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

  const response = await apiClient.get<ApiResponseEnvelope<AdminUserListResponse>>(
    endpoints.userManagementAdmin.getAll,
    {
      params: input,
    }
  );
  return response.data;
};

/* ---- Get User Stats ---- */
export const getAdminUserStats = async (): Promise<AdminUserStatsResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    return MOCK_STATS;
  }

  const response = await apiClient.get<ApiResponseEnvelope<AdminUserStatsResponse>>(
    endpoints.userManagementAdmin.getStats
  );
  return response.data;
};

/* ---- Get User Profile ---- */
export const getAdminUserProfile = async (userId: string): Promise<AdminUserProfileResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    const userProfile = MOCK_USER_PROFILES[userId];
    if (!userProfile) {
      // Return default profile if not found
      return {
        profile: {
          id: userId,
          username: "unknown",
          name: "Unknown User",
          avatarUrl: null,
          status: "active",
          joinedAt: new Date().toISOString(),
          lastActive: new Date().toISOString(),
          location: null,
        },
        stats: {
          totalXp: 0,
          globalRank: 0,
          dayStreak: 0,
        },
      };
    }
    return userProfile;
  }

  const response = await apiClient.get<ApiResponseEnvelope<AdminUserProfileResponse>>(
    endpoints.userManagementAdmin.getProfile(userId)
  );
  return response.data;
};

/* ---- Get User Activity ---- */
export const getAdminUserActivity = async (userId: string): Promise<AdminUserActivityResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    const activity = MOCK_USER_ACTIVITIES[userId] || {
      questsCompleted: 0,
      quizzesCompleted: 0,
      swordDrillPlayed: 0,
    };
    return { activity };
  }

  const response = await apiClient.get<ApiResponseEnvelope<AdminUserActivityResponse>>(
    endpoints.userManagementAdmin.getActivity(userId)
  );
  return response.data;
};

/* ---- Get User Settings ---- */
export const getAdminUserSettings = async (userId: string): Promise<AdminUserSettingsResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    return (
      MOCK_USER_SETTINGS[userId] || {
        notifications: true,
        soundEffects: true,
        showEmail: true,
        language: "English",
      }
    );
  }

  const response = await apiClient.get<ApiResponseEnvelope<AdminUserSettingsResponse>>(
    endpoints.userManagementAdmin.getSettings(userId)
  );
  return response.data;
};

/* ---- Get User Spirit Food ---- */
export const getAdminUserSpiritFood = async (userId: string): Promise<AdminUserSpiritFoodResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    return (
      MOCK_USER_SPIRIT_FOOD[userId] || {
        savedVerses: 0,
        deliveryTime: "08:00",
        deliveryPreferences: {
          smsNotifications: false,
          emailDevotion: false,
          pushNotifications: false,
        },
      }
    );
  }

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
  if (USE_MOCK_DATA) {
    await mockDelay();
    let filtered = [...(MOCK_USER_BADGES[userId] || [])];

    // Apply rarity filter
    if (input.rarity) {
      filtered = filtered.filter((badge) => badge.rarity === input.rarity);
    }

    // Apply sort
    if (input.sort) {
      const sortField = input.sort.startsWith("-") ? input.sort.slice(1) : input.sort;
      const isDesc = input.sort.startsWith("-");
      filtered.sort((a, b) => {
        let aVal: string | number;
        let bVal: string | number;
        if (sortField === "earnedAt") {
          aVal = a.earnedAt;
          bVal = b.earnedAt;
        } else {
          aVal = a.earnedAt;
          bVal = b.earnedAt;
        }
        if (typeof aVal === "string" && typeof bVal === "string") {
          return isDesc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
        }
        return 0;
      });
    }

    const page = input.page || 1;
    const pageSize = input.pageSize || 20;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return {
      items: filtered.slice(start, end),
      totalEarned: filtered.length,
      page,
      pageSize,
    };
  }

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
  if (USE_MOCK_DATA) {
    await mockDelay();
    const filtered = [...(MOCK_USER_FEEDBACK[userId] || [])];

    // Apply sort
    if (input.sort) {
      const sortField = input.sort.startsWith("-") ? input.sort.slice(1) : input.sort;
      const isDesc = input.sort.startsWith("-");
      filtered.sort((a, b) => {
        let aVal: string | number;
        let bVal: string | number;
        if (sortField === "createdAt") {
          aVal = a.createdAt;
          bVal = b.createdAt;
        } else {
          aVal = a.createdAt;
          bVal = b.createdAt;
        }
        if (typeof aVal === "string" && typeof bVal === "string") {
          return isDesc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
        }
        return 0;
      });
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
  if (USE_MOCK_DATA) {
    await mockDelay();
    const filtered = [...(MOCK_USER_SAVED_VERSES[userId] || [])];

    // Apply sort
    if (input.sort) {
      const sortField = input.sort.startsWith("-") ? input.sort.slice(1) : input.sort;
      const isDesc = input.sort.startsWith("-");
      filtered.sort((a, b) => {
        let aVal: string | number;
        let bVal: string | number;
        if (sortField === "savedAt") {
          aVal = a.savedAt;
          bVal = b.savedAt;
        } else {
          aVal = a.savedAt;
          bVal = b.savedAt;
        }
        if (typeof aVal === "string" && typeof bVal === "string") {
          return isDesc ? bVal.localeCompare(aVal) : aVal.localeCompare(bVal);
        }
        return 0;
      });
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
  if (USE_MOCK_DATA) {
    await mockDelay();
    const user = MOCK_USERS.find((u) => u.id === userId);
    if (!user) throw new Error("User not found");
    user.status = "suspended";
    return {
      id: userId,
      status: "suspended",
      suspendedAt: new Date().toISOString(),
      suspendedBy: "admin@mybibleiq.com",
      reason: input.reason || "No reason provided",
      suspendUntil: input.suspendUntil,
    };
  }

  const response = await apiClient.patch<ApiResponseEnvelope<AdminUserSuspendResponse>>(
    endpoints.userManagementAdmin.suspend(userId),
    input
  );
  return response.data;
};

/* ---- Activate User ---- */
export const activateAdminUser = async (userId: string): Promise<AdminUserActivateResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    const user = MOCK_USERS.find((u) => u.id === userId);
    if (!user) throw new Error("User not found");
    user.status = "active";
    return {
      id: userId,
      status: "active",
      activatedAt: new Date().toISOString(),
      activatedBy: "admin@mybibleiq.com",
    };
  }

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
  if (USE_MOCK_DATA) {
    await mockDelay();
    const userIndex = MOCK_USERS.findIndex((u) => u.id === userId);
    if (userIndex === -1) throw new Error("User not found");
    MOCK_USERS.splice(userIndex, 1);
    return { deletedUserId: userId };
  }

  const response = await apiClient.delete<ApiResponseEnvelope<{ deletedUserId: string }>>(
    endpoints.userManagementAdmin.delete(userId),
    { data: input }
  );
  return response.data;
};
