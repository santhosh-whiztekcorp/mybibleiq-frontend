import { z } from "zod";

/* ---- Enums ---- */
export const AdminGroupStatusEnum = z.enum(["active", "suspended", "banned", "archived"]);
export const AdminGroupTypeEnum = z.enum(["church", "youth_group", "bible_study", "family", "prayer_group", "other"]);
export const AdminGroupPrivacyEnum = z.enum(["public", "private"]);
export const AdminGroupReportStatusEnum = z.enum(["pending", "resolved", "dismissed"]);
export const AdminGroupAnnouncementStatusEnum = z.enum(["pending", "approved", "rejected", "flagged"]);
export const AdminGroupActivityEventTypeEnum = z.enum(["member", "assignment", "announcement", "report"]);
export const AdminGroupMemberRoleEnum = z.enum(["leader", "co_leader", "member"]);
export const AdminGroupMemberStatusEnum = z.enum(["active", "banned", "inactive"]);
export const AdminGroupAssignmentTypeEnum = z.enum(["Quiz", "Quest"]);
export const AdminGroupAssignmentStatusEnum = z.enum(["not_started", "in_progress", "completed"]).nullable();
export const AdminGroupWarnLeaderNotificationTypeEnum = z.enum(["push", "email"]);

/* ---- Input Schemas ---- */
export const AdminGroupListInputSchema = z.object({
  page: z.number().min(1).optional(),
  pageSize: z.number().min(1).optional(),
  sort: z.string().optional(),
  q: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  privacy: z.string().optional(),
});

export const AdminGroupReportsListInputSchema = z.object({
  page: z.number().min(1).optional(),
  pageSize: z.number().min(1).optional(),

  status: z.string().optional(),
});

export const AdminGroupAnnouncementsListInputSchema = z.object({
  page: z.number().min(1).optional(),
  pageSize: z.number().min(1).optional(),
  status: z.string().optional(),
});

export const AdminGroupActivityLogListInputSchema = z.object({
  page: z.number().min(1).optional(),
  pageSize: z.number().min(1).optional(),
  type: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});

export const AdminGroupMembersListInputSchema = z.object({
  page: z.number().min(1).optional(),
  pageSize: z.number().min(1).optional(),
  q: z.string().optional(),
  role: z.string().optional(),
  status: z.string().optional(),
});

export const AdminGroupAssignmentsListInputSchema = z.object({
  page: z.number().min(1).optional(),
  pageSize: z.number().min(1).optional(),
  status: z.union([z.string(), z.null()]).optional(),
  type: z.string().optional(),
});

export const AdminGroupLeaderboardListInputSchema = z.object({
  page: z.number().min(1).optional(),
  pageSize: z.number().min(1).optional(),
  period: z.enum(["week", "month", "all_time"]).optional(),
  role: z.string().optional(),
});

export const AdminGroupWarnLeaderInputSchema = z.object({
  message: z.string().min(10, "Message must be at least 10 characters"),
  notificationType: AdminGroupWarnLeaderNotificationTypeEnum,
  reportId: z.string().optional(),
});

export const AdminGroupBanInputSchema = z.object({
  reason: z.string().min(10, "Reason must be at least 10 characters"),
});

export const AdminGroupUnbanInputSchema = z.object({
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const AdminGroupUpdateSettingsInputSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  type: AdminGroupTypeEnum.optional(),
  privacy: AdminGroupPrivacyEnum.optional(),
  iconPath: z.string().optional(),
});

export const AdminGroupChangeRoleInputSchema = z.object({
  role: AdminGroupMemberRoleEnum,
});

export const AdminGroupAnnouncementReportsListInputSchema = z.object({
  page: z.number().min(1).optional(),
  pageSize: z.number().min(1).optional(),
  sort: z.string().optional(),
});
