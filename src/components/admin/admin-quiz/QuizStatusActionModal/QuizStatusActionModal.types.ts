import type { AdminQuizSummary, QuizStatusAction } from "@/resources/admin-quiz/admin-quiz.types";

export type QuizStatusActionModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AdminQuizSummary | null;
  action: QuizStatusAction | null;
  onConfirm: () => void;
  isLoading?: boolean;
};

export type UseQuizStatusActionModalProps = QuizStatusActionModalProps;
