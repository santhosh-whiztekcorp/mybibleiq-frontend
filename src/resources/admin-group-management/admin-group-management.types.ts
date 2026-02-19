import { z } from "zod";
import {
  AdminGroupStatusEnum,
  AdminGroupTypeEnum,
  AdminGroupPrivacyEnum,
  AdminGroupReportStatusEnum,
  AdminGroupAnnouncementStatusEnum,
  AdminGroupActivityEventTypeEnum,
  AdminGroupMemberRoleEnum,
  AdminGroupMemberStatusEnum,
  AdminGroupAssignmentTypeEnum,
  AdminGroupAssignmentStatusEnum,
  AdminGroupListInputSchema,
  AdminGroupReportsListInputSchema,
  AdminGroupAnnouncementsListInputSchema,
  AdminGroupActivityLogListInputSchema,
  AdminGroupMembersListInputSchema,
  AdminGroupAssignmentsListInputSchema,
  AdminGroupLeaderboardListInputSchema,
  AdminGroupWarnLeaderInputSchema,
  AdminGroupBanInputSchema,
  AdminGroupUnbanInputSchema,
  AdminGroupUpdateSettingsInputSchema,
  AdminGroupChangeRoleInputSchema,
  AdminGroupAnnouncementReportsListInputSchema,
  AdminGroupWarnLeaderNotificationTypeEnum,
} from "./admin-group-management.schemas";

/* ---- Enum Types ---- */
export type AdminGroupStatus = z.infer<typeof AdminGroupStatusEnum>;
export type AdminGroupType = z.infer<typeof AdminGroupTypeEnum>;
export type AdminGroupPrivacy = z.infer<typeof AdminGroupPrivacyEnum>;

export type AdminGroupReportStatus = z.infer<typeof AdminGroupReportStatusEnum>;
export type AdminGroupAnnouncementStatus = z.infer<typeof AdminGroupAnnouncementStatusEnum>;
export type AdminGroupActivityEventType = z.infer<typeof AdminGroupActivityEventTypeEnum>;
export type AdminGroupMemberRole = z.infer<typeof AdminGroupMemberRoleEnum>;
export type AdminGroupMemberStatus = z.infer<typeof AdminGroupMemberStatusEnum>;
export type AdminGroupAssignmentType = z.infer<typeof AdminGroupAssignmentTypeEnum>;
export type AdminGroupAssignmentStatus = z.infer<typeof AdminGroupAssignmentStatusEnum>;
export type AdminGroupWarnLeaderNotificationType = z.infer<typeof AdminGroupWarnLeaderNotificationTypeEnum>;

/* ---- Input Types ---- */
export type AdminGroupListInput = z.infer<typeof AdminGroupListInputSchema>;
export type AdminGroupReportsListInput = z.infer<typeof AdminGroupReportsListInputSchema>;
export type AdminGroupAnnouncementsListInput = z.infer<typeof AdminGroupAnnouncementsListInputSchema>;
export type AdminGroupActivityLogListInput = z.infer<typeof AdminGroupActivityLogListInputSchema>;
export type AdminGroupMembersListInput = z.infer<typeof AdminGroupMembersListInputSchema>;
export type AdminGroupAssignmentsListInput = z.infer<typeof AdminGroupAssignmentsListInputSchema>;
export type AdminGroupLeaderboardListInput = z.infer<typeof AdminGroupLeaderboardListInputSchema>;
export type AdminGroupWarnLeaderInput = z.infer<typeof AdminGroupWarnLeaderInputSchema>;
export type AdminGroupBanInput = z.infer<typeof AdminGroupBanInputSchema>;
export type AdminGroupUnbanInput = z.infer<typeof AdminGroupUnbanInputSchema>;
export type AdminGroupUpdateSettingsInput = z.infer<typeof AdminGroupUpdateSettingsInputSchema>;
export type AdminGroupChangeRoleInput = z.infer<typeof AdminGroupChangeRoleInputSchema>;
export type AdminGroupAnnouncementReportsListInput = z.infer<typeof AdminGroupAnnouncementReportsListInputSchema>;

/* ---- Response Types ---- */

export type AdminGroupStats = {
  totalGroups: number;
  activeGroups: number;
  suspendedGroups: number;
  totalMembers: number;
  avgActivityScore: number;
  flaggedGroups: number;
};

export type AdminGroupListItem = {
  id: string;
  name: string;
  description: string;
  iconPath: string;
  type: AdminGroupType;
  privacy: AdminGroupPrivacy;
  status: AdminGroupStatus;
  memberCount: number;
  activityScore: number;
  totalQuizzes: number;
  totalQuests: number;
  lastActivityAt: string;
  createdAt: string;
  leader: {
    id: string;
    name: string;
    username: string;
  };
  reportsCount: number;
};

export type AdminGroupDetail = {
  id: string;
  name: string;
  description?: string;
  iconPath: string;
  memberCount: number;
  activityScore: number;
  createdAt: string;
  type: AdminGroupType;
  privacy: AdminGroupPrivacy;
  status: AdminGroupStatus;
  totalQuizzes: number;
  totalQuests: number;
  reportsCount: number;
  flaggedAnnouncementsCount: number;
};

export type AdminGroupReport = {
  id: string;
  title: string;
  description: string;
  status: AdminGroupReportStatus;
  reportedBy: {
    id: string;
    name: string;
    username: string;
  };
  reportedAt: string;
  groupId: string;
};

export type AdminGroupAnnouncement = {
  id: string;
  content: string;
  views: number;
  postedBy: {
    id: string;
    name: string;
    username: string;
  };
  postedAt: string;
  isFlagged: boolean;
};

export type AdminGroupAnnouncementReport = {
  id: string;
  reason: string;
  reportedBy: {
    id: string;
    name: string;
    username: string;
  };
  reportedAt: string;
};

export type AdminGroupActivityLogEntry = {
  type: AdminGroupActivityEventType;
  timestamp: string;
  actor: {
    name: string;
    username: string;
    role: string;
  };
  metadata: {
    title: string;
    description: string;
  };
};

export type AdminGroupMember = {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string | null;
  role: AdminGroupMemberRole;
  status: AdminGroupMemberStatus;
  joinedAt: string;
  myBibleIQ?: number;
  assignmentsCompleted?: number;
};

export type AdminGroupAssignment = {
  id: string;
  title: string;
  type: AdminGroupAssignmentType;
  status: AdminGroupAssignmentStatus;
  dueDate: string;
  progress: {
    completed: number;
    total: number;
    percentage: number;
  };
  avgScore: number | null;
  createdAt: string;
};

export type AdminGroupLeaderboardEntry = {
  rank: number;
  userId: string;
  name: string;
  username: string;
  avatarUrl?: string | null;
  role: string;
  score: number;
};

/* ---- List Response Types ---- */

export type AdminGroupListResponse = {
  items: AdminGroupListItem[];
  total: number;
  page: number;
  pageSize: number;
};

export type AdminGroupReportsListResponse = {
  items: AdminGroupReport[];
  total: number;
  page: number;
  pageSize: number;
};

export type AdminGroupAnnouncementsListResponse = {
  items: AdminGroupAnnouncement[];
  total: number;
  page: number;
  pageSize: number;
};

export type AdminGroupAnnouncementReportsListResponse = {
  items: AdminGroupAnnouncementReport[];
  total: number;
  page: number;
  pageSize: number;
};

export type AdminGroupActivityLogListResponse = {
  items: AdminGroupActivityLogEntry[];
  total: number;
  page: number;
  pageSize: number;
};

export type AdminGroupMembersListResponse = {
  items: AdminGroupMember[];
  total: number;
  page: number;
  pageSize: number;
};

export type AdminGroupAssignmentsListResponse = {
  items: AdminGroupAssignment[];
  total: number;
  page: number;
  pageSize: number;
};

export type AdminGroupLeaderboardListResponse = {
  items: AdminGroupLeaderboardEntry[];
  total: number;
  page: number;
  pageSize: number;
};

export type AdminGroupActionResponse = {
  success: boolean;
  message: string;
  data?: unknown;
};

/* ---- Store Types ---- */

export type AdminGroupFilterActions = {
  setFilters: (filters: Partial<AdminGroupListInput>) => void;
  resetFilters: () => void;
};

export type AdminGroupFilterStore = Omit<AdminGroupListInput, "page" | "pageSize" | "sort"> &
  Required<Pick<AdminGroupListInput, "page" | "pageSize" | "sort">> &
  AdminGroupFilterActions;

export type AdminGroupReportsFilterActions = {
  setFilters: (filters: Partial<AdminGroupReportsListInput>) => void;
  resetFilters: () => void;
};

export type AdminGroupReportsFilterStore = Omit<AdminGroupReportsListInput, "page" | "pageSize"> &
  Required<Pick<AdminGroupReportsListInput, "page" | "pageSize">> &
  AdminGroupReportsFilterActions;

export type AdminGroupAnnouncementsFilterActions = {
  setFilters: (filters: Partial<AdminGroupAnnouncementsListInput>) => void;
  resetFilters: () => void;
};

export type AdminGroupAnnouncementsFilterStore = Omit<AdminGroupAnnouncementsListInput, "page" | "pageSize"> &
  Required<Pick<AdminGroupAnnouncementsListInput, "page" | "pageSize">> &
  AdminGroupAnnouncementsFilterActions;

export type AdminGroupActivityLogFilterActions = {
  setFilters: (filters: Partial<AdminGroupActivityLogListInput>) => void;
  resetFilters: () => void;
};

export type AdminGroupActivityLogFilterStore = Omit<AdminGroupActivityLogListInput, "page" | "pageSize"> &
  Required<Pick<AdminGroupActivityLogListInput, "page" | "pageSize">> &
  AdminGroupActivityLogFilterActions;

export type AdminGroupMembersFilterActions = {
  setFilters: (filters: Partial<AdminGroupMembersListInput>) => void;
  resetFilters: () => void;
};

export type AdminGroupMembersFilterStore = Omit<AdminGroupMembersListInput, "page" | "pageSize"> &
  Required<Pick<AdminGroupMembersListInput, "page" | "pageSize">> &
  AdminGroupMembersFilterActions;

export type AdminGroupAssignmentsFilterActions = {
  setFilters: (filters: Partial<AdminGroupAssignmentsListInput>) => void;
  resetFilters: () => void;
};

export type AdminGroupAssignmentsFilterStore = Omit<AdminGroupAssignmentsListInput, "page" | "pageSize"> &
  Required<Pick<AdminGroupAssignmentsListInput, "page" | "pageSize">> &
  AdminGroupAssignmentsFilterActions;

export type AdminGroupLeaderboardFilterActions = {
  setFilters: (filters: Partial<AdminGroupLeaderboardListInput>) => void;
  resetFilters: () => void;
};

export type AdminGroupLeaderboardFilterStore = Omit<AdminGroupLeaderboardListInput, "page" | "pageSize"> &
  Required<Pick<AdminGroupLeaderboardListInput, "page" | "pageSize">> &
  AdminGroupLeaderboardFilterActions;
