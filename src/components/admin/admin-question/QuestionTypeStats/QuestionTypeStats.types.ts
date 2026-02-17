import type { AdminQuestionTypeStatsResponse } from "@/resources/admin-question";

export type QuestionTypeStatsProps = {
  stats?: AdminQuestionTypeStatsResponse;
  isLoading?: boolean;
};
