import { apiClient } from "@/config/apiClient";
import { endpoints } from "@/constants/endpoints";
import { ApiResponseEnvelope } from "@/types/resource";
import { unwrapApiResponse } from "@/utils/network";
import type {
  ChatbotConfigDetail,
  UpdateChatbotConfigInput,
  ChatbotQuickActionDetail,
  ChatbotQuickActionListResponse,
  QuickActionUpdatePayload,
  ChatbotResponseListInput,
  ChatbotResponseListResponse,
  ChatbotResponseDetail,
  CreateChatbotResponseInput,
  UpdateChatbotResponseInput,
  ChatbotTotalConversationsResponse,
  ChatbotAvgResponseTimeResponse,
  ChatbotMostAskedQuestionsResponse,
  ChatbotStatsResponse,
  ChatbotConversationListInput,
  ChatbotConversationListResponse,
  ChatbotConversationDetail,
  ChatbotConversationStatsResponse,
} from "./admin-chatbot.types";

/* ---- Config ---- */
export const getChatbotConfig = async (): Promise<ChatbotConfigDetail> => {
  const response = await apiClient.get<ApiResponseEnvelope<ChatbotConfigDetail | { config: ChatbotConfigDetail }>>(
    endpoints.adminChatbot.getConfig
  );
  const data = unwrapApiResponse<ChatbotConfigDetail | { config: ChatbotConfigDetail }>(response);

  if (typeof data === "object" && data !== null && "config" in data) {
    return (data as { config: ChatbotConfigDetail }).config;
  }

  return data as ChatbotConfigDetail;
};

export const updateChatbotConfig = async (input: UpdateChatbotConfigInput): Promise<ChatbotConfigDetail> => {
  const formData = new FormData();
  Object.entries(input).forEach(([key, value]) => {
    if (key === "showOnPages" && Array.isArray(value)) {
      value.forEach((v: string) => formData.append("showOnPages", v));
    } else if (value !== undefined && value !== null) {
      if (value instanceof Blob) {
        formData.append(key, value);
      } else {
        formData.append(key, String(value));
      }
    }
  });

  const response = await apiClient.put<ApiResponseEnvelope<{ config: ChatbotConfigDetail }>>(
    endpoints.adminChatbot.updateConfig,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  const data = unwrapApiResponse<{ config: ChatbotConfigDetail }>(response);
  return data.config;
};

/* ---- Quick Actions ---- */
export const getChatbotQuickActions = async (enabledOnly = false): Promise<ChatbotQuickActionDetail[]> => {
  const response = await apiClient.get<ApiResponseEnvelope<ChatbotQuickActionListResponse>>(
    endpoints.adminChatbot.getQuickActions,
    { params: { enabled: enabledOnly } }
  );
  const data = unwrapApiResponse<ChatbotQuickActionListResponse>(response);
  return data.quickActions;
};

export const updateChatbotQuickActions = async (
  quickActions: QuickActionUpdatePayload[]
): Promise<ChatbotQuickActionListResponse> => {
  const response = await apiClient.put<ApiResponseEnvelope<ChatbotQuickActionListResponse>>(
    endpoints.adminChatbot.getQuickActions,
    { quickActions }
  );
  return unwrapApiResponse(response);
};

/* ---- Responses (FAQs) ---- */
export const getChatbotResponseList = async (input: ChatbotResponseListInput): Promise<ChatbotResponseListResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<ChatbotResponseListResponse>>(
    endpoints.adminChatbot.getResponses,
    { params: input }
  );
  return unwrapApiResponse(response);
};

export const createChatbotResponse = async (input: CreateChatbotResponseInput): Promise<ChatbotResponseDetail> => {
  const response = await apiClient.post<ApiResponseEnvelope<ChatbotResponseDetail>>(
    endpoints.adminChatbot.createResponse,
    input
  );
  return unwrapApiResponse(response);
};

export const updateChatbotResponse = async (
  id: string,
  input: UpdateChatbotResponseInput
): Promise<ChatbotResponseDetail> => {
  const response = await apiClient.put<ApiResponseEnvelope<ChatbotResponseDetail>>(
    endpoints.adminChatbot.updateResponse(id),
    input
  );
  return unwrapApiResponse(response);
};

export const deleteChatbotResponse = async (id: string): Promise<void> => {
  await apiClient.delete(endpoints.adminChatbot.deleteResponse(id));
};

/* ---- Analytics & Logs ---- */
export const getChatbotStats = async (): Promise<ChatbotStatsResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<ChatbotStatsResponse>>(endpoints.adminChatbot.getStats);
  return unwrapApiResponse(response);
};

export const getChatbotTotalConversations = async (): Promise<ChatbotTotalConversationsResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<ChatbotTotalConversationsResponse>>(
    endpoints.adminChatbot.getTotalConversations
  );
  return unwrapApiResponse(response);
};

export const getChatbotAvgResponseTime = async (): Promise<ChatbotAvgResponseTimeResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<ChatbotAvgResponseTimeResponse>>(
    endpoints.adminChatbot.getAvgResponseTime
  );
  return unwrapApiResponse(response);
};

export const getChatbotMostAskedQuestions = async (): Promise<ChatbotMostAskedQuestionsResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<ChatbotMostAskedQuestionsResponse>>(
    endpoints.adminChatbot.getMostAskedQuestions
  );
  return unwrapApiResponse(response);
};

export const getChatbotConversationList = async (
  input: ChatbotConversationListInput
): Promise<ChatbotConversationListResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<ChatbotConversationListResponse>>(
    endpoints.adminChatbot.getConversations,
    { params: input }
  );
  return unwrapApiResponse(response);
};

export const getChatbotConversationDetail = async (
  id: string,
  page: number = 1,
  pageSize: number = 20
): Promise<ChatbotConversationDetail> => {
  const response = await apiClient.get<ApiResponseEnvelope<ChatbotConversationDetail>>(
    endpoints.adminChatbot.getConversationDetails(id),
    { params: { page, pageSize } }
  );
  return unwrapApiResponse(response);
};

export const getChatbotConversationStats = async (): Promise<ChatbotConversationStatsResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<ChatbotConversationStatsResponse>>(
    endpoints.adminChatbot.getConversationStats
  );
  return unwrapApiResponse(response);
};
