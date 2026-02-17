import type { AdminQuestionSummary } from "@/resources/admin-question";

export type QuestionCardListProps = {
  items: AdminQuestionSummary[];
  isLoading: boolean;
  onEdit?: (item: AdminQuestionSummary) => void;
  onDelete?: (item: AdminQuestionSummary) => void;
  onPublish?: (item: AdminQuestionSummary) => void;
  onArchive?: (item: AdminQuestionSummary) => void;
  onClone?: (item: AdminQuestionSummary) => void;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};

export type UseQuestionCardListProps = {
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};
