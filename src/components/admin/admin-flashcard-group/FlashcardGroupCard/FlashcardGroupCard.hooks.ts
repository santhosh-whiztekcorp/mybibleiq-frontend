import { AdminFlashcardGroupSummary } from "@/resources/admin-flashcard-group/admin-flashcard-group.types";

export const useFlashcardGroupCard = (item: AdminFlashcardGroupSummary) => {
  const MAX_TAGS_DISPLAY = 3;
  const displayTags = item.tags?.slice(0, MAX_TAGS_DISPLAY) || [];
  const remainingTagsCount = (item.tags?.length || 0) - MAX_TAGS_DISPLAY;

  const cardBorderColor =
    item.status === "Published" ? "border-green-200" : item.status === "Draft" ? "border-gray-200" : "border-red-200";

  return {
    displayTags,
    remainingTagsCount,
    cardBorderColor,
  };
};
