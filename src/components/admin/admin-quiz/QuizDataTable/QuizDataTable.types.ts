import type { AdminQuizSummary } from "@/resources/admin-quiz/admin-quiz.types";

export type QuizDataTableProps = {
  items: AdminQuizSummary[];
  isLoading?: boolean;
  total?: number;
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void;
  onEdit?: (item: AdminQuizSummary) => void;
  onDelete?: (item: AdminQuizSummary) => void;
  onPublish?: (item: AdminQuizSummary) => void;
  onArchive?: (item: AdminQuizSummary) => void;
  onClone?: (item: AdminQuizSummary) => void;
  onSchedule?: (item: AdminQuizSummary) => void;
};
