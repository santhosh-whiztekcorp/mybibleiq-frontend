import { create } from "zustand";
import { useQuery, useMutation, useInfiniteQuery } from "@tanstack/react-query";
import Toast from "@/lib/toast";
import { queryClient } from "@/config/queryClient";
import { getErrorMessage } from "@/utils/error";
import {
  getAdminUserList,
  getAdminUserStats,
  getAdminUserProfile,
  getAdminUserActivity,
  getAdminUserSettings,
  getAdminUserSpiritFood,
  getAdminUserBadges,
  getAdminUserFeedback,
  getAdminUserSavedVerses,
  suspendAdminUser,
  activateAdminUser,
  deleteAdminUser,
} from "./admin-user-management.api";
import { adminUserManagementQueryKeys } from "./admin-user-management.constants";
import {
  defaultAdminUserManagementFilters,
  defaultAdminUserBadgesFilters,
  defaultAdminUserFeedbackFilters,
  defaultAdminUserSavedVersesFilters,
} from "./admin-user-management.data";
import type {
  AdminUserListInput,
  AdminUserBadgesListInput,
  AdminUserFeedbackListInput,
  AdminUserSavedVersesListInput,
  AdminUserSuspendInput,
  AdminUserDeleteInput,
  AdminUserFilterStore,
  AdminUserBadgesFilterStore,
  AdminUserFeedbackFilterStore,
  AdminUserSavedVersesFilterStore,
} from "./admin-user-management.types";

/* ---- List Users (Infinite Query for Pagination) ---- */
export const useAdminUserManagementList = (filters: Omit<AdminUserListInput, "page">) =>
  useInfiniteQuery({
    queryKey: adminUserManagementQueryKeys.list({ ...filters, page: 1, pageSize: filters.pageSize ?? 20 }),
    queryFn: ({ pageParam = 1 }) =>
      getAdminUserList({
        ...filters,
        page: pageParam,
        pageSize: filters.pageSize ?? 20,
        sort: filters.sort ?? "-createdAt",
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || typeof lastPage.total === "undefined") {
        return undefined;
      }
      const totalPages = Math.ceil(lastPage.total / (filters.pageSize ?? 20));
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
  });

/* ---- Get User Stats ---- */
export const useGetAdminUserManagementStats = () =>
  useQuery({
    queryKey: adminUserManagementQueryKeys.stats(),
    queryFn: () => getAdminUserStats(),
  });

/* ---- Get User Profile ---- */
export const useGetAdminUserManagementProfile = (userId: string) =>
  useQuery({
    queryKey: adminUserManagementQueryKeys.profile(userId),
    queryFn: () => getAdminUserProfile(userId),
    enabled: !!userId,
  });

/* ---- Get User Activity ---- */
export const useGetAdminUserManagementActivity = (userId: string) =>
  useQuery({
    queryKey: adminUserManagementQueryKeys.activity(userId),
    queryFn: () => getAdminUserActivity(userId),
    enabled: !!userId,
  });

/* ---- Get User Settings ---- */
export const useGetAdminUserManagementSettings = (userId: string) =>
  useQuery({
    queryKey: adminUserManagementQueryKeys.settings(userId),
    queryFn: () => getAdminUserSettings(userId),
    enabled: !!userId,
  });

/* ---- Get User Spirit Food ---- */
export const useGetAdminUserManagementSpiritFood = (userId: string) =>
  useQuery({
    queryKey: adminUserManagementQueryKeys.spiritFood(userId),
    queryFn: () => getAdminUserSpiritFood(userId),
    enabled: !!userId,
  });

/* ---- Get User Badges (Infinite Query for Pagination) ---- */
export const useAdminUserManagementBadges = (userId: string, filters: Omit<AdminUserBadgesListInput, "page">) =>
  useInfiniteQuery({
    queryKey: adminUserManagementQueryKeys.badgesList(userId, {
      ...filters,
      page: 1,
      pageSize: filters.pageSize ?? 20,
    }),
    queryFn: ({ pageParam = 1 }) =>
      getAdminUserBadges(userId, {
        ...filters,
        page: pageParam,
        pageSize: filters.pageSize ?? 20,
        sort: filters.sort ?? "-earnedAt",
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || typeof lastPage.totalEarned === "undefined") {
        return undefined;
      }
      const totalPages = Math.ceil(lastPage.totalEarned / (filters.pageSize ?? 20));
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
    enabled: !!userId,
  });

/* ---- Get User Feedback (Infinite Query for Pagination) ---- */
export const useAdminUserManagementFeedback = (userId: string, filters: Omit<AdminUserFeedbackListInput, "page">) =>
  useInfiniteQuery({
    queryKey: adminUserManagementQueryKeys.feedbackList(userId, {
      ...filters,
      page: 1,
      pageSize: filters.pageSize ?? 20,
    }),
    queryFn: ({ pageParam = 1 }) =>
      getAdminUserFeedback(userId, {
        ...filters,
        page: pageParam,
        pageSize: filters.pageSize ?? 20,
        sort: filters.sort ?? "-createdAt",
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || typeof lastPage.total === "undefined") {
        return undefined;
      }
      const totalPages = Math.ceil(lastPage.total / (filters.pageSize ?? 20));
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
    enabled: !!userId,
  });

/* ---- Get User Saved Verses (Infinite Query for Pagination) ---- */
export const useAdminUserManagementSavedVerses = (
  userId: string,
  filters: Omit<AdminUserSavedVersesListInput, "page">
) =>
  useInfiniteQuery({
    queryKey: adminUserManagementQueryKeys.savedVersesList(userId, {
      ...filters,
      page: 1,
      pageSize: filters.pageSize ?? 20,
    }),
    queryFn: ({ pageParam = 1 }) =>
      getAdminUserSavedVerses(userId, {
        ...filters,
        page: pageParam,
        pageSize: filters.pageSize ?? 20,
        sort: filters.sort ?? "-savedAt",
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || typeof lastPage.total === "undefined") {
        return undefined;
      }
      const totalPages = Math.ceil(lastPage.total / (filters.pageSize ?? 20));
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
    enabled: !!userId,
  });

/* ---- Suspend User ---- */
export const useSuspendAdminUserManagement = () =>
  useMutation({
    mutationFn: ({ userId, input }: { userId: string; input: AdminUserSuspendInput }) =>
      suspendAdminUser(userId, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: adminUserManagementQueryKeys.detail(variables.userId),
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: adminUserManagementQueryKeys.lists(),
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: adminUserManagementQueryKeys.stats(),
        refetchType: "active",
      });
      Toast.show({
        type: "success",
        text1: "User suspended",
        text2: "User has been suspended successfully",
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to suspend user",
        text2: errorMessage || "Please try again later",
      });
    },
  });

/* ---- Activate User ---- */
export const useActivateAdminUserManagement = () =>
  useMutation({
    mutationFn: (userId: string) => activateAdminUser(userId),
    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({
        queryKey: adminUserManagementQueryKeys.detail(userId),
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: adminUserManagementQueryKeys.lists(),
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: adminUserManagementQueryKeys.stats(),
        refetchType: "active",
      });
      Toast.show({
        type: "success",
        text1: "User activated",
        text2: "User has been activated successfully",
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to activate user",
        text2: errorMessage || "Please try again later",
      });
    },
  });

/* ---- Delete User ---- */
export const useDeleteAdminUserManagement = () =>
  useMutation({
    mutationFn: ({ userId, input }: { userId: string; input: AdminUserDeleteInput }) => deleteAdminUser(userId, input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminUserManagementQueryKeys.lists(),
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: adminUserManagementQueryKeys.stats(),
        refetchType: "active",
      });
      Toast.show({
        type: "success",
        text1: "User deleted",
        text2: "User has been deleted successfully",
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to delete user",
        text2: errorMessage || "Please try again later",
      });
    },
  });

/* ---- Filter stores ---- */
export const useAdminUserManagementFilterStore = create<AdminUserFilterStore>((set) => ({
  /* ---- State ---- */
  ...defaultAdminUserManagementFilters,

  /* ---- Actions ---- */
  setFilters: (filters) => {
    set((state) => {
      const updates: Partial<AdminUserFilterStore> = {};
      const filterKeys = Object.keys(filters);
      const filterFields = ["q", "status"] as const;
      const hasFilterChanges = filterKeys.some((key) => filterFields.includes(key as (typeof filterFields)[number]));

      if (hasFilterChanges && !("page" in filters)) {
        updates.page = 1;
      }

      Object.entries(filters).forEach(([key, value]) => {
        const filterKey = key as keyof AdminUserFilterStore;
        if (value === null || (Array.isArray(value) && value.length === 0)) {
          updates[filterKey] = undefined as never;
        } else {
          updates[filterKey] = value as never;
        }
      });
      return { ...state, ...updates };
    });
  },
  resetFilters: () => set({ ...defaultAdminUserManagementFilters }),
}));

export const useAdminUserManagementBadgesFilterStore = create<AdminUserBadgesFilterStore>((set) => ({
  /* ---- State ---- */
  ...defaultAdminUserBadgesFilters,

  /* ---- Actions ---- */
  setFilters: (filters) => {
    set((state) => {
      const updates: Partial<AdminUserBadgesFilterStore> = {};
      const filterKeys = Object.keys(filters);
      const filterFields = ["rarity"] as const;
      const hasFilterChanges = filterKeys.some((key) => filterFields.includes(key as (typeof filterFields)[number]));

      if (hasFilterChanges && !("page" in filters)) {
        updates.page = 1;
      }

      Object.entries(filters).forEach(([key, value]) => {
        const filterKey = key as keyof AdminUserBadgesFilterStore;
        if (value === null || (Array.isArray(value) && value.length === 0)) {
          updates[filterKey] = undefined as never;
        } else {
          updates[filterKey] = value as never;
        }
      });
      return { ...state, ...updates };
    });
  },
  resetFilters: () => set({ ...defaultAdminUserBadgesFilters }),
}));

export const useAdminUserManagementFeedbackFilterStore = create<AdminUserFeedbackFilterStore>((set) => ({
  /* ---- State ---- */
  ...defaultAdminUserFeedbackFilters,

  /* ---- Actions ---- */
  setFilters: (filters) => {
    set((state) => {
      const updates: Partial<AdminUserFeedbackFilterStore> = {};

      if (!("page" in filters)) {
        updates.page = 1;
      }

      Object.entries(filters).forEach(([key, value]) => {
        const filterKey = key as keyof AdminUserFeedbackFilterStore;
        if (value === null || (Array.isArray(value) && value.length === 0)) {
          updates[filterKey] = undefined as never;
        } else {
          updates[filterKey] = value as never;
        }
      });
      return { ...state, ...updates };
    });
  },
  resetFilters: () => set({ ...defaultAdminUserFeedbackFilters }),
}));

export const useAdminUserManagementSavedVersesFilterStore = create<AdminUserSavedVersesFilterStore>((set) => ({
  /* ---- State ---- */
  ...defaultAdminUserSavedVersesFilters,

  /* ---- Actions ---- */
  setFilters: (filters) => {
    set((state) => {
      const updates: Partial<AdminUserSavedVersesFilterStore> = {};

      if (!("page" in filters)) {
        updates.page = 1;
      }

      Object.entries(filters).forEach(([key, value]) => {
        const filterKey = key as keyof AdminUserSavedVersesFilterStore;
        if (value === null || (Array.isArray(value) && value.length === 0)) {
          updates[filterKey] = undefined as never;
        } else {
          updates[filterKey] = value as never;
        }
      });
      return { ...state, ...updates };
    });
  },
  resetFilters: () => set({ ...defaultAdminUserSavedVersesFilters }),
}));
