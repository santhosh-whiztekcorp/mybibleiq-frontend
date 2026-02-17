import type { AdminQuestionSummary, QuestionStatusAction } from "@/resources/admin-question";

export type QuestionStatusActionModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AdminQuestionSummary | null;
  action: QuestionStatusAction | null;
  onConfirm: () => void;
  isLoading?: boolean;
};

export type UseQuestionStatusActionModalProps = QuestionStatusActionModalProps;
