import type { AdminQuestStatusStatsResponse } from "@/resources/admin-quest/admin-quest.types";

export type QuestStatusStatsProps = {
  stats?: AdminQuestStatusStatsResponse;
  isLoading?: boolean;
};
