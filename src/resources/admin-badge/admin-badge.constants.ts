import {
  AdminBadgeStausEnum,
  BadgeRarityEnum,
  BadgeCategoryEnum,
  BadgeAssignmentTypeEnum,
  BadgeTriggerTypeEnum,
  BadgeConditionOperatorEnum,
  BadgeStatusActionEnum,
} from "./admin-badge.schemas";
import type {
  AdminBadgeStatus,
  BadgeRarity,
  BadgeCategory,
  BadgeAssignmentType,
  BadgeTriggerType,
  BadgeConditionOperator,
  BadgeStatusAction,
  AdminBadgeListInput,
} from "./admin-badge.types";

/* ---- Badge Status Options ---- */
export const BADGE_STATUS_OPTIONS = AdminBadgeStausEnum.options;
export const BADGE_STATUS_LABELS: Record<AdminBadgeStatus, string> = {
  Draft: "Draft",
  Published: "Published",
  Archived: "Archived",
};

/* ---- Badge Rarity Options ---- */
export const BADGE_RARITY_OPTIONS = BadgeRarityEnum.options;
export const BADGE_RARITY_LABELS: Record<BadgeRarity, string> = {
  Common: "Common",
  Rare: "Rare",
  Epic: "Epic",
  Legendary: "Legendary",
  Special: "Special",
};
export const BADGE_RARITY_DESCRIPTIONS: Record<BadgeRarity, string> = {
  Common: "Easy to learn, frequent rewards.",
  Rare: "Moderate difficulty or commitment.",
  Epic: "Significant achievement or dedication.",
  Legendary: "Extraordinary accomplishments, very few earn these.",
  Special: "Unique, limited-time, or exclusive badges.",
};

/* ---- Badge Category Options ---- */
export const BADGE_CATEGORY_OPTIONS = BadgeCategoryEnum.options;
export const BADGE_CATEGORY_LABELS: Record<BadgeCategory, string> = {
  Consistency: "Consistency",
  LearningAction: "Learning Action",
  Milestone: "Milestone",
  SpecialEngagement: "Special Engagement",
};
export const BADGE_CATEGORY_DESCRIPTIONS: Record<BadgeCategory, string> = {
  Consistency: "Daily habits, login streaks, time spent studying.",
  LearningAction: "Quiz completions, sword drills, quest stages.",
  Milestone: "Long-term achievements, XP totals, quest completion counts.",
  SpecialEngagement: "Reflections, community actions, sharing, seasonal events.",
};

/* ---- Badge Assignment Type Options ---- */
export const BADGE_ASSIGNMENT_TYPE_OPTIONS = BadgeAssignmentTypeEnum.options;
export const BADGE_ASSIGNMENT_TYPE_LABELS: Record<BadgeAssignmentType, string> = {
  Manual: "Manual Assignment",
  Automatic: "Automatic Trigger",
};
export const BADGE_ASSIGNMENT_TYPE_DESCRIPTIONS: Record<BadgeAssignmentType, string> = {
  Manual:
    'Badge is attached to specific content by admin during creation. Used for: Quest stages, Quest completions, specific quiz rewards, specific sword drill challenges. Examples: "Seeker of Truth" > Romans Road Quest stage 1, "Parables Master" > Parables of Jesus Quiz.',
  Automatic:
    'Badge is earned automatically when user meets specific criteria. Used for: Generic achievements, streaks, totals, behaviors. Examples: "Faithful 7" → 7 consecutive login days, "Quiz Explorer" → 10 quizzes completed.',
};

/* ---- Badge Trigger Type Options ---- */
export const BADGE_TRIGGER_TYPE_OPTIONS = BadgeTriggerTypeEnum.options;
export const BADGE_TRIGGER_TYPE_LABELS: Record<BadgeTriggerType, string> = {
  TimeBased: "Time Based",
  StreakBased: "Streak Based",
  CountBased: "Count Based",
  MilestoneBased: "Milestone Based",
  EngagementBased: "Engagement Based",
};

/* ---- Badge Condition Operator Options ---- */
export const BADGE_CONDITION_OPERATOR_OPTIONS = BadgeConditionOperatorEnum.options;
export const BADGE_CONDITION_OPERATOR_LABELS: Record<BadgeConditionOperator, string> = {
  GreaterThanOrEqual: "Greater Than Or Equal",
  Equals: "Equals",
  LessThanOrEqual: "Less Than Or Equal",
};

/* ---- Badge Status Actions ---- */
export const BADGE_STATUS_ACTIONS = BadgeStatusActionEnum.options;
export const BADGE_STATUS_ACTION_LABELS: Record<BadgeStatusAction, string> = {
  Publish: "Publish",
  Clone: "Clone",
  Archive: "Archive",
};

/* ---- Query Keys ---- */
export const adminBadgeQueryKeys = {
  all: ["admin-badges"] as const,
  lists: () => [...adminBadgeQueryKeys.all, "list"] as const,
  list: (filters: AdminBadgeListInput) => [...adminBadgeQueryKeys.lists(), filters] as const,
  details: () => [...adminBadgeQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...adminBadgeQueryKeys.details(), id] as const,
  stats: () => [...adminBadgeQueryKeys.all, "stats"] as const,
};
