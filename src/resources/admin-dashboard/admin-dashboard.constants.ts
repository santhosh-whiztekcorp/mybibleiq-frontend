import type { TimePeriod } from "./admin-dashboard.types";

/* ---- Time Period Constants ---- */
export const TIME_PERIODS: Array<{ label: string; value: TimePeriod }> = [
  { label: "Last 7 days", value: "last_7_days" },
  { label: "Last 30 days", value: "last_30_days" },
  { label: "Last 60 days", value: "last_60_days" },
  { label: "Last 90 days", value: "last_90_days" },
  { label: "All time", value: "all_time" },
];

export const ADMIN_DASHBOARD_TIME_PERIOD_LABELS: Record<TimePeriod, string> = {
  last_7_days: "Last 7 days",
  last_30_days: "Last 30 days",
  last_60_days: "Last 60 days",
  last_90_days: "Last 90 days",
  all_time: "All time",
};

/* ---- Pagination Defaults ---- */
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

/* ---- Feedback Categories ---- */
export const FEEDBACK_CATEGORY_LABELS: Record<string, string> = {
  bug_report: "Bug Report",
  feature_request: "Feature Request",
  general: "General Feedback",
  other: "Other",
};

/* ---- Query Keys ---- */
export const adminAnalyticsQueryKeys = {
  all: ["admin-analytics"] as const,
  userActivity: {
    all: () => [...adminAnalyticsQueryKeys.all, "user-activity"] as const,
    summary: (timePeriod: TimePeriod) =>
      [...adminAnalyticsQueryKeys.userActivity.all(), "summary", timePeriod] as const,
    registrationsAndGrowth: (timePeriod: TimePeriod) =>
      [...adminAnalyticsQueryKeys.userActivity.all(), "registrations-growth", timePeriod] as const,
    topScorers: () => [...adminAnalyticsQueryKeys.userActivity.all(), "top-scorers"] as const,
    usersByLocation: (timePeriod: TimePeriod) =>
      [...adminAnalyticsQueryKeys.userActivity.all(), "users-by-location", timePeriod] as const,
  },
  groupEngagement: {
    all: () => [...adminAnalyticsQueryKeys.all, "group-engagement"] as const,
    mostActiveGroups: (timePeriod: TimePeriod, page?: number, pageSize?: number) =>
      [...adminAnalyticsQueryKeys.groupEngagement.all(), "most-active-groups", timePeriod, page, pageSize] as const,
  },
  contentPerformance: {
    all: () => [...adminAnalyticsQueryKeys.all, "content-performance"] as const,
    mostPopularQuizzes: (timePeriod: TimePeriod, page?: number, pageSize?: number) =>
      [
        ...adminAnalyticsQueryKeys.contentPerformance.all(),
        "most-popular-quizzes",
        timePeriod,
        page,
        pageSize,
      ] as const,
    mostPopularQuests: (timePeriod: TimePeriod, page?: number, pageSize?: number) =>
      [...adminAnalyticsQueryKeys.contentPerformance.all(), "most-popular-quests", timePeriod, page, pageSize] as const,
    highAbandonRate: (timePeriod: TimePeriod, page?: number, pageSize?: number) =>
      [...adminAnalyticsQueryKeys.contentPerformance.all(), "high-abandon-rate", timePeriod, page, pageSize] as const,
  },
  feedback: {
    all: () => [...adminAnalyticsQueryKeys.all, "feedback"] as const,
    summary: (timePeriod: TimePeriod) => [...adminAnalyticsQueryKeys.feedback.all(), "summary", timePeriod] as const,
    categoryBreakdown: (timePeriod: TimePeriod) =>
      [...adminAnalyticsQueryKeys.feedback.all(), "category-breakdown", timePeriod] as const,
    recent: (page?: number, pageSize?: number) =>
      [...adminAnalyticsQueryKeys.feedback.all(), "recent", page, pageSize] as const,
  },
};
