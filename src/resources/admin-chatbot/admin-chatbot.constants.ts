import {
  ChatbotPositionEnum,
  ChatbotPageSlugEnum,
  ChatbotQuickActionSectionEnum,
  ChatbotResponseCategoryEnum,
  ChatbotConversationStatusEnum,
  ChatbotMessageRoleEnum,
} from "./admin-chatbot.schemas";
import type {
  ChatbotResponseListInput,
  ChatbotConversationListInput,
  ChatbotPosition,
  ChatbotPageSlug,
  ChatbotQuickActionSection,
  ChatbotResponseCategory,
  ChatbotConversationStatus,
} from "./admin-chatbot.types";

/* ---- Enum Options ---- */
export const CHATBOT_POSITION_OPTIONS = ChatbotPositionEnum.options;
export const CHATBOT_PAGE_SLUG_OPTIONS = ChatbotPageSlugEnum.options;
export const CHATBOT_QUICK_ACTION_SECTION_OPTIONS = ChatbotQuickActionSectionEnum.options;
export const CHATBOT_RESPONSE_CATEGORY_OPTIONS = ChatbotResponseCategoryEnum.options;
export const CHATBOT_CONVERSATION_STATUS_OPTIONS = ChatbotConversationStatusEnum.options;
export const CHATBOT_MESSAGE_ROLE_OPTIONS = ChatbotMessageRoleEnum.options;

/* ---- Enum Labels ---- */
export const CHATBOT_POSITION_LABELS: Record<ChatbotPosition, string> = {
  BOTTOM_LEFT: "Bottom Left",
  BOTTOM_RIGHT: "Bottom Right",
};

export const CHATBOT_PAGE_SLUG_LABELS: Record<ChatbotPageSlug, string> = {
  dashboard: "Dashboard",
  quests: "Quests",
  quizzes: "Quizzes",
  sword_drill: "Sword Drill",
  leaderboard: "Leaderboard",
  profile: "Profile",
};

export const CHATBOT_QUICK_ACTION_SECTION_LABELS: Record<ChatbotQuickActionSection, string> = {
  profile: "Profile",
  quiz: "Quiz",
  quest: "Quest",
  spirit_food: "Spirit Food",
  sword_drill: "Sword Drill",
  leaderboard: "Leaderboard",
  friends: "Friends",
  group: "Group",
};

export const CHATBOT_QUICK_ACTION_SECTION_DESCRIPTIONS: Record<ChatbotQuickActionSection, string> = {
  profile: "User will land into the profile screen to view stats and badges",
  quiz: "User will land into the quiz selection screen to see available quizzes",
  quest: "User will land into the quest selection screen to see active quests",
  spirit_food: "User will land into the spirit food screen to read daily scripture",
  sword_drill: "User will land into the sword drill screen to play the challenge",
  leaderboard: "User will land into the leaderboard screens to see standings",
  friends: "User will land into the friends screen to view friend list",
  group: "User will land into the group management screen to view your groups",
};

export const CHATBOT_RESPONSE_CATEGORY_LABELS: Record<ChatbotResponseCategory, string> = {
  XP_REWARDS: "XP & Rewards",
  QUESTS: "Quests",
  QUIZZES: "Quizzes",
  SWORD_DRILL: "Sword Drill",
  BADGES_ACHIEVEMENTS: "Badges & Achievements",
  LEADERBOARD: "Leaderboard",
  DAILY_VERSES: "Daily Verses",
  ACCOUNT_SETTINGS: "Account Settings",
  GENERAL_HELP: "General Help",
};

export const CHATBOT_CONVERSATION_STATUS_LABELS: Record<ChatbotConversationStatus, string> = {
  RESOLVED: "Resolved",
  UNRESOLVED: "Unresolved",
};

/* ---- Query Keys ---- */
export const adminChatbotQueryKeys = {
  all: ["admin-chatbot"] as const,
  config: () => [...adminChatbotQueryKeys.all, "config"] as const,
  quickActions: (enabledOnly: boolean) => [...adminChatbotQueryKeys.all, "quick-actions", { enabledOnly }] as const,
  stats: () => [...adminChatbotQueryKeys.all, "stats"] as const,
  totalConversations: () => [...adminChatbotQueryKeys.all, "analytics", "total-conversations"] as const,
  avgResponseTime: () => [...adminChatbotQueryKeys.all, "analytics", "avg-response-time"] as const,
  mostAskedQuestions: () => [...adminChatbotQueryKeys.all, "analytics", "most-asked-questions"] as const,

  // Responses
  responses: () => [...adminChatbotQueryKeys.all, "responses"] as const,
  responseLists: () => [...adminChatbotQueryKeys.responses(), "list"] as const,
  responseList: (filters: ChatbotResponseListInput) => [...adminChatbotQueryKeys.responseLists(), filters] as const,

  // Conversations
  conversations: () => [...adminChatbotQueryKeys.all, "conversations"] as const,
  conversationLists: () => [...adminChatbotQueryKeys.conversations(), "list"] as const,
  conversationList: (filters: ChatbotConversationListInput) =>
    [...adminChatbotQueryKeys.conversationLists(), filters] as const,
  conversationDetail: (id: string) => [...adminChatbotQueryKeys.conversations(), "detail", id] as const,
};
