import { create } from "zustand";
import { useQuery, useMutation, useInfiniteQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "@/lib/toast";
import { queryClient } from "@/config/queryClient";
import { getErrorMessage } from "@/utils/error";
import {
  getAdminGroupList,
  getAdminGroupStats,
  getAdminGroupDetail,
  getAdminGroupReports,
  getAdminGroupAnnouncements,
  getAdminGroupAnnouncementReports,
  getAdminGroupActivityLog,
  getAdminGroupMembers,
  getAdminGroupAssignments,
  getAdminGroupLeaderboard,
  warnLeader,
  dismissReport,
  rejectAnnouncement,
  banGroup,
  unbanGroup,
  deleteGroup,
  updateGroupSettings,
  removeGroupMember,
  banGroupMember,
  exportActivityLog,
  changeGroupMemberRole,
} from "./admin-group-management.api";
import { adminGroupManagementQueryKeys } from "./admin-group-management.constants";
import {
  AdminGroupUpdateSettingsInputSchema,
  AdminGroupBanInputSchema,
  AdminGroupUnbanInputSchema,
  AdminGroupWarnLeaderInputSchema,
} from "./admin-group-management.schemas";
import {
  defaultAdminGroupListFilters,
  defaultAdminGroupReportsListFilters,
  defaultAdminGroupAnnouncementsListFilters,
  defaultAdminGroupActivityLogListFilters,
  defaultAdminGroupMembersListFilters,
  defaultAdminGroupAssignmentsListFilters,
  defaultAdminGroupLeaderboardListFilters,
} from "./admin-group-management.data";
import type {
  AdminGroupListInput,
  AdminGroupReportsListInput,
  AdminGroupAnnouncementsListInput,
  AdminGroupAnnouncementReportsListInput,
  AdminGroupActivityLogListInput,
  AdminGroupMembersListInput,
  AdminGroupAssignmentsListInput,
  AdminGroupLeaderboardListInput,
  AdminGroupFilterStore,
  AdminGroupReportsFilterStore,
  AdminGroupAnnouncementsFilterStore,
  AdminGroupActivityLogFilterStore,
  AdminGroupMembersFilterStore,
  AdminGroupAssignmentsFilterStore,
  AdminGroupLeaderboardFilterStore,
  AdminGroupWarnLeaderInput,
  AdminGroupBanInput,
  AdminGroupUnbanInput,
  AdminGroupUpdateSettingsInput,
  AdminGroupChangeRoleInput,
} from "./admin-group-management.types";

/* ---- List Groups (Infinite Query) ---- */
export const useAdminGroupManagementList = (filters: Omit<AdminGroupListInput, "page">) =>
  useInfiniteQuery({
    queryKey: adminGroupManagementQueryKeys.list({ ...filters, page: 1, pageSize: filters.pageSize ?? 20 }),
    queryFn: ({ pageParam = 1 }) =>
      getAdminGroupList({
        ...filters,
        page: pageParam,
        pageSize: filters.pageSize ?? 20,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.total / (filters.pageSize ?? 20));
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
  });

/* ---- Get Group Stats ---- */
export const useGetAdminGroupManagementStats = () =>
  useQuery({
    queryKey: adminGroupManagementQueryKeys.stats(),
    queryFn: () => getAdminGroupStats(),
  });

/* ---- Get Group Detail ---- */
export const useGetAdminGroupManagementDetail = (groupId: string) =>
  useQuery({
    queryKey: adminGroupManagementQueryKeys.detail(groupId),
    queryFn: () => getAdminGroupDetail(groupId),
    enabled: !!groupId,
  });

/* ---- List Reports (Infinite Query) ---- */
export const useAdminGroupManagementReports = (groupId: string, filters: Omit<AdminGroupReportsListInput, "page">) =>
  useInfiniteQuery({
    queryKey: adminGroupManagementQueryKeys.reportsList(groupId, { ...filters, page: 1 }),
    queryFn: ({ pageParam = 1 }) => getAdminGroupReports(groupId, { ...filters, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.total / (filters.pageSize ?? 20));
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
    enabled: !!groupId,
  });

/* ---- List Announcements (Infinite Query) ---- */
export const useAdminGroupManagementAnnouncements = (
  groupId: string,
  filters: Omit<AdminGroupAnnouncementsListInput, "page">
) =>
  useInfiniteQuery({
    queryKey: adminGroupManagementQueryKeys.announcementsList(groupId, { ...filters, page: 1 }),
    queryFn: ({ pageParam = 1 }) => getAdminGroupAnnouncements(groupId, { ...filters, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.total / (filters.pageSize ?? 20));
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
    enabled: !!groupId,
  });

/* ---- List Announcement Reports (Infinite Query) ---- */
export const useAdminGroupAnnouncementReports = (
  groupId: string,
  announcementId: string,
  filters: Omit<AdminGroupAnnouncementReportsListInput, "page">
) =>
  useInfiniteQuery({
    queryKey: adminGroupManagementQueryKeys.announcementReports(groupId, announcementId),
    queryFn: ({ pageParam = 1 }) =>
      getAdminGroupAnnouncementReports(groupId, announcementId, { ...filters, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.total / (filters.pageSize ?? 20));
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
    enabled: !!groupId && !!announcementId,
  });

/* ---- List Activity Log (Infinite Query) ---- */
export const useAdminGroupManagementActivityLog = (
  groupId: string,
  filters: Omit<AdminGroupActivityLogListInput, "page">
) =>
  useInfiniteQuery({
    queryKey: adminGroupManagementQueryKeys.activityLogList(groupId, { ...filters, page: 1 }),
    queryFn: ({ pageParam = 1 }) => getAdminGroupActivityLog(groupId, { ...filters, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.total / (filters.pageSize ?? 20));
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
    enabled: !!groupId,
  });

/* ---- List Members (Infinite Query) ---- */
export const useAdminGroupManagementMembers = (groupId: string, filters: Omit<AdminGroupMembersListInput, "page">) =>
  useInfiniteQuery({
    queryKey: adminGroupManagementQueryKeys.membersList(groupId, { ...filters, page: 1 }),
    queryFn: ({ pageParam = 1 }) => getAdminGroupMembers(groupId, { ...filters, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.total / (filters.pageSize ?? 20));
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
    enabled: !!groupId,
  });

/* ---- List Assignments (Infinite Query) ---- */
export const useAdminGroupManagementAssignments = (
  groupId: string,
  filters: Omit<AdminGroupAssignmentsListInput, "page">
) =>
  useInfiniteQuery({
    queryKey: adminGroupManagementQueryKeys.assignmentsList(groupId, { ...filters, page: 1 }),
    queryFn: ({ pageParam = 1 }) => getAdminGroupAssignments(groupId, { ...filters, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.total / (filters.pageSize ?? 20));
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
    enabled: !!groupId,
  });

/* ---- List Leaderboard (Infinite Query) ---- */
export const useAdminGroupManagementLeaderboard = (
  groupId: string,
  filters: Omit<AdminGroupLeaderboardListInput, "page">
) =>
  useInfiniteQuery({
    queryKey: adminGroupManagementQueryKeys.leaderboardList(groupId, { ...filters, page: 1 }),
    queryFn: ({ pageParam = 1 }) => getAdminGroupLeaderboard(groupId, { ...filters, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.total / (filters.pageSize ?? 20));
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
    enabled: !!groupId,
  });

/* ---- Form Hooks ---- */
export const useUpdateAdminGroupSettingsForm = (initialValues?: AdminGroupUpdateSettingsInput) =>
  useForm<AdminGroupUpdateSettingsInput>({
    resolver: zodResolver(AdminGroupUpdateSettingsInputSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

export const useBanAdminGroupForm = (initialValues?: AdminGroupBanInput) =>
  useForm<AdminGroupBanInput>({
    resolver: zodResolver(AdminGroupBanInputSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

export const useUnbanAdminGroupForm = (initialValues?: AdminGroupUnbanInput) =>
  useForm<AdminGroupUnbanInput>({
    resolver: zodResolver(AdminGroupUnbanInputSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

export const useWarnGroupLeaderForm = (initialValues?: AdminGroupWarnLeaderInput) =>
  useForm<AdminGroupWarnLeaderInput>({
    resolver: zodResolver(AdminGroupWarnLeaderInputSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

/* ---- Mutations ---- */

export const useWarnGroupLeader = () =>
  useMutation({
    mutationFn: ({ groupId, input }: { groupId: string; input: AdminGroupWarnLeaderInput }) =>
      warnLeader(groupId, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: adminGroupManagementQueryKeys.reports(variables.groupId) });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Leader warned",
          text2: "The group leader has been warned successfully",
        });
      }, 300);
    },
    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Failed to warn leader",
        text2: getErrorMessage(error),
      }),
  });

export const useDismissGroupReport = () =>
  useMutation({
    mutationFn: ({ groupId, reportId }: { groupId: string; reportId: string }) => dismissReport(groupId, reportId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: adminGroupManagementQueryKeys.reports(variables.groupId) });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Report dismissed",
          text2: "The group report has been dismissed successfully",
        });
      }, 300);
    },
    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Failed to dismiss report",
        text2: getErrorMessage(error),
      }),
  });

export const useRejectGroupAnnouncement = () =>
  useMutation({
    mutationFn: ({ groupId, announcementId }: { groupId: string; announcementId: string }) =>
      rejectAnnouncement(groupId, announcementId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: adminGroupManagementQueryKeys.announcements(variables.groupId),
      });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Announcement rejected",
          text2: "The announcement has been rejected successfully",
        });
      }, 300);
    },
    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Failed to reject announcement",
        text2: getErrorMessage(error),
      }),
  });

export const useBanAdminGroup = () =>
  useMutation({
    mutationFn: ({ groupId, input }: { groupId: string; input: AdminGroupBanInput }) => banGroup(groupId, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: adminGroupManagementQueryKeys.detail(variables.groupId) });
      queryClient.invalidateQueries({ queryKey: adminGroupManagementQueryKeys.lists() });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Group banned",
          text2: "The group has been banned successfully",
        });
      }, 300);
    },
    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Failed to ban group",
        text2: getErrorMessage(error),
      }),
  });

export const useUnbanAdminGroup = () =>
  useMutation({
    mutationFn: ({ groupId, input }: { groupId: string; input: AdminGroupUnbanInput }) => unbanGroup(groupId, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: adminGroupManagementQueryKeys.detail(variables.groupId) });
      queryClient.invalidateQueries({ queryKey: adminGroupManagementQueryKeys.lists() });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Group unbanned",
          text2: "The group has been unbanned successfully",
        });
      }, 300);
    },
    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Failed to unban group",
        text2: getErrorMessage(error),
      }),
  });

export const useDeleteAdminGroup = () =>
  useMutation({
    mutationFn: ({ groupId }: { groupId: string }) => deleteGroup(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminGroupManagementQueryKeys.lists() });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Group deleted",
          text2: "The group has been permanently deleted",
        });
      }, 300);
    },
    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Failed to delete group",
        text2: getErrorMessage(error),
      }),
  });

export const useUpdateAdminGroupSettings = () =>
  useMutation({
    mutationFn: ({ groupId, input }: { groupId: string; input: AdminGroupUpdateSettingsInput }) =>
      updateGroupSettings(groupId, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: adminGroupManagementQueryKeys.detail(variables.groupId) });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Settings updated",
          text2: "The group settings have been updated successfully",
        });
      }, 300);
    },
    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Failed to update settings",
        text2: getErrorMessage(error),
      }),
  });

export const useRemoveAdminGroupMember = () =>
  useMutation({
    mutationFn: ({ groupId, memberId }: { groupId: string; memberId: string }) => removeGroupMember(groupId, memberId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: adminGroupManagementQueryKeys.members(variables.groupId) });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Member removed",
          text2: "The member has been removed successfully",
        });
      }, 300);
    },
    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Failed to remove member",
        text2: getErrorMessage(error),
      }),
  });

export const useBanAdminGroupMember = () =>
  useMutation({
    mutationFn: ({ groupId, memberId }: { groupId: string; memberId: string }) => banGroupMember(groupId, memberId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: adminGroupManagementQueryKeys.members(variables.groupId) });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Member banned",
          text2: "The member has been banned successfully",
        });
      }, 300);
    },
    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Failed to ban member",
        text2: getErrorMessage(error),
      }),
  });

export const useExportAdminGroupActivityLog = () =>
  useMutation({
    mutationFn: ({ groupId, params }: { groupId: string; params: AdminGroupActivityLogListInput }) =>
      exportActivityLog(groupId, params),
    onSuccess: () => {
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Export successful",
          text2: "The activity log has been exported successfully",
        });
      }, 300);
    },
    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Export failed",
        text2: getErrorMessage(error),
      }),
  });

export const useChangeAdminGroupMemberRole = () =>
  useMutation({
    mutationFn: ({ groupId, userId, input }: { groupId: string; userId: string; input: AdminGroupChangeRoleInput }) =>
      changeGroupMemberRole(groupId, userId, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: adminGroupManagementQueryKeys.members(variables.groupId) });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Role updated",
          text2: "The member role has been updated successfully",
        });
      }, 300);
    },
    onError: (error) =>
      Toast.show({
        type: "error",
        text1: "Failed to update role",
        text2: getErrorMessage(error),
      }),
  });

/* ---- Filter Stores ---- */

export const useAdminGroupManagementFilterStore = create<AdminGroupFilterStore>((set) => ({
  ...defaultAdminGroupListFilters,
  setFilters: (filters: Partial<AdminGroupFilterStore>) => {
    set((state: AdminGroupFilterStore) => {
      const updates: Partial<AdminGroupFilterStore> = {};
      Object.entries(filters).forEach(([key, value]) => {
        const filterKey = key as keyof AdminGroupFilterStore;
        updates[filterKey] = value as never;
      });
      if (!("page" in filters)) updates.page = 1;
      return { ...state, ...updates };
    });
  },
  resetFilters: () => set({ ...defaultAdminGroupListFilters }),
}));

export const useAdminGroupReportsFilterStore = create<AdminGroupReportsFilterStore>((set) => ({
  ...defaultAdminGroupReportsListFilters,
  setFilters: (filters: Partial<AdminGroupReportsFilterStore>) => {
    set((state: AdminGroupReportsFilterStore) => {
      const updates: Partial<AdminGroupReportsFilterStore> = {};
      Object.entries(filters).forEach(([key, value]) => {
        const filterKey = key as keyof AdminGroupReportsFilterStore;
        updates[filterKey] = value as never;
      });
      if (!("page" in filters)) updates.page = 1;
      return { ...state, ...updates };
    });
  },
  resetFilters: () => set({ ...defaultAdminGroupReportsListFilters }),
}));

export const useAdminGroupAnnouncementsFilterStore = create<AdminGroupAnnouncementsFilterStore>((set) => ({
  ...defaultAdminGroupAnnouncementsListFilters,
  setFilters: (filters: Partial<AdminGroupAnnouncementsFilterStore>) => {
    set((state: AdminGroupAnnouncementsFilterStore) => {
      const updates: Partial<AdminGroupAnnouncementsFilterStore> = {};
      Object.entries(filters).forEach(([key, value]) => {
        const filterKey = key as keyof AdminGroupAnnouncementsFilterStore;
        updates[filterKey] = value as never;
      });
      if (!("page" in filters)) updates.page = 1;
      return { ...state, ...updates };
    });
  },
  resetFilters: () => set({ ...defaultAdminGroupAnnouncementsListFilters }),
}));

export const useAdminGroupActivityLogFilterStore = create<AdminGroupActivityLogFilterStore>((set) => ({
  ...defaultAdminGroupActivityLogListFilters,
  setFilters: (filters: Partial<AdminGroupActivityLogFilterStore>) => {
    set((state: AdminGroupActivityLogFilterStore) => {
      const updates: Partial<AdminGroupActivityLogFilterStore> = {};
      Object.entries(filters).forEach(([key, value]) => {
        const filterKey = key as keyof AdminGroupActivityLogFilterStore;
        updates[filterKey] = value as never;
      });
      if (!("page" in filters)) updates.page = 1;
      return { ...state, ...updates };
    });
  },
  resetFilters: () => set({ ...defaultAdminGroupActivityLogListFilters }),
}));

export const useAdminGroupMembersFilterStore = create<AdminGroupMembersFilterStore>((set) => ({
  ...defaultAdminGroupMembersListFilters,
  setFilters: (filters: Partial<AdminGroupMembersFilterStore>) => {
    set((state: AdminGroupMembersFilterStore) => {
      const updates: Partial<AdminGroupMembersFilterStore> = {};
      Object.entries(filters).forEach(([key, value]) => {
        const filterKey = key as keyof AdminGroupMembersFilterStore;
        updates[filterKey] = value as never;
      });
      if (!("page" in filters)) updates.page = 1;
      return { ...state, ...updates };
    });
  },
  resetFilters: () => set({ ...defaultAdminGroupMembersListFilters }),
}));

export const useAdminGroupAssignmentsFilterStore = create<AdminGroupAssignmentsFilterStore>((set) => ({
  ...defaultAdminGroupAssignmentsListFilters,
  setFilters: (filters: Partial<AdminGroupAssignmentsFilterStore>) => {
    set((state: AdminGroupAssignmentsFilterStore) => {
      const updates: Partial<AdminGroupAssignmentsFilterStore> = {};
      Object.entries(filters).forEach(([key, value]) => {
        const filterKey = key as keyof AdminGroupAssignmentsFilterStore;
        updates[filterKey] = value as never;
      });
      if (!("page" in filters)) updates.page = 1;
      return { ...state, ...updates };
    });
  },
  resetFilters: () => set({ ...defaultAdminGroupAssignmentsListFilters }),
}));

export const useAdminGroupLeaderboardFilterStore = create<AdminGroupLeaderboardFilterStore>((set) => ({
  ...defaultAdminGroupLeaderboardListFilters,
  setFilters: (filters: Partial<AdminGroupLeaderboardFilterStore>) => {
    set((state: AdminGroupLeaderboardFilterStore) => {
      const updates: Partial<AdminGroupLeaderboardFilterStore> = {};
      Object.entries(filters).forEach(([key, value]) => {
        const filterKey = key as keyof AdminGroupLeaderboardFilterStore;
        updates[filterKey] = value as never;
      });
      if (!("page" in filters)) updates.page = 1;
      return { ...state, ...updates };
    });
  },
  resetFilters: () => set({ ...defaultAdminGroupLeaderboardListFilters }),
}));
