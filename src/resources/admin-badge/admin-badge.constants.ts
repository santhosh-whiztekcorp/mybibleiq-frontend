import {
  AdminBadgeStausEnum,
  BadgeRarityEnum,
  BadgeCategoryEnum,
  BadgeAssignmentTypeEnum,
  BadgeTriggerTypeEnum,
  BadgeConditionOperatorEnum,
  BadgeStatusActionEnum,
  TimeBasedMetricEnum,
  StreakBasedMetricEnum,
  CountBasedMetricEnum,
  MilestoneBasedMetricEnum,
  EngagementBasedMetricEnum,
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
  TimeBasedConfig,
  StreakBasedConfig,
  CountBasedConfig,
  MilestoneBasedConfig,
  EngagementBasedConfig,
} from "./admin-badge.types";

/* ---- Badge Status Options ---- */
export const BADGE_STATUS_OPTIONS = AdminBadgeStausEnum.options;

export const BADGE_STATUS_LABELS: Record<AdminBadgeStatus, string> = {
  Draft: "Draft",
  Published: "Published",
  Archived: "Archived",
};

export const BADGE_STATUS_SELECT_OPTIONS = BADGE_STATUS_OPTIONS.map((value) => ({
  value,
  label: BADGE_STATUS_LABELS[value],
}));

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

export const BADGE_RARITY_SELECT_OPTIONS = BADGE_RARITY_OPTIONS.map((value) => ({
  value,
  label: BADGE_RARITY_LABELS[value],
}));

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

export const BADGE_CATEGORY_SELECT_OPTIONS = BADGE_CATEGORY_OPTIONS.map((value) => ({
  value,
  label: BADGE_CATEGORY_LABELS[value],
}));

/* ---- Badge Assignment Type Options ---- */
export const BADGE_ASSIGNMENT_TYPE_OPTIONS = BadgeAssignmentTypeEnum.options;

export const BADGE_ASSIGNMENT_TYPE_LABELS: Record<BadgeAssignmentType, string> = {
  Manual: "Manual Assignment",
  Automatic: "Automatic Trigger",
};

export const BADGE_ASSIGNMENT_TYPE_DESCRIPTIONS: Record<BadgeAssignmentType, string> = {
  Manual: "Badge is attached to specific content by admin during creation.",
  Automatic: "Badge is earned automatically when user meets specific criteria.",
};

export const BADGE_ASSIGNMENT_TYPE_SELECT_OPTIONS = BADGE_ASSIGNMENT_TYPE_OPTIONS.map((value) => ({
  value,
  label: BADGE_ASSIGNMENT_TYPE_LABELS[value],
}));

/* ---- Badge Trigger Type Options ---- */
export const BADGE_TRIGGER_TYPE_OPTIONS = BadgeTriggerTypeEnum.options;

export const BADGE_TRIGGER_TYPE_LABELS: Record<BadgeTriggerType, string> = {
  TimeBased: "Time Based",
  StreakBased: "Streak Based",
  CountBased: "Count Based",
  MilestoneBased: "Milestone Based",
  EngagementBased: "Engagement Based",
};

export const BADGE_TRIGGER_TYPE_SELECT_OPTIONS = BADGE_TRIGGER_TYPE_OPTIONS.map((value) => ({
  value,
  label: BADGE_TRIGGER_TYPE_LABELS[value],
}));

/* ---- Badge Condition Operator Options ---- */
export const BADGE_CONDITION_OPERATOR_OPTIONS = BadgeConditionOperatorEnum.options;

export const BADGE_CONDITION_OPERATOR_LABELS: Record<BadgeConditionOperator, string> = {
  GreaterThanOrEqual: "Greater Than Or Equal",
  Equals: "Equals",
  LessThanOrEqual: "Less Than Or Equal",
};

export const BADGE_CONDITION_OPERATOR_SELECT_OPTIONS = BADGE_CONDITION_OPERATOR_OPTIONS.map((value) => ({
  value,
  label: BADGE_CONDITION_OPERATOR_LABELS[value],
}));

/* ---- Time Based Metric Options ---- */
export const TIME_BASED_METRIC_OPTIONS = TimeBasedMetricEnum.options;

export const TIME_BASED_METRIC_LABELS: Record<TimeBasedConfig, string> = {
  DailyTime: "Daily time (minutes)",
  TotalCumulativeTime: "Total cumulative time (minutes)",
  ExtendedSession: "Extended session (minutes)",
};

export const TIME_BASED_METRIC_SELECT_OPTIONS = TIME_BASED_METRIC_OPTIONS.map((value) => ({
  value,
  label: TIME_BASED_METRIC_LABELS[value],
}));

/* ---- Streak Based Metric Options ---- */
export const STREAK_BASED_METRIC_OPTIONS = StreakBasedMetricEnum.options;

export const STREAK_BASED_METRIC_LABELS: Record<StreakBasedConfig, string> = {
  ConsecutiveLoginDays: "Consecutive login days",
};

export const STREAK_BASED_METRIC_SELECT_OPTIONS = STREAK_BASED_METRIC_OPTIONS.map((value) => ({
  value,
  label: STREAK_BASED_METRIC_LABELS[value],
}));

/* ---- Count Based Metric Options ---- */
export const COUNT_BASED_METRIC_OPTIONS = CountBasedMetricEnum.options;

export const COUNT_BASED_METRIC_LABELS: Record<CountBasedConfig, string> = {
  TotalQuizzes: "Total Quizzes completed",
  TotalQuests: "Total Quests completed",
  TotalSwordDrills: "Total Sword Drills completed",
  TotalFlashcards: "Total Flashcards learned",
};

export const COUNT_BASED_METRIC_SELECT_OPTIONS = COUNT_BASED_METRIC_OPTIONS.map((value) => ({
  value,
  label: COUNT_BASED_METRIC_LABELS[value],
}));

/* ---- Milestone Based Metric Options ---- */
export const MILESTONE_BASED_METRIC_OPTIONS = MilestoneBasedMetricEnum.options;

export const MILESTONE_BASED_METRIC_LABELS: Record<MilestoneBasedConfig, string> = {
  TotalXP: "Total XP earned",
};

export const MILESTONE_BASED_METRIC_SELECT_OPTIONS = MILESTONE_BASED_METRIC_OPTIONS.map((value) => ({
  value,
  label: MILESTONE_BASED_METRIC_LABELS[value],
}));

/* ---- Engagement Based Metric Options ---- */
export const ENGAGEMENT_BASED_METRIC_OPTIONS = EngagementBasedMetricEnum.options;

export const ENGAGEMENT_BASED_METRIC_LABELS: Record<EngagementBasedConfig, string> = {
  GroupJoined: "Groups Joined",
  TotalGroupQuizzesCompleted: "Total Group Quizzes Completed",
  TotalGroupQuestsCompleted: "Total Group Quests Completed",
};

export const ENGAGEMENT_BASED_METRIC_SELECT_OPTIONS = ENGAGEMENT_BASED_METRIC_OPTIONS.map((value) => ({
  value,
  label: ENGAGEMENT_BASED_METRIC_LABELS[value],
}));

/* ---- Badge Metric Options By Trigger ---- */
export const BADGE_METRIC_OPTIONS_BY_TRIGGER: Record<BadgeTriggerType, { value: string; label: string }[]> = {
  TimeBased: TIME_BASED_METRIC_SELECT_OPTIONS,
  StreakBased: STREAK_BASED_METRIC_SELECT_OPTIONS,
  CountBased: COUNT_BASED_METRIC_SELECT_OPTIONS,
  MilestoneBased: MILESTONE_BASED_METRIC_SELECT_OPTIONS,
  EngagementBased: ENGAGEMENT_BASED_METRIC_SELECT_OPTIONS,
};

/* ---- Badge Status Actions ---- */
export const BADGE_STATUS_ACTIONS = BadgeStatusActionEnum.options;

export const BADGE_STATUS_ACTION_LABELS: Record<BadgeStatusAction, string> = {
  Publish: "Publish",
  Clone: "Clone",
  Archive: "Archive",
};

export const BADGE_STATUS_ACTION_SELECT_OPTIONS = BADGE_STATUS_ACTIONS.map((value) => ({
  value,
  label: BADGE_STATUS_ACTION_LABELS[value],
}));

/* ---- Query Keys ---- */
export const adminBadgeQueryKeys = {
  all: ["admin-badges"] as const,
  lists: () => [...adminBadgeQueryKeys.all, "list"] as const,
  list: (filters: AdminBadgeListInput) => [...adminBadgeQueryKeys.lists(), filters] as const,
  details: () => [...adminBadgeQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...adminBadgeQueryKeys.details(), id] as const,
  stats: () => [...adminBadgeQueryKeys.all, "stats"] as const,
};
