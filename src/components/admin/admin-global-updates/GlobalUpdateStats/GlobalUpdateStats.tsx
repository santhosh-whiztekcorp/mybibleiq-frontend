"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { GlobalUpdateStatsProps } from "./GlobalUpdateStats.types";

export function GlobalUpdateStats({ stats, isLoading }: GlobalUpdateStatsProps) {
  const items = [
    {
      label: "Total Updates",
      value: stats?.totalUpdates || 0,
      className: "border-[#528CA7] bg-[#D3F1FF]",
    },
    {
      label: "Sent This Month",
      value: stats?.sentThisMonth || 0,
      className: "border-[#F7B66F] bg-[#FFFAE6]",
    },
    {
      label: "Scheduled",
      value: stats?.scheduled || 0,
      className: "border-[#989FE2] bg-[#ECEEFE]",
    },
    {
      label: "Avg Read Rate",
      value: stats?.avgReadRate ? `${stats.avgReadRate}%` : "0%",
      className: "border-[#FF96C7] bg-[#FADEE2]",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-2 gap-2 p-2 bg-white border border-[#D8D8D8] rounded-xl h-full">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-[52px] bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

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
