import type { ChatbotResponseDetail } from "@/resources/admin-chatbot";

export type ChatbotResponseDataTableProps = {
  items: ChatbotResponseDetail[];
  isLoading?: boolean;
  total?: number;
  onEdit?: (item: ChatbotResponseDetail) => void;
  onDelete?: (item: ChatbotResponseDetail) => void;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};
