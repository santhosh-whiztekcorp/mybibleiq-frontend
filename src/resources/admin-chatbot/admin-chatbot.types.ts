import { z } from "zod";
import {
  ChatbotPositionEnum,
  ChatbotPageSlugEnum,
  ChatbotQuickActionSectionEnum,
  ChatbotResponseCategoryEnum,
  ChatbotConversationStatusEnum,
  ChatbotMessageRoleEnum,
  UpdateChatbotConfigRequestSchema,
  UpdateChatbotQuickActionRequestSchema,
  CreateChatbotResponseRequestSchema,
  UpdateChatbotResponseRequestSchema,
} from "./admin-chatbot.schemas";

/* ---- Enum Types ---- */
export type ChatbotPosition = z.infer<typeof ChatbotPositionEnum>;
export type ChatbotPageSlug = z.infer<typeof ChatbotPageSlugEnum>;
export type ChatbotQuickActionSection = z.infer<typeof ChatbotQuickActionSectionEnum>;
export type ChatbotResponseCategory = z.infer<typeof ChatbotResponseCategoryEnum>;
export type ChatbotConversationStatus = z.infer<typeof ChatbotConversationStatusEnum>;
export type ChatbotMessageRole = z.infer<typeof ChatbotMessageRoleEnum>;

/* ---- Nested Types ---- */
export type ChatbotMessage = {
  id: string;
  role: ChatbotMessageRole;
  content: string;
  responseId?: string;
  createdAt: string;
  avatarUrl?: string;
};

export type ChatbotConversationUser = {
  id: string;
  name: string;
  avatarUrl?: string;
};

export type ChatbotStatsCategoryBreakdown = {
  category: ChatbotResponseCategory;
  count: number;
};

/* ---- Detail Types (Responses) ---- */

/* -- Config -- */
export type ChatbotConfigDetail = {
  id: string;
  name: string;
  tagline: string;
  welcomeMessage: string;
  leftAvatarUrl?: string;
  rightAvatarUrl?: string;
  position: ChatbotPosition;
  enabled: boolean;
  showOnPages: ChatbotPageSlug[];
  createdAt: string;
  updatedAt: string;
};

/* -- Quick Actions -- */
export type ChatbotQuickActionDetail = {
  id: string;
  section: ChatbotQuickActionSection;
  label: string;
  enabled: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type ChatbotQuickActionListResponse = {
  quickActions: ChatbotQuickActionDetail[]; // Adjusted based on previous pattern seeing wrapping
};

/* -- Responses (FAQs) -- */
export type ChatbotResponseDetail = {
  id: string;
  category: ChatbotResponseCategory;
  question: string;
  answer: string;
  keywords: string[];
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ChatbotResponseListResponse = {
  items: ChatbotResponseDetail[];
  total: number;
  page: number;
  pageSize: number;
};

/* -- Analytics -- */
export type ChatbotTotalConversationsResponse = {
  total: number;
  changePercent: number | null;
};

export type ChatbotAvgResponseTimeResponse = {
  avgResponseTimeSeconds: number;
  changePercent: number | null;
};

export type ChatbotMostAskedQuestionItem = {
  question: string;
  count: number;
};

export type ChatbotMostAskedQuestionsResponse = {
  items: ChatbotMostAskedQuestionItem[];
};

export type ChatbotStatsResponse = {
  totalConversations: number;
  resolvedConversations: number;
  avgResponseTime: number;
  topCategories: ChatbotStatsCategoryBreakdown[];
  conversationsThisWeek: number;
};

/* -- Conversations -- */
export type ChatbotConversationSummary = {
  id: string;
  userId: string;
  userName: string;
  name: string;
  username: string;
  avatarUrl?: string;
  status: ChatbotConversationStatus;
  messageCount: number;
  startedAt: string;
  lastMessageAt: string;
};

export type ChatbotConversationListResponse = {
  items: ChatbotConversationSummary[];
  total: number;
  page: number;
  pageSize: number;
};

export type ChatbotConversationStatsResponse = {
  total: number;
  resolved: number;
  unresolved: number;
};

export type ChatbotConversationDetail = {
  id: string;
  user?: ChatbotConversationUser;
  status: ChatbotConversationStatus | null;
  startedAt: string;
  messages: { items: ChatbotMessage[]; total: number; page: number; pageSize: number };
};

/* ---- Input Types ---- */
export type UpdateChatbotConfigInput = z.infer<typeof UpdateChatbotConfigRequestSchema>;

export type UpdateChatbotQuickActionInput = z.infer<typeof UpdateChatbotQuickActionRequestSchema>;

export type QuickActionUpdatePayload = {
  section: string;
  label: string;
  enabled: boolean;
  sortOrder: number;
};

export type CreateChatbotResponseInput = z.infer<typeof CreateChatbotResponseRequestSchema>;
export type UpdateChatbotResponseInput = z.infer<typeof UpdateChatbotResponseRequestSchema>;

export type ChatbotResponseListInput = {
  page?: number;
  pageSize?: number;
  category?: ChatbotResponseCategory | "";
  q?: string;
};

export type ChatbotConversationListInput = {
  page?: number;
  pageSize?: number;
  userId?: string;
  status?: ChatbotConversationStatus;
  sort?: string;
};

/* ---- Filter Store Types ---- */
export type ChatbotResponseFilterActions = {
  setFilters: (filters: Partial<ChatbotResponseListInput>) => void;
  resetFilters: () => void;
};

export type ChatbotResponseFilterStore = Omit<ChatbotResponseListInput, "page" | "pageSize"> &
  Required<Pick<ChatbotResponseListInput, "page" | "pageSize">> &
  ChatbotResponseFilterActions;

export type ChatbotConversationFilterActions = {
  setFilters: (filters: Partial<ChatbotConversationListInput>) => void;
  resetFilters: () => void;
};

export type ChatbotConversationFilterStore = Omit<ChatbotConversationListInput, "page" | "pageSize" | "sort"> &
  Required<Pick<ChatbotConversationListInput, "page" | "pageSize" | "sort">> &
  ChatbotConversationFilterActions;
