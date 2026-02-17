import { useMemo } from "react";
import type { AdminQuizStatusStatsResponse } from "@/resources/admin-quiz/admin-quiz.types";
import { QUIZ_STATUS_LABELS } from "@/resources/admin-quiz/admin-quiz.constants";

export const useQuizStatusStats = (stats?: AdminQuizStatusStatsResponse) => {
  const items = useMemo(() => {
    const defaultStats = [
      { label: QUIZ_STATUS_LABELS.Draft, value: 0, className: "bg-[#F4F4F4] border-[#D4D4D4]" },
      { label: QUIZ_STATUS_LABELS.Published, value: 0, className: "bg-[#BEF7D3] border-[#3E995F]" },
      { label: QUIZ_STATUS_LABELS.Archived, value: 0, className: "bg-[#FEBEBE] border-[#DC8C8C]" },
      { label: QUIZ_STATUS_LABELS.Scheduled, value: 0, className: "bg-[#FEDD8F] border-[#ECB881]" },
    ];

    if (!stats) return defaultStats;

    return defaultStats.map((item) => {
      const stat = stats.find((s) => QUIZ_STATUS_LABELS[s.status] === item.label);
      return {
        ...item,
        value: stat?.count ?? 0,
      };
    });
  }, [stats]);

  return { items };
};
