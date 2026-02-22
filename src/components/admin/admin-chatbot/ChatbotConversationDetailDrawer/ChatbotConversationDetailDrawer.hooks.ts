"use client";

import { useMemo } from "react";
import { useChatbotConversationDetail } from "@/resources/admin-chatbot/admin-chatbot.hooks";

export const useChatbotConversationDetailDrawer = (conversationId?: string) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useChatbotConversationDetail(
    conversationId ?? ""
  );

  const messages = useMemo(() => {
    if (!data) return [];
    // Pages are returned from newest to oldest in the API typically for chat,
    // but depends on how back-end handles it.
    // We'll flatten and sort by created date if needed, or stick to provided order.
    return data.pages.flatMap((page) => page.messages.items).reverse();
  }, [data]);

  const conversationDetail = useMemo(() => {
    if (!data || data.pages.length === 0) return null;
    return data.pages[0];
  }, [data]);

  return {
    messages,
    conversationDetail,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
