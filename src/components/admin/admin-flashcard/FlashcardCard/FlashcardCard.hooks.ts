import { AdminFlashcardSummary } from "@/resources/admin-flashcard/admin-flashcard.types";

export const useFlashcardCard = (item: AdminFlashcardSummary) => {
  const MAX_TAGS_DISPLAY = 3;
  const displayTags = item.tags?.slice(0, MAX_TAGS_DISPLAY) || [];
  const remainingTagsCount = (item.tags?.length || 0) - MAX_TAGS_DISPLAY;

  const cardBgColor =
    item.status === "Published" ? "bg-green-50" : item.status === "Draft" ? "bg-gray-100" : "bg-red-50";

  const cardBorderColor =
    item.status === "Published" ? "border-green-200" : item.status === "Draft" ? "border-gray-200" : "border-red-200";

  return {
    displayTags,
    remainingTagsCount,
    cardBgColor,
    cardBorderColor,
  };
};
