"use client";

import React from "react";
import { Loader2, MegaphoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlobalUpdateCard } from "../GlobalUpdateCard";
import type { GlobalUpdateCardListProps } from "./GlobalUpdateCardList.types";

export function GlobalUpdateCardList({
  items,
  isLoading,
  onView,
  onEdit,
  onDeliver,
  onDelete,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: GlobalUpdateCardListProps) {
  if (isLoading && items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-[#656A73] font-medium text-sm">Loading global updates...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[400px] border-2 border-dashed border-[#E2E8F0] rounded-xl bg-[#F9FAFB]">
        <MegaphoneIcon className="h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No global updates found</h3>
        <p className="text-gray-500 text-center">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <GlobalUpdateCard
            key={item.id}
            item={item}
            onView={onView}
            onEdit={onEdit}
            onDeliver={onDeliver}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Load More Button as fallback */}
      {hasNextPage && !isFetchingNextPage && (
        <div className="flex justify-center mt-6">
          <Button variant="outline" onClick={onLoadMore} className="min-w-32">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
