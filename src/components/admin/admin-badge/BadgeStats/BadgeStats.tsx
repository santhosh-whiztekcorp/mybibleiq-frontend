"use client";

import { useMemo } from "react";
import { BadgeStatsProps } from "./BadgeStats.types";
import { Skeleton } from "@/components/ui/skeleton";

export function BadgeStats({ stats, isLoading }: BadgeStatsProps) {
  const items = useMemo(() => {
    if (!stats) return [];

    // Helper to get count safely
    const getCount = (status: string) => stats.find((s) => s.status === status)?.count || 0;

    return [
      {
        label: "Drafts",
        value: getCount("Draft"),
        className: "bg-[#F4F4F4] border-[#D4D4D4]",
      },
      {
        label: "Published",
        value: getCount("Published"),
        className: "bg-[#BEF7D3] border-[#3E995F]",
      },
      {
        label: "Archived",
        value: getCount("Archived"),
        className: "bg-[#FEBEBE] border-[#DC8C8C]",
      },
    ];
  }, [stats]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-2 p-2 bg-white border border-[#D8D8D8] rounded-xl">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-[52px] w-full rounded-lg" />
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
