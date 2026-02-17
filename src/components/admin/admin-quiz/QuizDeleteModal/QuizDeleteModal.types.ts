import type { AdminQuizSummary } from "@/resources/admin-quiz/admin-quiz.types";

export type QuizDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AdminQuizSummary | null;
  onConfirm: () => void;
  isLoading?: boolean;
};
