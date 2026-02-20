"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useGroupManagementStats } from "./GroupManagementStats.hooks";
import type { GroupManagementStatsProps } from "./GroupManagementStats.types";

export function GroupManagementStats({ stats, isLoading }: GroupManagementStatsProps) {
  const { items } = useGroupManagementStats({ stats });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3 h-full">
        <div className="bg-muted rounded-xl animate-pulse h-28" />
        <div className="bg-muted rounded-xl animate-pulse h-28" />
        <div className="bg-muted rounded-xl animate-pulse h-28" />
        <div className="bg-muted rounded-xl animate-pulse h-28" />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 gap-3 h-full">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.label}
            className={cn("flex flex-col justify-between p-3 rounded-xl border h-full min-h-[80px]", item.className)}
          >
            <div className="flex items-center gap-2 mb-1">
              <Icon className={cn("h-4 w-4", item.iconColor)} />
              <span className="text-xs font-semibold text-slate-600 line-clamp-1">{item.label}</span>
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-2xl font-bold text-slate-900">{item.value}</span>
              <span className="text-[10px] font-medium text-slate-500 line-clamp-1">{item.subtext}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
