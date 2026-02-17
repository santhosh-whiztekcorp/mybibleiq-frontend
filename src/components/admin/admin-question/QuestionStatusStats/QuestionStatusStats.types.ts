import type { AdminQuestionStatusStatsResponse } from "@/resources/admin-question";

export type QuestionStatusStatsProps = {
  stats?: AdminQuestionStatusStatsResponse;
  isLoading?: boolean;
};
