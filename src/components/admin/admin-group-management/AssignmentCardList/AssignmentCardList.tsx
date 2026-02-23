"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { AssignmentCard } from "../AssignmentCard/AssignmentCard";
import { useAssignmentCardList } from "./AssignmentCardList.hooks";
import type { AssignmentCardListProps } from "./AssignmentCardList.types";

export function AssignmentCardList({
  items,
  isLoading,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: AssignmentCardListProps) {
  const { loadMoreRef } = useAssignmentCardList({
    onLoadMore,
    hasNextPage,
    isFetchingNextPage,
  });

  if (isLoading && items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[200px]">
        <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground font-medium text-sm">Loading assignments...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[200px] border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
        <p className="text-slate-500 font-bold">No assignments found</p>
        <p className="text-slate-400 text-sm mt-1 text-center">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <AssignmentCard key={item.id} assignment={item} />
        ))}
      </div>

      {/* Infinite scroll trigger */}
      <div ref={loadMoreRef} className="h-10 flex items-center justify-center">
        {isFetchingNextPage && (
          <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm font-medium">Loading more assignments...</span>
          </div>
        )}
      </div>
    </div>
  );
}
