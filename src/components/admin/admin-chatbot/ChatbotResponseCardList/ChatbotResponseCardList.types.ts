import type { ChatbotResponseDetail } from "@/resources/admin-chatbot";

export type ChatbotResponseCardListProps = {
  items: ChatbotResponseDetail[];
  isLoading: boolean;
  onEdit?: (item: ChatbotResponseDetail) => void;
  onDelete?: (item: ChatbotResponseDetail) => void;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};

export type UseChatbotResponseCardListProps = {
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};
