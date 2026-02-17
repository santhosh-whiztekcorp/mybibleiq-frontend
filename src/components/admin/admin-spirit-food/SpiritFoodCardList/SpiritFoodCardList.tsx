"use client";

import { Loader2 } from "lucide-react";
import { SpiritFoodCard } from "../SpiritFoodCard";
import { SpiritFoodCardListProps } from "./SpiritFoodCardList.types";
import { useSpiritFoodCardList } from "./SpiritFoodCardList.hooks";

export function SpiritFoodCardList({
  items,
  currentUserId,
  onEdit,
  onSubmit,
  onApprove,
  onCancel,
  onRequestDelete,
  onApproveDelete,
  onCancelDelete,
  hasNextPage = false,
  isFetchingNextPage = false,
  onLoadMore,
}: SpiritFoodCardListProps) {
  const { loadMoreRef } = useSpiritFoodCardList({
    onLoadMore,
    hasNextPage,
    isFetchingNextPage,
  });

  if (items.length === 0 && !isFetchingNextPage) {
    return <div className="text-center py-8 text-muted-foreground">No spirit food entries found.</div>;
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <SpiritFoodCard
          key={item.id}
          item={item}
          currentUserId={currentUserId}
          onEdit={onEdit}
          onSubmit={onSubmit}
          onApprove={onApprove}
          onCancel={onCancel}
          onRequestDelete={onRequestDelete}
          onApproveDelete={onApproveDelete}
          onCancelDelete={onCancelDelete}
        />
      ))}

      {/* Loading target for infinite scroll */}
      <div ref={loadMoreRef} className="h-10 flex items-center justify-center">
        {isFetchingNextPage && (
          <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm font-medium">Loading more entries...</span>
          </div>
        )}
      </div>

      {/* End of list message */}
      {!hasNextPage && items.length > 0 && (
        <div className="text-center py-6 text-xs font-semibold text-[#B4B4B4]">
          You&apos;ve reached the end of the list
        </div>
      )}
    </div>
  );
}
