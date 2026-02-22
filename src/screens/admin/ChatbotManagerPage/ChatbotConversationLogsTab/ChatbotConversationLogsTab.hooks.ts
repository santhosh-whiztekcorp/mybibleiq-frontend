"use client";

import { useState, useCallback, useMemo } from "react";
import {
  useChatbotConversationList,
  useChatbotConversationFilterStore,
  useChatbotConversationStats,
} from "@/resources/admin-chatbot/admin-chatbot.hooks";
import { ChatbotConversationSummary } from "@/resources/admin-chatbot/admin-chatbot.types";
import { useDebounce } from "@/hooks/useDebounce";

export const useChatbotConversationLogsTab = () => {
  const filterStore = useChatbotConversationFilterStore();

  // Search state
  const [searchValue, setSearchValue] = useState(filterStore.userId || "");
  const debouncedSearch = useDebounce(searchValue, 500);

  // Stats
  const { data: stats, isLoading: isStatsLoading } = useChatbotConversationStats();

  // Selected conversation for drawer
  const [selectedConversation, setSelectedConversation] = useState<ChatbotConversationSummary | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Fetching conversations
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useChatbotConversationList({
    status: filterStore.status,
    userId: debouncedSearch || undefined, // Using userId filter for search for now as per mobile app pattern
    sort: filterStore.sort,
    pageSize: filterStore.pageSize,
  });

  const conversations = useMemo(() => data?.pages.flatMap((page) => page.items) ?? [], [data]);
  const total = data?.pages[0]?.total ?? 0;

  // Handlers
  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const handleStatusFilterChange = useCallback(
    (status?: ChatbotConversationSummary["status"]) => {
      filterStore.setFilters({ status, page: 1 });
    },
    [filterStore]
  );

  const handleViewConversation = useCallback((item: ChatbotConversationSummary) => {
    setSelectedConversation(item);
    setIsDrawerOpen(true);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedConversation(null), 300);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    conversations,
    total,
    stats,
    isStatsLoading,
    filterStore,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    searchValue,
    handleSearchChange,
    handleStatusFilterChange,
    handleLoadMore,
    selectedConversation,
    isDrawerOpen,
    handleViewConversation,
    handleCloseDrawer,
  };
};
