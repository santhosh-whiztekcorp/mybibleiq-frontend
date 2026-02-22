import type { ChatbotConversationSummary } from "@/resources/admin-chatbot/admin-chatbot.types";

export type ChatbotConversationDataTableProps = {
  items: ChatbotConversationSummary[];
  isLoading?: boolean;
  total?: number;
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void;
  onView: (item: ChatbotConversationSummary) => void;
};
