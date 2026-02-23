import { pngIcons } from "@/assets";
import type { StaticImageData } from "next/image";
import type { SelectOption } from "@/components/form-controllers/SelectController/SelectController.types";
import {
  AdminGroupStatusEnum,
  AdminGroupTypeEnum,
  AdminGroupPrivacyEnum,
  AdminGroupReportStatusEnum,
  AdminGroupAnnouncementStatusEnum,
  AdminGroupActivityEventTypeEnum,
  AdminGroupMemberRoleEnum,
  AdminGroupAssignmentStatusEnum,
  AdminGroupMemberStatusEnum,
  AdminGroupWarnLeaderNotificationTypeEnum,
} from "./admin-group-management.schemas";
import type {
  AdminGroupStatus,
  AdminGroupType,
  AdminGroupPrivacy,
  AdminGroupReportStatus,
  AdminGroupAnnouncementStatus,
  AdminGroupActivityEventType,
  AdminGroupMemberRole,
  AdminGroupListInput,
  AdminGroupReportsListInput,
  AdminGroupAnnouncementsListInput,
  AdminGroupActivityLogListInput,
  AdminGroupMembersListInput,
  AdminGroupAssignmentsListInput,
  AdminGroupLeaderboardListInput,
  AdminGroupMemberStatus,
  AdminGroupWarnLeaderNotificationType,
} from "./admin-group-management.types";

export const SHOW_ACTIVITY_LOG_BUTTON = false;

/* ---- Group Status Options ---- */
export const ADMIN_GROUP_STATUS_OPTIONS = AdminGroupStatusEnum.options;
export const ADMIN_GROUP_STATUS_LABELS: Record<AdminGroupStatus, string> = {
  active: "Active",
  suspended: "Suspended",
  banned: "Banned",
  archived: "Archived",
};
export const ADMIN_GROUP_STATUS_SELECT_OPTIONS: SelectOption[] = [
  { label: "All Statuses", value: "all" },
  ...ADMIN_GROUP_STATUS_OPTIONS.map((status) => ({
    label: ADMIN_GROUP_STATUS_LABELS[status],
    value: status,
  })),
];

export const ADMIN_GROUP_MEMBER_STATUS_OPTIONS = AdminGroupMemberStatusEnum.options;
export const ADMIN_GROUP_MEMBER_STATUS_LABELS: Record<AdminGroupMemberStatus, string> = {
  active: "Active",
  banned: "Banned",
  inactive: "Inactive",
};
export const ADMIN_GROUP_MEMBER_STATUS_SELECT_OPTIONS: SelectOption[] = [
  { label: "All Statuses", value: "all" },
  ...ADMIN_GROUP_MEMBER_STATUS_OPTIONS.map((status) => ({
    label: ADMIN_GROUP_MEMBER_STATUS_LABELS[status],
    value: status,
  })),
];

/* ---- Group Type Options ---- */
export const ADMIN_GROUP_TYPE_OPTIONS = AdminGroupTypeEnum.options;
export const ADMIN_GROUP_TYPE_LABELS: Record<AdminGroupType, string> = {
  church: "Church",
  youth_group: "Youth Group",
  bible_study: "Bible Study",
  family: "Family",
  prayer_group: "Prayer Group",
  other: "Other",
};
export const ADMIN_GROUP_TYPE_SELECT_OPTIONS: SelectOption[] = [
  { label: "All Types", value: "all" },
  ...ADMIN_GROUP_TYPE_OPTIONS.map((type) => ({
    label: ADMIN_GROUP_TYPE_LABELS[type],
    value: type,
  })),
];

/* ---- Group Status to Badge Variant Mapping ---- */
export const ADMIN_GROUP_STATUS_VARIANTS: Record<AdminGroupStatus, string> = {
  active: "statusActive",
  suspended: "statusSuspended",
  banned: "statusSuspended",
  archived: "statusArchived",
};

/* ---- Group Type to Badge Variant Mapping ---- */
export const ADMIN_GROUP_TYPE_TO_BADGE_VARIANT: Record<AdminGroupType, string> = {
  church: "userGroupChurch",
  youth_group: "userGroupYouthGroup",
  bible_study: "userGroupBibleStudy",
  family: "userGroupFamily",
  prayer_group: "userGroupPrayerGroup",
  other: "outline",
};

/* ---- Group Privacy Options ---- */
export const ADMIN_GROUP_PRIVACY_OPTIONS = AdminGroupPrivacyEnum.options;
export const ADMIN_GROUP_PRIVACY_LABELS: Record<AdminGroupPrivacy, string> = {
  public: "Public",
  private: "Private",
};
export const ADMIN_GROUP_PRIVACY_SELECT_OPTIONS: SelectOption[] = [
  { label: "All Privacy", value: "all" },
  ...ADMIN_GROUP_PRIVACY_OPTIONS.map((privacy) => ({
    label: ADMIN_GROUP_PRIVACY_LABELS[privacy],
    value: privacy,
  })),
];

/* ---- Report Priority Options ---- */

/* ---- Report Status Options ---- */
export const ADMIN_GROUP_REPORT_STATUS_OPTIONS = AdminGroupReportStatusEnum.options;
export const ADMIN_GROUP_REPORT_STATUS_LABELS: Record<AdminGroupReportStatus, string> = {
  pending: "Pending",
  resolved: "Resolved",
  dismissed: "Dismissed",
};
export const ADMIN_GROUP_REPORT_STATUS_SELECT_OPTIONS: SelectOption[] = [
  { label: "All Statuses", value: "all" },
  ...ADMIN_GROUP_REPORT_STATUS_OPTIONS.map((status) => ({
    label: ADMIN_GROUP_REPORT_STATUS_LABELS[status],
    value: status,
  })),
];

/* ---- Announcement Status Options ---- */
export const ADMIN_GROUP_ANNOUNCEMENT_STATUS_OPTIONS = AdminGroupAnnouncementStatusEnum.options;
export const ADMIN_GROUP_ANNOUNCEMENT_STATUS_LABELS: Record<AdminGroupAnnouncementStatus, string> = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  flagged: "Flagged",
};
export const ADMIN_GROUP_ANNOUNCEMENT_STATUS_SELECT_OPTIONS: SelectOption[] = [
  { label: "All Statuses", value: "all" },
  ...ADMIN_GROUP_ANNOUNCEMENT_STATUS_OPTIONS.map((status) => ({
    label: ADMIN_GROUP_ANNOUNCEMENT_STATUS_LABELS[status],
    value: status,
  })),
];

/* ---- Member Role Options ---- */
export const ADMIN_GROUP_MEMBER_ROLE_OPTIONS = AdminGroupMemberRoleEnum.options;
export const ADMIN_GROUP_MEMBER_ROLE_LABELS: Record<AdminGroupMemberRole, string> = {
  leader: "Leader",
  co_leader: "Co-Leader",
  member: "Member",
};
export const ADMIN_GROUP_MEMBER_ROLE_SELECT_OPTIONS: SelectOption[] = [
  { label: "All Roles", value: "all" },
  ...ADMIN_GROUP_MEMBER_ROLE_OPTIONS.map((role) => ({
    label: ADMIN_GROUP_MEMBER_ROLE_LABELS[role],
    value: role,
  })),
];

/* ---- Activity Event Type Options ---- */
export const ADMIN_GROUP_ACTIVITY_EVENT_TYPE_OPTIONS = AdminGroupActivityEventTypeEnum.options;
export const ADMIN_GROUP_ACTIVITY_EVENT_TYPE_LABELS: Record<AdminGroupActivityEventType, string> = {
  member: "Member",
  assignment: "Assignment",
  announcement: "Announcement",
  report: "Report",
};
export const ADMIN_GROUP_ACTIVITY_EVENT_TYPE_SELECT_OPTIONS: SelectOption[] = [
  { label: "All Event Types", value: "all" },
  ...ADMIN_GROUP_ACTIVITY_EVENT_TYPE_OPTIONS.map((type) => ({
    label: ADMIN_GROUP_ACTIVITY_EVENT_TYPE_LABELS[type],
    value: type,
  })),
];

/* ---- Assignment Status Options ---- */
export const ADMIN_GROUP_ASSIGNMENT_STATUS_OPTIONS = AdminGroupAssignmentStatusEnum.unwrap().options;
export const ADMIN_GROUP_ASSIGNMENT_STATUS_LABELS: Record<string, string> = {
  not_started: "Not Started",
  in_progress: "In Progress",
  completed: "Completed",
};

export const ADMIN_GROUP_ASSIGNMENT_STATUS_VARIANTS: Record<string, string> = {
  not_started: "tag",
  in_progress: "statusInProgress",
  completed: "statusPublished",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ADMIN_GROUP_ASSIGNMENT_STATUS_SELECT_OPTIONS: any[] = [
  { label: "All Statuses", value: "all" }, // mapped to undefined in hooks
  { label: "Not Started", value: null },
  ...ADMIN_GROUP_ASSIGNMENT_STATUS_OPTIONS.filter((s) => s !== "not_started").map((status) => ({
    label: ADMIN_GROUP_ASSIGNMENT_STATUS_LABELS[status],
    value: status,
  })),
];

/* ---- Warn Leader Notification Type Options ---- */
export const ADMIN_GROUP_WARN_LEADER_NOTIFICATION_TYPE_OPTIONS = AdminGroupWarnLeaderNotificationTypeEnum.options;
export const ADMIN_GROUP_WARN_LEADER_NOTIFICATION_TYPE_LABELS: Record<AdminGroupWarnLeaderNotificationType, string> = {
  push: "Push Notification",
  email: "Email",
};
export const ADMIN_GROUP_WARN_LEADER_NOTIFICATION_TYPE_SELECT_OPTIONS: SelectOption[] = [
  { label: "All Notification Types", value: "all" },
  ...ADMIN_GROUP_WARN_LEADER_NOTIFICATION_TYPE_OPTIONS.map((type) => ({
    label: ADMIN_GROUP_WARN_LEADER_NOTIFICATION_TYPE_LABELS[type],
    value: type,
  })),
];

/* ---- Group Icon Set ---- */
export const ADMIN_GROUP_ICON_SET: Record<string, StaticImageData> = {
  "group-prayer": pngIcons.groupPrayer,
  "group-church": pngIcons.groupChurch,
  "group-bible": pngIcons.groupBible,
  "group-lamp": pngIcons.groupLamp,
  "group-growth": pngIcons.groupGrowth,
  "group-people": pngIcons.groupPeople,
  "group-book": pngIcons.groupBook,
  "group-heart": pngIcons.groupHeart,
};

export const adminGroupManagementQueryKeys = {
  all: ["admin-group-management"] as const,

  // Lists
  lists: () => ["admin-group-management", "list"] as const,
  list: (filters: Partial<AdminGroupListInput>) => ["admin-group-management", "list", filters] as const,

  // Stats
  stats: () => ["admin-group-management", "stats"] as const,

  // Details
  details: () => ["admin-group-management", "detail"] as const,
  detail: (id: string) => ["admin-group-management", "detail", id] as const,

  // Reports
  reports: (id: string) => ["admin-group-management", "detail", id, "reports"] as const,
  reportsList: (id: string, filters: Partial<AdminGroupReportsListInput>) =>
    ["admin-group-management", "detail", id, "reports", filters] as const,

  // Announcements
  announcements: (id: string) => ["admin-group-management", "detail", id, "announcements"] as const,
  announcementsList: (id: string, filters: Partial<AdminGroupAnnouncementsListInput>) =>
    ["admin-group-management", "detail", id, "announcements", filters] as const,
  announcementReports: (groupId: string, announcementId: string) =>
    ["admin-group-management", "detail", groupId, "announcements", announcementId, "reports"] as const,

  // Activity Log
  activityLogs: (id: string) => ["admin-group-management", "detail", id, "activity-log"] as const,
  activityLogList: (id: string, filters: Partial<AdminGroupActivityLogListInput>) =>
    ["admin-group-management", "detail", id, "activity-log", filters] as const,

  // Members
  members: (id: string) => ["admin-group-management", "detail", id, "members"] as const,
  membersList: (id: string, filters: Partial<AdminGroupMembersListInput>) =>
    ["admin-group-management", "detail", id, "members", filters] as const,

  // Assignments
  assignments: (id: string) => ["admin-group-management", "detail", id, "assignments"] as const,
  assignmentsList: (id: string, filters: Partial<AdminGroupAssignmentsListInput>) =>
    ["admin-group-management", "detail", id, "assignments", filters] as const,

  // Leaderboard
  leaderboard: (id: string) => ["admin-group-management", "detail", id, "leaderboard"] as const,
  leaderboardList: (id: string, filters: Partial<AdminGroupLeaderboardListInput>) =>
    ["admin-group-management", "detail", id, "leaderboard", filters] as const,
};

/* ---- Activity Log Time Period Options ---- */
export type AdminGroupActivityLogTimePeriod = "all" | "today" | "last_7_days" | "last_30_days";
export const ADMIN_GROUP_ACTIVITY_LOG_TIME_LABELS: Record<AdminGroupActivityLogTimePeriod, string> = {
  all: "All Time",
  today: "Today",
  last_7_days: "Last 7 Days",
  last_30_days: "Last 30 Days",
};
export const ADMIN_GROUP_ACTIVITY_LOG_TIME_SELECT_OPTIONS: SelectOption[] = [
  { label: "All Time", value: "all" },
  { label: "Today", value: "today" },
  { label: "Last 7 Days", value: "last_7_days" },
  { label: "Last 30 Days", value: "last_30_days" },
];

/* ---- Leaderboard Period Options ---- */
export const ADMIN_GROUP_LEADERBOARD_PERIOD_OPTIONS = ["week", "month", "all_time"] as const;
export type AdminGroupLeaderboardPeriod = (typeof ADMIN_GROUP_LEADERBOARD_PERIOD_OPTIONS)[number];
export const ADMIN_GROUP_LEADERBOARD_PERIOD_LABELS: Record<AdminGroupLeaderboardPeriod, string> = {
  week: "This Week",
  month: "This Month",
  all_time: "All Time",
};
export const ADMIN_GROUP_LEADERBOARD_PERIOD_SELECT_OPTIONS: SelectOption[] = [
  ...ADMIN_GROUP_LEADERBOARD_PERIOD_OPTIONS.map((period) => ({
    label: ADMIN_GROUP_LEADERBOARD_PERIOD_LABELS[period],
    value: period,
  })),
];
