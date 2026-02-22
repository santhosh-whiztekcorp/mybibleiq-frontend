import { z } from "zod";

/* ---- Enums ---- */
export const ChatbotPositionEnum = z.enum(["BOTTOM_LEFT", "BOTTOM_RIGHT"], {
  message: "Position must be either BOTTOM_RIGHT or BOTTOM_LEFT",
});

export const ChatbotPageSlugEnum = z.enum(["dashboard", "quests", "quizzes", "sword_drill", "leaderboard", "profile"], {
  message: "Page slug must be a valid page identifier",
});

export const ChatbotQuickActionSectionEnum = z.enum(
  ["profile", "quiz", "quest", "spirit_food", "sword_drill", "leaderboard", "friends", "group"],
  {
    message: "Quick action section must be a valid section",
  }
);

export const ChatbotResponseCategoryEnum = z.enum(
  [
    "XP_REWARDS",
    "QUESTS",
    "QUIZZES",
    "SWORD_DRILL",
    "BADGES_ACHIEVEMENTS",
    "LEADERBOARD",
    "DAILY_VERSES",
    "ACCOUNT_SETTINGS",
    "GENERAL_HELP",
  ],
  {
    message: "Response category must be a valid category",
  }
);

export const ChatbotConversationStatusEnum = z.enum(["RESOLVED", "UNRESOLVED"], {
  message: "Conversation status must be either RESOLVED or UNRESOLVED",
});

export const ChatbotMessageRoleEnum = z.enum(["USER", "ASSISTANT"], {
  message: "Message role must be either USER or ASSISTANT",
});

/* ---- Request Schemas ---- */

/* -- Config -- */
export const UpdateChatbotConfigRequestSchema = z.object({
  name: z
    .string({ message: "Chatbot name is required" })
    .min(1, { message: "Chatbot name cannot be empty" })
    .max(100, { message: "Chatbot name must be 100 characters or less" })
    .optional(),
  tagline: z
    .string({ message: "Tagline is required" })
    .min(1, { message: "Tagline cannot be empty" })
    .max(255, { message: "Tagline must be 255 characters or less" })
    .optional(),
  welcomeMessage: z
    .string({ message: "Welcome message is required" })
    .min(1, { message: "Welcome message cannot be empty" })
    .optional(),
  position: ChatbotPositionEnum.optional(),
  enabled: z.boolean().optional(),
  showOnPages: z.array(ChatbotPageSlugEnum).optional(),
  leftAvatar: z.any().optional(), // For file upload
  rightAvatar: z.any().optional(), // For file upload
});

/* -- Quick Actions -- */
export const UpdateChatbotQuickActionRequestSchema = z.object({
  label: z
    .string({ message: "Label is required" })
    .min(1, { message: "Label cannot be empty" })
    .max(50, { message: "Label must be 50 characters or less" })
    .optional(),
  enabled: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
});

/* -- Responses (FAQs) -- */
export const CreateChatbotResponseRequestSchema = z.object({
  category: ChatbotResponseCategoryEnum,
  question: z
    .string({ message: "Question is required" })
    .min(1, { message: "Question cannot be empty" })
    .max(500, { message: "Question must be 500 characters or less" }),
  answer: z.string({ message: "Answer is required" }).min(1, { message: "Answer cannot be empty" }),
  keywords: z.array(z.string().min(1)).min(1, { message: "At least one keyword is required" }),
  enabled: z.boolean(),
});

export const UpdateChatbotResponseRequestSchema = z.object({
  category: ChatbotResponseCategoryEnum.optional(),
  question: z.string().min(1).max(500).optional(),
  answer: z.string().min(1).optional(),
  keywords: z.array(z.string().min(1)).min(1).optional(),
  enabled: z.boolean().optional(),
});
