"use client";

import { Loader2 } from "lucide-react";
import { TagCard } from "../TagCard";
import { TagCardListProps } from "./TagCardList.types";
import { useTagCardList } from "./TagCardList.hooks";

export function TagCardList({
  items,
  onEdit,
  onDelete,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: TagCardListProps) {
  const { loadMoreRef } = useTagCardList({
    onLoadMore,
    hasNextPage,
    isFetchingNextPage,
  });

  if (items.length === 0 && !isFetchingNextPage) {
    return <div className="text-center py-8 text-muted-foreground">No tags found.</div>;
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <TagCard key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>

      {/* Loading target for infinite scroll */}
      <div ref={loadMoreRef} className="h-10 flex items-center justify-center">
        {isFetchingNextPage && (
          <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm font-medium">Loading more tags...</span>
          </div>
        )}
      </div>
    </div>
  );
}
