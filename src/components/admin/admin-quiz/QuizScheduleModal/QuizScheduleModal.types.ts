import type { AdminQuizSummary } from "@/resources/admin-quiz/admin-quiz.types";

export type QuizScheduleModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AdminQuizSummary | null;
  onConfirm: (publishAt: string) => void;
  isLoading?: boolean;
};
