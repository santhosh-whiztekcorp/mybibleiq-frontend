import { useMemo } from "react";
import { AdminMediaSummary } from "@/resources/admin-media/admin-media.types";

export const useMediaCard = (item: AdminMediaSummary) => {
  const cardBgColor = useMemo(() => {
    switch (item.status) {
      case "Published":
        return "bg-green-50";
      case "Draft":
        return "bg-gray-100";
      case "Archived":
        return "bg-red-50";
      default:
        return "bg-white";
    }
  }, [item.status]);

  const cardBorderColor = useMemo(() => {
    switch (item.status) {
      case "Published":
        return "border-green-200";
      case "Draft":
        return "border-gray-200";
      case "Archived":
        return "border-red-200";
      default:
        return "border-[#E2E8F0]";
    }
  }, [item.status]);

  const displayTags = useMemo(() => item.tags?.slice(0, 3) || [], [item.tags]);
  const remainingTagsCount = useMemo(() => Math.max(0, (item.tags?.length || 0) - 3), [item.tags]);

  return {
    cardBgColor,
    cardBorderColor,
    displayTags,
    remainingTagsCount,
  };
};
