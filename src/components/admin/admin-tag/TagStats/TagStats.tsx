"use client";

import { TagStatsProps } from "./TagStats.types";
import { useTagStats } from "./TagStats.hooks";

export function TagStats({ stats, isLoading }: TagStatsProps) {
  const { items } = useTagStats(stats);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-2 grid-rows-2 gap-2 p-2 bg-white border border-[#D8D8D8] rounded-xl h-full">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 grid-rows-2 gap-2 p-2 bg-white border border-[#D8D8D8] rounded-xl h-full">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-row md:flex-col items-center md:items-start justify-between px-2 py-2 bg-[#F9FAFB] border border-[#E4E4E4] rounded-lg"
        >
          <span className="text-xs font-bold text-[#656A73]">{item.label}</span>
          <span className="text-xl font-bold text-black">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
