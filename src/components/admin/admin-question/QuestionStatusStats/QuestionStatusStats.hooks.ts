import type { AdminQuestionStatusStatsResponse } from "@/resources/admin-question/admin-question.types";

export const useQuestionStatusStats = (stats?: AdminQuestionStatusStatsResponse) => {
  const items = stats
    ? stats.map((stat) => {
        let className = "bg-[#F4F4F4] border-[#D4D4D4]"; // Default
        let label: string = stat.status;

        switch (stat.status) {
          case "Draft":
            className = "bg-[#F4F4F4] border-[#D4D4D4]"; // Grey
            label = "Draft";
            break;
          case "Published":
            className = "bg-[#BEF7D3] border-[#3E995F]"; // Green
            label = "Published";
            break;
          case "Archived":
            className = "bg-[#FEBEBE] border-[#DC8C8C]"; // Red/Pink
            label = "Archived";
            break;
        }

        return {
          label,
          value: stat.count,
          className,
        };
      })
    : [];

  return { items };
};
