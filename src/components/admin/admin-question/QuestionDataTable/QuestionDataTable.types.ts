import type { AdminQuestionSummary } from "@/resources/admin-question";

export type QuestionDataTableProps = {
  items: AdminQuestionSummary[];
  isLoading?: boolean;
  total?: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => void;
  onEdit?: (item: AdminQuestionSummary) => void;
  onDelete?: (item: AdminQuestionSummary) => void;
  onPublish?: (item: AdminQuestionSummary) => void;
  onArchive?: (item: AdminQuestionSummary) => void;
  onClone?: (item: AdminQuestionSummary) => void;
};
