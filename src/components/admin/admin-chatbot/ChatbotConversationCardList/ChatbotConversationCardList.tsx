"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { ChatbotConversationCard } from "../ChatbotConversationCard";
import { useChatbotConversationCardList } from "./ChatbotConversationCardList.hooks";
import type { ChatbotConversationCardListProps } from "./ChatbotConversationCardList.types";

export function ChatbotConversationCardList({
  items,
  isLoading,
  onView,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: ChatbotConversationCardListProps) {
  const { loadMoreRef } = useChatbotConversationCardList({
    onLoadMore,
    hasNextPage,
    isFetchingNextPage,
  });

  if (isLoading && items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[400px]">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <p className="text-[#656A73] font-medium text-sm">Loading conversations...</p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 min-h-[400px] border-2 border-dashed border-[#E2E8F0] rounded-xl bg-[#F9FAFB]">
        <p className="text-[#656A73] font-bold text-lg">No conversations found</p>
        <p className="text-[#83827E] text-sm mt-1 text-center">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <ChatbotConversationCard key={item.id} item={item} onView={onView} />
        ))}
      </div>

      {/* Infinite scroll trigger */}
      <div ref={loadMoreRef} className="h-10 flex items-center justify-center">
        {isFetchingNextPage && (
          <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm font-medium">Loading more conversations...</span>
          </div>
        )}
      </div>
    </div>
  );
}
