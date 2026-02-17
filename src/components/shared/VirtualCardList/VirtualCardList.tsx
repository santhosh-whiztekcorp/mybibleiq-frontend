"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import type { VirtualCardListProps } from "./VirtualCardList.types";
import { useVirtualCardList } from "./VirtualCardList.hooks";

export function VirtualCardList<T extends { id: string }>(props: VirtualCardListProps<T>) {
  const {
    items,
    isLoading = false,
    renderCard,
    emptyState,
    loadingState,
    className = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
    isFetchingNextPage,
  } = props;

  const { parentRef, rowVirtualizer, lastItemRef, virtualItems } = useVirtualCardList(props);

  // Loading state
  if (isLoading && items.length === 0) {
    return (
      loadingState || (
        <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
          <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
          <p className="text-[#656A73] font-medium text-sm">Loading...</p>
        </div>
      )
    );
  }

  // Empty state
  if (items.length === 0) {
    return (
      emptyState || (
        <div className="flex flex-col items-center justify-center p-12 min-h-[400px] border-2 border-dashed border-[#E2E8F0] rounded-xl bg-[#F9FAFB]">
          <p className="text-[#656A73] font-bold text-lg">No items found</p>
          <p className="text-[#83827E] text-sm mt-1 text-center">Try adjusting your filters or search terms.</p>
        </div>
      )
    );
  }

  return (
    <div className="space-y-3">
      <div
        ref={parentRef}
        className="overflow-auto"
        style={{
          height: "calc(100vh - 300px)",
          minHeight: "400px",
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          <div className={className}>
            {virtualItems.map((virtualRow) => {
              const item = items[virtualRow.index];
              const isLastItem = virtualRow.index === items.length - 1;

              return (
                <div
                  key={item.id}
                  ref={isLastItem ? lastItemRef : undefined}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {renderCard(item, virtualRow.index)}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Infinite scroll loading indicator */}
      {isFetchingNextPage && (
        <div className="flex items-center justify-center gap-2 text-muted-foreground animate-pulse py-4">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm font-medium">Loading more...</span>
        </div>
      )}
    </div>
  );
}

// Memoized version for better performance
export const MemoizedVirtualCardList = React.memo(VirtualCardList) as typeof VirtualCardList;
