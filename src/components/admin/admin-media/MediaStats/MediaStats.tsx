"use client";

import { MediaStatsProps } from "./MediaStats.types";
import { useMediaStats } from "./MediaStats.hooks";
import { cn } from "@/lib/utils";

export function MediaStats({ stats, isLoading }: MediaStatsProps) {
  const { items } = useMediaStats(stats);

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 md:grid-cols-1 gap-2 p-2 bg-white border border-[#D8D8D8] rounded-xl h-full">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-[52px] bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-3 md:grid-cols-1 gap-2 px-[10px] py-[10px] bg-white border border-[#D8D8D8] rounded-[12px] h-full">
      {items.map((item) => (
        <div
          key={item.label}
          className={`flex items-center justify-between px-[10px] py-[10px] border rounded-[12px] ${item.className}`}
        >
          <div className="flex items-center gap-2">
            <item.Icon className={cn("h-4 w-4", item.iconColor)} />
            <span className="text-[10px] font-semibold text-[#83827E] uppercase tracking-wide">{item.label}</span>
          </div>
          <span className="text-sm font-bold text-black">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
