import { ChatbotConversationStatsResponse } from "@/resources/admin-chatbot/admin-chatbot.types";
import { StatItem } from "./ChatbotConversationStats.types";

export const useChatbotConversationStats = (stats?: ChatbotConversationStatsResponse) => {
  const items: StatItem[] = [
    {
      label: "Total",
      value: stats?.total ?? 0,
      className: "bg-[#F4F4F4] border-[#D4D4D4]",
    },
    {
      label: "Resolved",
      value: stats?.resolved ?? 0,
      className: "bg-[#BEF7D3] border-[#3E995F]",
    },
    {
      label: "Unresolved",
      value: stats?.unresolved ?? 0,
      className: "bg-[#FEBEBE] border-[#DC8C8C]",
    },
  ];

  return { items };
};
