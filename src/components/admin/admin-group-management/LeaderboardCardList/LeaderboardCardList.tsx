"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { LeaderboardCard } from "../LeaderboardCard/LeaderboardCard";
import { useLeaderboardCardList } from "./LeaderboardCardList.hooks";
import type { LeaderboardCardListProps } from "./LeaderboardCardList.types";

export function LeaderboardCardList({
  items,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
}: LeaderboardCardListProps) {
  const { loadMoreRef } = useLeaderboardCardList({
    onLoadMore,
    hasNextPage,
    isFetchingNextPage,
  });

  if (isLoading && items.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((entry) => (
        <LeaderboardCard key={entry.userId} entry={entry} />
      ))}

      {/* Infinite scroll trigger */}
      <div ref={loadMoreRef} className="flex h-10 items-center justify-center">
        {isFetchingNextPage && (
          <div className="flex items-center gap-2 text-slate-400 animate-pulse">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-xs font-medium">Loading more members...</span>
          </div>
        )}
      </div>
    </div>
  );
}
