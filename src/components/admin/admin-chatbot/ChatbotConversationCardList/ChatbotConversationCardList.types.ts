import type { ChatbotConversationSummary } from "@/resources/admin-chatbot/admin-chatbot.types";

export type ChatbotConversationCardListProps = {
  items: ChatbotConversationSummary[];
  isLoading?: boolean;
  onView: (item: ChatbotConversationSummary) => void;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};
