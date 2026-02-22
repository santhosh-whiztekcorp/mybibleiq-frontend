"use client";

import React from "react";
import { List, LayoutGrid } from "lucide-react";
import { SearchIcon } from "@/assets";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ChatbotConversationStats,
  ChatbotConversationDataTable,
  ChatbotConversationCardList,
  ChatbotConversationDetailDrawer,
} from "@/components/admin/admin-chatbot";
import { useChatbotConversationLogsTab } from "./ChatbotConversationLogsTab.hooks";
import { ChatbotConversationSummary } from "@/resources/admin-chatbot/admin-chatbot.types";
import {
  CHATBOT_CONVERSATION_STATUS_OPTIONS,
  CHATBOT_CONVERSATION_STATUS_LABELS,
} from "@/resources/admin-chatbot/admin-chatbot.constants";
import { useAdminViewStore } from "@/store/useAdminViewStore";
import { cn } from "@/lib/utils";
import { ChatbotTabProps } from "../ChatbotManagerPage.types";

export function ChatbotConversationLogsTab({ active }: ChatbotTabProps) {
  const {
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
  } = useChatbotConversationLogsTab();

  const { viewMode, setViewMode } = useAdminViewStore();

  if (!active) return null;

  return (
    <div className="space-y-6">
      {/* Stats and Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 h-full md:items-stretch">
        <div className="w-full md:w-[350px] shrink-0">
          <ChatbotConversationStats stats={stats} isLoading={isStatsLoading} />
        </div>

        {/* Filters Section */}
        <div className="flex-1 flex flex-wrap items-end gap-2 bg-white p-2 rounded-lg border border-[#E2E8F0]">
          <div className="w-full space-y-1.5 order-first mb-2">
            <label className="text-xs font-bold text-[#656A73] uppercase text-nowrap">Search</label>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#656A73] pointer-events-none" />
              <Input
                variant="adminSearchBar"
                placeholder="Search by User ID..."
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 h-11"
              />
            </div>
          </div>

          <div className="flex-1 min-w-[150px] space-y-1.5">
            <label className="text-xs font-bold text-[#656A73] uppercase">Status</label>
            <Select
              value={filterStore.status ?? "all"}
              onValueChange={(value) =>
                handleStatusFilterChange(value === "all" ? undefined : (value as ChatbotConversationSummary["status"]))
              }
            >
              <SelectTrigger variant="adminFilter">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {CHATBOT_CONVERSATION_STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {CHATBOT_CONVERSATION_STATUS_LABELS[status]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              handleStatusFilterChange(undefined);
              handleSearchChange("");
            }}
            className="h-11 px-4 border-[#E2E8F0] text-xs font-bold uppercase text-[#656A73] rounded-lg hidden md:flex"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {/* View Switcher and Count */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="inline-flex p-1 bg-[#F1F5F9] rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("table")}
                className={cn(
                  "h-8 px-3 text-[10px] font-bold uppercase transition-all",
                  viewMode === "table"
                    ? "bg-white text-primary shadow-sm"
                    : "border-transparent text-[#656A73] hover:text-primary"
                )}
              >
                <List className="h-3.5 w-3.5 mr-1.5" />
                Table
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("card")}
                className={cn(
                  "h-8 px-3 text-[10px] font-bold uppercase transition-all",
                  viewMode === "card"
                    ? "bg-white text-primary shadow-sm"
                    : "border-transparent text-[#656A73] hover:text-primary"
                )}
              >
                <LayoutGrid className="h-3.5 w-3.5 mr-1.5" />
                Cards
              </Button>
            </div>
          </div>
          <div className="text-sm font-semibold text-muted-foreground">Total Conversations: {total}</div>
        </div>

        {/* Content View */}
        {viewMode === "table" ? (
          <div className="hidden md:block bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
            <ChatbotConversationDataTable
              items={conversations}
              isLoading={isLoading}
              total={total}
              pagination={{
                pageIndex: (filterStore.page || 1) - 1,
                pageSize: filterStore.pageSize || 20,
              }}
              onPaginationChange={(p) => filterStore.setFilters({ page: p.pageIndex + 1 })}
              onView={handleViewConversation}
            />
          </div>
        ) : (
          <div className="hidden md:block">
            <ChatbotConversationCardList
              items={conversations}
              isLoading={isLoading}
              onView={handleViewConversation}
              onLoadMore={handleLoadMore}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </div>
        )}

        {/* Mobile View: Always Cards */}
        <div className="md:hidden">
          <ChatbotConversationCardList
            items={conversations}
            isLoading={isLoading}
            onView={handleViewConversation}
            onLoadMore={handleLoadMore}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
      </div>

      {/* Detail Drawer */}
      <ChatbotConversationDetailDrawer
        conversation={selectedConversation}
        open={isDrawerOpen}
        onOpenChange={handleCloseDrawer}
      />
    </div>
  );
}
