import { AdminFlashcardStatusStatsResponse } from "@/resources/admin-flashcard/admin-flashcard.types";

export type FlashcardStatsProps = {
  stats?: AdminFlashcardStatusStatsResponse;
  isLoading?: boolean;
};
