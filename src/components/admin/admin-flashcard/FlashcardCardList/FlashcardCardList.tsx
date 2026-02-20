"use client";

import { Loader2 } from "lucide-react";
import { FlashcardCard } from "../FlashcardCard";
import { FlashcardCardListProps } from "./FlashcardCardList.types";
import { useFlashcardCardList } from "./FlashcardCardList.hooks";

export function FlashcardCardList({
  items,
  onEdit,
  onDelete,
  onPublish,
  onArchive,
  onClone,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: FlashcardCardListProps) {
  const { loadMoreRef } = useFlashcardCardList({
    onLoadMore,
    hasNextPage,
    isFetchingNextPage,
  });

  if (items.length === 0 && !isFetchingNextPage) {
    return <div className="text-center py-8 text-muted-foreground">No flashcards found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item) => (
        <FlashcardCard
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
            <span className="text-sm font-medium">Loading more flashcards...</span>
          </div>
        )}
      </div>
    </div>
  );
}
