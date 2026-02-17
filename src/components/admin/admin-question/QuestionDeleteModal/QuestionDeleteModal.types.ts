import type { AdminQuestionSummary } from "@/resources/admin-question";

export type QuestionDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AdminQuestionSummary | null;
  onConfirm: () => void;
  isLoading?: boolean;
};

export type UseQuestionDeleteModalProps = QuestionDeleteModalProps;
