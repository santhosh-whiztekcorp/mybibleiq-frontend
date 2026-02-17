import { AdminFlashcardStatusStatsResponse } from "@/resources/admin-flashcard/admin-flashcard.types";

export const useFlashcardStats = (stats?: AdminFlashcardStatusStatsResponse) => {
  const items = stats
    ? [
        { label: "Drafts", value: stats.draft, className: "bg-[#F4F4F4] border-[#D4D4D4]" },
        { label: "Published", value: stats.published, className: "bg-[#BEF7D3] border-[#3E995F]" },
        { label: "Archived", value: stats.archived, className: "bg-[#FEBEBE] border-[#DC8C8C]" },
      ]
    : [];

  return { items };
};
