"use client";

import React from "react";
import { ChatbotConversationStatsProps } from "./ChatbotConversationStats.types";
import { useChatbotConversationStats } from "./ChatbotConversationStats.hooks";
import { cn } from "@/lib/utils";

export function ChatbotConversationStats({ stats, isLoading }: ChatbotConversationStatsProps) {
  const { items } = useChatbotConversationStats(stats);

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 md:grid-cols-1 gap-2 p-2 bg-white border border-[#E2E8F0] rounded-lg h-full">
        <div className="bg-muted rounded-lg animate-pulse h-16 md:h-20" />
        <div className="bg-muted rounded-lg animate-pulse h-16 md:h-20" />
        <div className="bg-muted rounded-lg animate-pulse h-16 md:h-20" />
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="grid grid-cols-3 md:grid-cols-1 gap-2 p-2 bg-white border border-[#E2E8F0] rounded-lg h-full">
      {items.map((item) => (
        <div
          key={item.label}
          className={cn("flex items-center justify-between px-4 py-2.5 border rounded-lg", item.className)}
        >
          <span className="text-xs font-bold text-[#656A73]">{item.label}</span>
          <span className="text-xl font-bold text-black">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
