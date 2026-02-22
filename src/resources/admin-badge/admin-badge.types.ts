import { z } from "zod";
import {
  AdminBadgeStausEnum,
  BadgeRarityEnum,
  BadgeCategoryEnum,
  BadgeAssignmentTypeEnum,
  BadgeTriggerTypeEnum,
  BadgeConditionOperatorEnum,
  BadgeStatusActionEnum,
  CreateAdminBadgeRequestSchema,
  UpdateAdminBadgeRequestSchema,
  UpdateAdminBadgeStatusResetScheam,
  TimeBasedMetricEnum,
  StreakBasedMetricEnum,
  CountBasedMetricEnum,
  MilestoneBasedMetricEnum,
  EngagementBasedMetricEnum,
} from "./admin-badge.schemas";

/* ---- Enum Types ---- */
export type AdminBadgeStatus = z.infer<typeof AdminBadgeStausEnum>;
export type BadgeRarity = z.infer<typeof BadgeRarityEnum>;
export type BadgeCategory = z.infer<typeof BadgeCategoryEnum>;
export type BadgeAssignmentType = z.infer<typeof BadgeAssignmentTypeEnum>;
export type BadgeTriggerType = z.infer<typeof BadgeTriggerTypeEnum>;
export type BadgeConditionOperator = z.infer<typeof BadgeConditionOperatorEnum>;
export type BadgeStatusAction = z.infer<typeof BadgeStatusActionEnum>;
export type TimeBasedConfig = z.infer<typeof TimeBasedMetricEnum>;
export type StreakBasedConfig = z.infer<typeof StreakBasedMetricEnum>;
export type CountBasedConfig = z.infer<typeof CountBasedMetricEnum>;
export type MilestoneBasedConfig = z.infer<typeof MilestoneBasedMetricEnum>;
export type EngagementBasedConfig = z.infer<typeof EngagementBasedMetricEnum>;

/* ---- Trigger Config Types ---- */
export type BadgeTriggerMetric = {
  type: string;
};

export type BadgeTriggerConfig = {
  triggerType: BadgeTriggerType;
  metric: BadgeTriggerMetric;
  operator: BadgeConditionOperator;
  threshold: number;
};

/* ---- Badge Types ---- */
export type AdminBadgeSummary = {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  status: AdminBadgeStatus;
  rarity: BadgeRarity;
  category: BadgeCategory;
  assignmentType: BadgeAssignmentType;
  tags: string[];
  triggerConfig?: BadgeTriggerConfig;
  publishedAt?: string;
  archivedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminBadgeDetail = {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  iconMediaId?: string;
  status: AdminBadgeStatus;
  rarity: BadgeRarity;
  category: BadgeCategory;
  assignmentType: BadgeAssignmentType;
  tags: string[];
  triggerConfig?: BadgeTriggerConfig;
  createdAt: string;
  updatedAt: string;
};

/* ---- Response Types ---- */
export type AdminBadgeStatusStatsResponse = {
  status: AdminBadgeStatus;
  count: number;
}[];

export type AdminBadgeListResponse = {
  items: AdminBadgeSummary[];
  total: number;
  page: number;
  pageSize: number;
};

export type AdminBadgeResponse = AdminBadgeDetail;
export type CreateAdminBadgeResponse = AdminBadgeDetail;
export type UpdateAdminBadgeResponse = AdminBadgeDetail;

export type UpdateAdminBadgeStatusResponse = {
  id: string;
  status: AdminBadgeStatus;
};

/* ---- Input Types ---- */
export type AdminBadgeListInput = {
  status?: AdminBadgeStatus;
  category?: BadgeCategory;
  rarity?: BadgeRarity;
  assignmentType?: BadgeAssignmentType;
  tags?: string[];
  q?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
};

export type CreateAdminBadgeInput = z.infer<typeof CreateAdminBadgeRequestSchema>;
export type UpdateAdminBadgeInput = z.infer<typeof UpdateAdminBadgeRequestSchema>;
export type UpdateAdminBadgeStatusInput = z.infer<typeof UpdateAdminBadgeStatusResetScheam>;

/* ---- Filter Store Types ---- */
export type AdminBadgeFilterActions = {
  setFilters: (filters: Partial<AdminBadgeListInput>) => void;
  resetFilters: () => void;
};

export type AdminBadgeFilterStore = Omit<AdminBadgeListInput, "page" | "pageSize" | "sort"> &
  Required<Pick<AdminBadgeListInput, "page" | "pageSize" | "sort">> &
  AdminBadgeFilterActions;
