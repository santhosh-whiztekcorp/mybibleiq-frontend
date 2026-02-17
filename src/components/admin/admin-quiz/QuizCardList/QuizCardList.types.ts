import type { AdminQuizSummary } from "@/resources/admin-quiz/admin-quiz.types";

export type QuizCardListProps = {
  items: AdminQuizSummary[];
  isLoading?: boolean;
  onEdit?: (item: AdminQuizSummary) => void;
  onDelete?: (item: AdminQuizSummary) => void;
  onPublish?: (item: AdminQuizSummary) => void;
  onArchive?: (item: AdminQuizSummary) => void;
  onClone?: (item: AdminQuizSummary) => void;
  onSchedule?: (item: AdminQuizSummary) => void;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};
