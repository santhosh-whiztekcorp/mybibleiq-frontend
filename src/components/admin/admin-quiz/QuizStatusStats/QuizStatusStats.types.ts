import type { AdminQuizStatusStatsResponse } from "@/resources/admin-quiz/admin-quiz.types";

export type QuizStatusStatsProps = {
  stats?: AdminQuizStatusStatsResponse;
  isLoading?: boolean;
};
