"use client";

import React from "react";
import { Loader2, AlertCircle, List, LayoutGrid } from "lucide-react";
import { LeaderboardDataTable } from "@/components/admin/admin-group-management/LeaderboardDataTable/LeaderboardDataTable";
import { LeaderboardCardList } from "@/components/admin/admin-group-management/LeaderboardCardList/LeaderboardCardList";
import { useGroupLeaderboardTab } from "./GroupLeaderboardTab.hooks";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ADMIN_GROUP_LEADERBOARD_PERIOD_SELECT_OPTIONS } from "@/resources/admin-group-management/admin-group-management.constants";
import { useAdminViewStore } from "@/store/useAdminViewStore";
import { cn } from "@/lib/utils";

export function GroupLeaderboardTab() {
  const { viewMode, setViewMode } = useAdminViewStore();

  const {
    leaderboard,
    total,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    handleLoadMore,
    handlePaginationChange,
    handlePeriodChange,
    period,
    pagination,
  } = useGroupLeaderboardTab();

  if (isLoading && leaderboard.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4 bg-white rounded-xl border border-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-[#989FE2]" />
        <p className="text-sm font-medium text-slate-500 italic">Calculating rankings...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4 bg-white rounded-xl border border-red-100 p-6 text-center">
        <AlertCircle className="h-8 w-8 text-destructive" />
        <div>
          <h4 className="font-bold text-slate-900">Failed to load leaderboard</h4>
          <p className="text-sm text-slate-500 mt-1">Please try refreshing the page later.</p>
        </div>
      </div>
    );
  }

  const renderFilters = () => (
    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
      <div className="w-full sm:w-[180px]">
        <Select value={period || "week"} onValueChange={handlePeriodChange}>
          <SelectTrigger variant="adminFilter">
            <SelectValue placeholder="This Week" />
          </SelectTrigger>
          <SelectContent>
            {ADMIN_GROUP_LEADERBOARD_PERIOD_SELECT_OPTIONS.map((option) => (
              <SelectItem key={String(option.value)} value={String(option.value)}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  if (leaderboard.length === 0 && !period) {
    return (
      <div className="flex flex-col gap-4">
        {renderFilters()}
        <div className="hidden md:flex items-center gap-3">
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
          <div className="text-sm font-semibold text-muted-foreground">Total: {total}</div>
        </div>
        <div className="flex h-64 flex-col items-center justify-center gap-2 bg-white rounded-xl border border-gray-100 p-6 text-center">
          <p className="text-lg font-bold text-slate-900">No rankings yet</p>
          <p className="text-sm text-slate-500 max-w-xs">Members will appear here once they start earning IQ points.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Filters */}
      {renderFilters()}

      {/* Desktop View Switcher */}
      <div className="hidden md:flex items-center gap-3">
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
        <div className="text-sm font-semibold text-muted-foreground">Total Members: {total}</div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block bg-white rounded-xl">
        {leaderboard.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center gap-2 p-6 text-center">
            <p className="text-lg font-bold text-slate-900">No results found</p>
            <p className="text-sm text-slate-500">Try adjusting your filters.</p>
          </div>
        ) : viewMode === "table" ? (
          <LeaderboardDataTable
            items={leaderboard}
            total={total}
            isLoading={isLoading}
            pagination={pagination}
            onPaginationChange={handlePaginationChange}
          />
        ) : (
          <LeaderboardCardList
            items={leaderboard}
            onLoadMore={handleLoadMore}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isLoading={isLoading}
          />
        )}
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {leaderboard.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center gap-2 bg-white rounded-xl border border-gray-100 p-6 text-center">
            <p className="text-lg font-bold text-slate-900">No results found</p>
            <p className="text-sm text-slate-500">Try adjusting your filters.</p>
          </div>
        ) : (
          <LeaderboardCardList
            items={leaderboard}
            onLoadMore={handleLoadMore}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}
