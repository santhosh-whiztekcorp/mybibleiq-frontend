import type { ChatbotConversationSummary } from "@/resources/admin-chatbot/admin-chatbot.types";

export type ChatbotConversationCardProps = {
  item: ChatbotConversationSummary;
  onView?: (item: ChatbotConversationSummary) => void;
};
