import { FeedbackCategory } from "@/resources/user-feedback";

/* ---- Time Period Types ---- */
export type TimePeriod = "last_7_days" | "last_30_days" | "last_60_days" | "last_90_days" | "all_time";

/* ---- User Activity Analytics ---- */
export type UserActivitySummaryInput = {
  timePeriod: TimePeriod;
};

export type UserActivitySummaryResponse = {
  totalRegisteredUsers: number;
  newUsersInPeriod: number;
  growthRate: number | null;
  growthPeriodLabel: string | null;
  quizCompletions: {
    count: number;
    mostPopularQuiz: {
      id: string;
      title: string;
    } | null;
  };
  questCompletions: {
    count: number;
    mostPopularQuest: {
      id: string;
      title: string;
    } | null;
  };
  feedback: {
    totalFeedback: number;
    averageRating: number | null;
    negativeFeedbackInPeriod: number;
  };
};

export type RegistrationsAndGrowthInput = {
  timePeriod: TimePeriod;
};

export type RegistrationsAndGrowthResponse = {
  newRegistrations: number;
  growthRate: number | null;
  currentPeriodNewUsers: number;
  previousPeriodNewUsers: number | null;
  periodLabel: string | null;
};

export type TopScorersResponse = {
  topScorers: Array<{
    rank: number;
    userId: string;
    name?: string | null;
    username?: string | null;
    avatarUrl?: string | null;
    country: string | null;
    bibleIQScore: number;
  }>;
};

/* ---- Group Engagement Analytics ---- */
export type MostActiveGroupsInput = {
  timePeriod: TimePeriod;
  page?: number;
  pageSize?: number;
};

export type MostActiveGroupsResponse = {
  items: Array<{
    groupId: string;
    groupName: string;
    memberCount: number;
    activityScore: number;
    quizCompletions: number;
    questCompletions: number;
    assignmentParticipationRate: number;
  }>;
  total: number;
  page: number;
  pageSize: number;
};

/* ---- Content Performance Analytics ---- */
export type MostPopularQuizzesInput = {
  timePeriod: TimePeriod;
  page?: number;
  pageSize?: number;
};

export type MostPopularQuizzesResponse = {
  items: Array<{
    quizTypeId: string;
    title: string;
    completions: number;
    averageScore: number | null;
  }>;
  total: number;
  page: number;
  pageSize: number;
};

export type MostPopularQuestsInput = {
  timePeriod: TimePeriod;
  page?: number;
  pageSize?: number;
};

export type MostPopularQuestsResponse = {
  items: Array<{
    questTypeId: string;
    title: string;
    completions: number;
    dropOffPercentage: number | null;
    averageProgress: number | null;
  }>;
  total: number;
  page: number;
  pageSize: number;
};

export type HighAbandonRateQuestsInput = {
  timePeriod: TimePeriod;
  page?: number;
  pageSize?: number;
};

export type HighAbandonRateQuestsResponse = {
  items: Array<{
    questTypeId: string;
    title: string;
    dropOffPercentage: number;
  }>;
  total: number;
  page: number;
  pageSize: number;
};

/* ---- Feedback Analytics ---- */
export type FeedbackSummaryInput = {
  timePeriod: TimePeriod;
};

export type FeedbackSummaryResponse = {
  totalFeedback: number;
  averageRating: number | null;
  bugReportsCount: number;
  negativeFeedbackCount: number;
  timePeriod: TimePeriod;
};

export type FeedbackCategoryBreakdownInput = {
  timePeriod: TimePeriod;
};

export type FeedbackCategoryBreakdownResponse = {
  categories: Array<{
    category: FeedbackCategory;
    label: string;
    count: number;
  }>;
};

export type RecentFeedbackInput = {
  page?: number;
  pageSize?: number;
};

export type RecentFeedbackResponse = {
  items: Array<{
    feedbackId: string;
    userId: string;
    userName: string;
    date: string;
    category: FeedbackCategory;
    categoryLabel: string;
    rating: number | null;
    message: string;
  }>;
  total: number;
  page: number;
  pageSize: number;
};

/* ---- Users By Location Analytics ---- */
export type UsersByLocationInput = {
  timePeriod: TimePeriod;
};

export type LocationBreakdown = {
  location: string;
  userCount: number;
  percentage: number;
};

export type UsersByLocationResponse = {
  locations: LocationBreakdown[];
  totalUsers: number;
};

/* ---- State Type ---- */
export type AdminDashboardState = {
  timePeriod: TimePeriod;
  setTimePeriod: (timePeriod: TimePeriod) => void;
};
