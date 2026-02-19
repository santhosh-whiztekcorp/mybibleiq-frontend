import { create } from "zustand";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  getUserActivitySummary,
  getRegistrationsAndGrowth,
  getTopScorers,
  getMostActiveGroups,
  getMostPopularQuizzes,
  getFeedbackSummary,
  getFeedbackCategoryBreakdown,
  getRecentFeedback,
  getUsersByLocation,
  getMostPopularQuests,
  getHighAbandonRateQuests,
} from "./admin-dashboard.api";
import { adminAnalyticsQueryKeys } from "./admin-dashboard.constants";
import type {
  MostActiveGroupsInput,
  MostPopularQuizzesInput,
  MostPopularQuestsInput,
  HighAbandonRateQuestsInput,
  RecentFeedbackInput,
  AdminDashboardState,
} from "./admin-dashboard.types";

/* ---- Store ---- */
export const useAdminDashboardStore = create<AdminDashboardState>((set) => ({
  timePeriod: "last_30_days",
  setTimePeriod: (timePeriod) => set({ timePeriod }),
}));

/* ---- User Activity ---- */
export const useUserActivitySummary = () => {
  const timePeriod = useAdminDashboardStore((state) => state.timePeriod);
  return useQuery({
    queryKey: adminAnalyticsQueryKeys.userActivity.summary(timePeriod),
    queryFn: () => getUserActivitySummary({ timePeriod }),
  });
};

export const useRegistrationsAndGrowth = () => {
  const timePeriod = useAdminDashboardStore((state) => state.timePeriod);
  return useQuery({
    queryKey: adminAnalyticsQueryKeys.userActivity.registrationsAndGrowth(timePeriod),
    queryFn: () => getRegistrationsAndGrowth({ timePeriod }),
  });
};

export const useTopScorers = () =>
  useQuery({
    queryKey: adminAnalyticsQueryKeys.userActivity.topScorers(),
    queryFn: () => getTopScorers(),
  });

export const useUsersByLocation = () => {
  const timePeriod = useAdminDashboardStore((state) => state.timePeriod);
  return useQuery({
    queryKey: adminAnalyticsQueryKeys.userActivity.usersByLocation(timePeriod),
    queryFn: () => getUsersByLocation({ timePeriod }),
  });
};

/* ---- Group Engagement ---- */
export const useMostActiveGroups = (filters: Omit<MostActiveGroupsInput, "timePeriod" | "page">) => {
  const timePeriod = useAdminDashboardStore((state) => state.timePeriod);
  return useInfiniteQuery({
    queryKey: adminAnalyticsQueryKeys.groupEngagement.mostActiveGroups(timePeriod, 1, filters.pageSize ?? 20),
    queryFn: ({ pageParam = 1 }) =>
      getMostActiveGroups({
        timePeriod,
        ...filters,
        page: pageParam,
        pageSize: filters.pageSize ?? 20,
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
};

/* ---- Content Performance ---- */
export const useMostPopularQuizzes = (filters: Omit<MostPopularQuizzesInput, "timePeriod" | "page">) => {
  const timePeriod = useAdminDashboardStore((state) => state.timePeriod);
  return useInfiniteQuery({
    queryKey: adminAnalyticsQueryKeys.contentPerformance.mostPopularQuizzes(timePeriod, 1, filters.pageSize ?? 20),
    queryFn: ({ pageParam = 1 }) =>
      getMostPopularQuizzes({
        timePeriod,
        ...filters,
        page: pageParam,
        pageSize: filters.pageSize ?? 20,
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
};

export const useMostPopularQuests = (filters: Omit<MostPopularQuestsInput, "timePeriod" | "page">) => {
  const timePeriod = useAdminDashboardStore((state) => state.timePeriod);
  return useInfiniteQuery({
    queryKey: adminAnalyticsQueryKeys.contentPerformance.mostPopularQuests(timePeriod, 1, filters.pageSize ?? 20),
    queryFn: ({ pageParam = 1 }) =>
      getMostPopularQuests({
        timePeriod,
        ...filters,
        page: pageParam,
        pageSize: filters.pageSize ?? 20,
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
};

export const useHighAbandonRateQuests = (filters: Omit<HighAbandonRateQuestsInput, "timePeriod" | "page">) => {
  const timePeriod = useAdminDashboardStore((state) => state.timePeriod);
  return useInfiniteQuery({
    queryKey: adminAnalyticsQueryKeys.contentPerformance.highAbandonRate(timePeriod, 1, filters.pageSize ?? 20),
    queryFn: ({ pageParam = 1 }) =>
      getHighAbandonRateQuests({
        timePeriod,
        ...filters,
        page: pageParam,
        pageSize: filters.pageSize ?? 20,
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
};

/* ---- Feedback ---- */
export const useFeedbackSummary = () => {
  const timePeriod = useAdminDashboardStore((state) => state.timePeriod);
  return useQuery({
    queryKey: adminAnalyticsQueryKeys.feedback.summary(timePeriod),
    queryFn: () => getFeedbackSummary({ timePeriod }),
  });
};

export const useFeedbackCategoryBreakdown = () => {
  const timePeriod = useAdminDashboardStore((state) => state.timePeriod);
  return useQuery({
    queryKey: adminAnalyticsQueryKeys.feedback.categoryBreakdown(timePeriod),
    queryFn: () => getFeedbackCategoryBreakdown({ timePeriod }),
  });
};

export const useRecentFeedback = (filters: Omit<RecentFeedbackInput, "page">) =>
  useInfiniteQuery({
    queryKey: adminAnalyticsQueryKeys.feedback.recent(1, filters.pageSize ?? 20),
    queryFn: ({ pageParam = 1 }) =>
      getRecentFeedback({
        ...filters,
        page: pageParam,
        pageSize: filters.pageSize ?? 20,
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
