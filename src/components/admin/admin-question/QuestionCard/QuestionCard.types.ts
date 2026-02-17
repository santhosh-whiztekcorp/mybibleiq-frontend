import type { AdminQuestionSummary } from "@/resources/admin-question";

export type QuestionCardProps = {
  item: AdminQuestionSummary;
  onEdit?: (item: AdminQuestionSummary) => void;
  onDelete?: (item: AdminQuestionSummary) => void;
  onPublish?: (item: AdminQuestionSummary) => void;
  onArchive?: (item: AdminQuestionSummary) => void;
  onClone?: (item: AdminQuestionSummary) => void;
};

export type UseQuestionCardProps = QuestionCardProps;
