"use client";

import { FlashcardStatsProps } from "./FlashcardStats.types";
import { useFlashcardStats } from "./FlashcardStats.hooks";

export function FlashcardStats({ stats, isLoading }: FlashcardStatsProps) {
  const { items } = useFlashcardStats(stats);

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-2 p-2 bg-white border border-[#D8D8D8] rounded-xl">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-[52px] bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-3 md:grid-cols-1 gap-2 p-2 bg-white border border-[#D8D8D8] rounded-xl">
      {items.map((item) => (
        <div
          key={item.label}
          className={`flex items-center justify-between px-2 py-2 border rounded-lg ${item.className}`}
        >
          <span className="text-xs font-bold text-[#656A73]">{item.label}</span>
          <span className="text-xl font-bold text-black">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
