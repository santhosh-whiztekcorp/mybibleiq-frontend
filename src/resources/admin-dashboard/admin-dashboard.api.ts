import { apiClient } from "@/config/apiClient";
import { endpoints } from "@/constants/endpoints";
import { ApiResponseEnvelope } from "@/types/resource";
import type {
  UserActivitySummaryInput,
  UserActivitySummaryResponse,
  RegistrationsAndGrowthInput,
  RegistrationsAndGrowthResponse,
  TopScorersResponse,
  MostActiveGroupsInput,
  MostActiveGroupsResponse,
  MostPopularQuizzesInput,
  MostPopularQuizzesResponse,
  MostPopularQuestsInput,
  MostPopularQuestsResponse,
  HighAbandonRateQuestsInput,
  HighAbandonRateQuestsResponse,
  FeedbackSummaryInput,
  FeedbackSummaryResponse,
  FeedbackCategoryBreakdownInput,
  FeedbackCategoryBreakdownResponse,
  RecentFeedbackInput,
  RecentFeedbackResponse,
  UsersByLocationInput,
  UsersByLocationResponse,
} from "./admin-dashboard.types";

/* ---- User Activity ---- */
export const getUserActivitySummary = async (input: UserActivitySummaryInput): Promise<UserActivitySummaryResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<UserActivitySummaryResponse>>(
    endpoints.adminAnalytics.userActivity.summary,
    {
      params: { timePeriod: input.timePeriod },
    }
  );
  return response.data;
};

export const getRegistrationsAndGrowth = async (
  input: RegistrationsAndGrowthInput
): Promise<RegistrationsAndGrowthResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<RegistrationsAndGrowthResponse>>(
    endpoints.adminAnalytics.userActivity.registrationsAndGrowth,
    {
      params: { timePeriod: input.timePeriod },
    }
  );
  return response.data;
};

export const getTopScorers = async (): Promise<TopScorersResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<TopScorersResponse>>(
    endpoints.adminAnalytics.userActivity.topScorers
  );
  return response.data;
};

export const getUsersByLocation = async (input: UsersByLocationInput): Promise<UsersByLocationResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<UsersByLocationResponse>>(
    endpoints.adminAnalytics.userActivity.usersByLocation,
    {
      params: { timePeriod: input.timePeriod },
    }
  );
  return response.data;
};

/* ---- Group Engagement ---- */
export const getMostActiveGroups = async (input: MostActiveGroupsInput): Promise<MostActiveGroupsResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<MostActiveGroupsResponse>>(
    endpoints.adminAnalytics.groupEngagement.mostActiveGroups,
    {
      params: {
        timePeriod: input.timePeriod,
        page: input.page,
        pageSize: input.pageSize,
      },
    }
  );
  return response.data;
};

/* ---- Content Performance ---- */
export const getMostPopularQuizzes = async (input: MostPopularQuizzesInput): Promise<MostPopularQuizzesResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<MostPopularQuizzesResponse>>(
    endpoints.adminAnalytics.contentPerformance.mostPopularQuizzes,
    {
      params: {
        timePeriod: input.timePeriod,
        page: input.page,
        pageSize: input.pageSize,
      },
    }
  );
  return response.data;
};

export const getMostPopularQuests = async (input: MostPopularQuestsInput): Promise<MostPopularQuestsResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<MostPopularQuestsResponse>>(
    endpoints.adminAnalytics.contentPerformance.mostPopularQuests,
    {
      params: {
        timePeriod: input.timePeriod,
        page: input.page,
        pageSize: input.pageSize,
      },
    }
  );
  return response.data;
};

export const getHighAbandonRateQuests = async (
  input: HighAbandonRateQuestsInput
): Promise<HighAbandonRateQuestsResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<HighAbandonRateQuestsResponse>>(
    endpoints.adminAnalytics.contentPerformance.highAbandonRate,
    {
      params: {
        timePeriod: input.timePeriod,
        page: input.page,
        pageSize: input.pageSize,
      },
    }
  );
  return response.data;
};

/* ---- Feedback ---- */
export const getFeedbackSummary = async (input: FeedbackSummaryInput): Promise<FeedbackSummaryResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<FeedbackSummaryResponse>>(
    endpoints.adminAnalytics.feedback.summary,
    {
      params: { timePeriod: input.timePeriod },
    }
  );
  return response.data;
};

export const getFeedbackCategoryBreakdown = async (
  input: FeedbackCategoryBreakdownInput
): Promise<FeedbackCategoryBreakdownResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<FeedbackCategoryBreakdownResponse>>(
    endpoints.adminAnalytics.feedback.categoryBreakdown,
    {
      params: { timePeriod: input.timePeriod },
    }
  );
  return response.data;
};

export const getRecentFeedback = async (input: RecentFeedbackInput): Promise<RecentFeedbackResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<RecentFeedbackResponse>>(
    endpoints.adminAnalytics.feedback.recent,
    {
      params: {
        page: input.page,
        pageSize: input.pageSize,
      },
    }
  );
  return response.data;
};
