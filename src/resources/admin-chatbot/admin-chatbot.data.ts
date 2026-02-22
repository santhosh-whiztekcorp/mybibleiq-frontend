import type {
  UpdateChatbotConfigInput,
  CreateChatbotResponseInput,
  ChatbotResponseFilterStore,
  ChatbotResponseListInput,
  ChatbotConversationFilterStore,
  ChatbotConversationListInput,
} from "./admin-chatbot.types";

/* ---- Default Form Values ---- */
export const defaultUpdateConfigValues: Partial<UpdateChatbotConfigInput> = {
  name: "",
  tagline: "",
  welcomeMessage: "",
  enabled: true,
  position: "BOTTOM_RIGHT",
  showOnPages: ["dashboard"],
};

export const defaultCreateResponseValues: CreateChatbotResponseInput = {
  category: "GENERAL_HELP",
  question: "",
  answer: "",
  keywords: [],
  enabled: true,
};

/* ---- Default Filter Values ---- */

// Responses (FAQs)
export const defaultResponseFilters: Pick<ChatbotResponseFilterStore, "page" | "pageSize"> &
  Omit<ChatbotResponseListInput, "page" | "pageSize"> = {
  category: undefined,
  q: undefined,
  page: 1,
  pageSize: 20,
};

// Conversations
export const defaultConversationFilters: Pick<ChatbotConversationFilterStore, "page" | "pageSize" | "sort"> &
  Omit<ChatbotConversationListInput, "page" | "pageSize" | "sort"> = {
  status: undefined,
  userId: undefined,
  page: 1,
  pageSize: 20,
  sort: "-createdAt",
};
