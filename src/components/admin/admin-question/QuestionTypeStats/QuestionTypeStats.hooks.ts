import React from "react";
import type { AdminQuestionTypeStatsResponse } from "@/resources/admin-question/admin-question.types";
import { DashboardEqualIcon, TrophyEmptyIcon, LinkIcon, BlanksIcon, AlphabetsIcon, SignalIcon } from "@/assets";
import { HelpCircle } from "lucide-react";

export const useQuestionTypeStats = (stats?: AdminQuestionTypeStatsResponse) => {
  const items = stats
    ? stats.map((stat) => {
        let className = "bg-[#F4F4F4] border-[#D4D4D4]"; // Default
        let Icon: React.ElementType = HelpCircle;
        let iconColor = "text-[#656A73]";
        let label: string = stat.type;

        // Mobile App AdminStats Styles
        className = "bg-[#F9FAFB] border-[#D8D8D8]"; // Standard Grey Card

        switch (stat.type) {
          case "MCQ":
            Icon = DashboardEqualIcon;
            iconColor = "text-[#989FE2]";
            label = "Multiple Choice";
            break;
          case "TRUE_FALSE":
            Icon = TrophyEmptyIcon;
            iconColor = "text-[#BE7BDD]";
            label = "True/False";
            break;
          case "MATCH":
            Icon = LinkIcon;
            iconColor = "text-[#F6339A]";
            label = "Matching";
            break;
          case "FILL_BLANK":
            Icon = BlanksIcon;
            iconColor = "text-[#F56262]";
            label = "Fill Blank";
            break;
          case "ONE_WORD":
            Icon = AlphabetsIcon;
            iconColor = "text-[#70C170]"; // Green
            label = "One Word";
            break;
          case "ORDER":
            Icon = SignalIcon;
            iconColor = "text-[#FF8F16]";
            label = "Order";
            break;
        }

        return {
          label,
          value: stat.count,
          className,
          Icon,
          iconColor,
        };
      })
    : [];

  return { items };
};
