import type { ChatbotConversationStatsResponse } from "@/resources/admin-chatbot/admin-chatbot.types";

export type ChatbotConversationStatsProps = {
  stats?: ChatbotConversationStatsResponse;
  isLoading?: boolean;
};

export type StatItem = {
  label: string;
  value: string | number;
  className: string;
};
