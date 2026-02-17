"use client";

import { Loader2 } from "lucide-react";
import { FlashcardGroupCard } from "../FlashcardGroupCard";
import { FlashcardGroupCardListProps } from "./FlashcardGroupCardList.types";
import { useFlashcardGroupCardList } from "./FlashcardGroupCardList.hooks";

export function FlashcardGroupCardList({
  items,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onClone,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: FlashcardGroupCardListProps) {
  const { loadMoreRef } = useFlashcardGroupCardList({
    onLoadMore,
    hasNextPage,
    isFetchingNextPage,
  });

  if (items.length === 0 && !isFetchingNextPage) {
    return <div className="text-center py-8 text-muted-foreground">No flashcard groups found.</div>;
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <FlashcardGroupCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
          onPublish={onPublish}
          onArchive={onArchive}
          onClone={onClone}
        />
      ))}

      {/* Loading target for infinite scroll */}
      <div ref={loadMoreRef} className="h-10 flex items-center justify-center">
        {isFetchingNextPage && (
          <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm font-medium">Loading more flashcard groups...</span>
          </div>
        )}
      </div>
    </div>
  );
}
