"use client";

import { QuestStatusStatsProps } from "./QuestStatusStats.types";
import { useQuestStatusStats } from "./QuestStatusStats.hooks";
import { cn } from "@/lib/utils";

export function QuestStatusStats({ stats, isLoading }: QuestStatusStatsProps) {
  const { items } = useQuestStatusStats(stats);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-2 gap-2 p-2 bg-white border border-[#D8D8D8] rounded-xl h-full">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-[52px] bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-2 p-2 bg-white border border-[#D8D8D8] rounded-xl h-full overflow-y-auto">
      {items.map((item) => (
        <div
          key={item.label}
          className={cn("flex items-center justify-between px-2 py-2 border rounded-lg", item.className)}
        >
          <span className="text-xs font-bold text-[#656A73]">{item.label}</span>
          <span className="text-xl font-bold text-black">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
