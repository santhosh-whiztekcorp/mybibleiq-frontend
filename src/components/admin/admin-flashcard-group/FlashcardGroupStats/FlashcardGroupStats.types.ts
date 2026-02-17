import { AdminFlashcardGroupStatusStatsResponse } from "@/resources/admin-flashcard-group/admin-flashcard-group.types";

export type FlashcardGroupStatsProps = {
  stats?: AdminFlashcardGroupStatusStatsResponse;
  isLoading?: boolean;
};
