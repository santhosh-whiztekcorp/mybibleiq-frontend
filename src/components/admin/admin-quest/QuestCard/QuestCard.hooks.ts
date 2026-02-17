"use client";

import type { QuestCardProps } from "./QuestCard.types";

export const useQuestCard = (item: QuestCardProps["item"]) => {
  const cardBgColor =
    {
      Published: "bg-green-50",
      Archived: "bg-red-50",
      Draft: "bg-gray-100",
      Scheduled: "bg-yellow-50",
    }[item.status] || "bg-white";

  const cardBorderColor =
    {
      Published: "border-green-200",
      Archived: "border-red-200",
      Draft: "border-gray-200",
      Scheduled: "border-yellow-200",
    }[item.status] || "border-[#E2E8F0]";

  return {
    cardBgColor,
    cardBorderColor,
  };
};
