"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { UserCard } from "../UserCard";
import { useUserCardList } from "./UserCardList.hooks";
import type { UserCardListProps } from "./UserCardList.types";

export function UserCardList({
  items,
  isLoading,
  onView,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: UserCardListProps) {
  const { loadMoreRef } = useUserCardList({
    onLoadMore,
    hasNextPage,
    isFetchingNextPage,
  });

  if (isLoading && items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-[#656A73] font-medium text-sm">Loading users...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[400px] border-2 border-dashed border-[#E2E8F0] rounded-xl bg-[#F9FAFB]">
        <p className="text-[#656A73] font-bold text-lg">No users found</p>
        <p className="text-[#83827E] text-sm mt-1 text-center">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <UserCard key={item.id} item={item} onView={onView} />
        ))}
      </div>

      {/* Infinite scroll trigger */}
      <div ref={loadMoreRef} className="h-10 flex items-center justify-center">
        {isFetchingNextPage && (
          <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm font-medium">Loading more users...</span>
          </div>
        )}
      </div>
    </div>
  );
}
