"use client";

import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SearchIcon } from "@/assets";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Users, List, LayoutGrid } from "lucide-react";
import { useGroupManagerPage } from "./GroupManagerPage.hooks";
import { GroupManagementStats } from "@/components/admin/admin-group-management/GroupManagementStats/GroupManagementStats";
import { GroupDataTable } from "@/components/admin/admin-group-management/GroupDataTable/GroupDataTable";
import { GroupCardList } from "@/components/admin/admin-group-management/GroupCardList/GroupCardList";
import { AdminGroupListInput } from "@/resources/admin-group-management/admin-group-management.types";
import { useAdminViewStore } from "@/store/useAdminViewStore";
import { cn } from "@/lib/utils";

import {
  ADMIN_GROUP_STATUS_SELECT_OPTIONS,
  ADMIN_GROUP_TYPE_SELECT_OPTIONS,
} from "@/resources/admin-group-management/admin-group-management.constants";

export function GroupManagerPage() {
  const {
    groups,
    total,
    stats,
    isStatsLoading,
    filterStore,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    handleSearchChange,
    handleStatusFilterChange,
    handleTypeFilterChange,
    handlePaginationChange,
    handleSortChange,
    sortOptions,
    handleLoadMore,
    handleViewGroup,
  } = useGroupManagerPage();

  const { viewMode, setViewMode } = useAdminViewStore();

  return (
    <div className="w-full space-y-4 md:space-y-6">
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <Users width={20} height={20} className="text-black" />
            <h1 className="text-xl font-bold text-black">Group Manager</h1>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden space-y-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <Users width={18} height={18} className="text-black" />
          <h1 className="text-lg font-bold text-black">Group Manager</h1>
        </div>
      </div>

      {/* Stats and Filters Section (Matching UserManagerPage) */}
      <div className="flex flex-col md:flex-row gap-4 md:items-stretch">
        <div className="w-full md:w-[350px] shrink-0">
          <GroupManagementStats stats={stats} isLoading={isStatsLoading} />
        </div>

        {/* Filters Section */}
        <div className="flex-1 flex flex-wrap items-end content-between gap-4 bg-white p-2 rounded-xl border border-[#E2E8F0]">
          <div className="w-full space-y-1.5 order-first">
            <label className="text-xs font-bold text-[#656A73] uppercase text-nowrap">Search</label>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#656A73] pointer-events-none" />
              <Input
                variant="adminSearchBar"
                placeholder="Search Groups, Leader..."
                value={filterStore.q ?? ""}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 h-11"
              />
            </div>
          </div>

          <div className="flex-1 min-w-[140px] space-y-1.5">
            <label className="text-xs font-bold text-[#656A73] uppercase">Type</label>
            <Select
              value={filterStore.type ?? "all"}
              onValueChange={(value) => handleTypeFilterChange(value === "all" ? undefined : value)}
            >
              <SelectTrigger variant="adminFilter">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                {ADMIN_GROUP_TYPE_SELECT_OPTIONS.map((opt) => (
                  <SelectItem key={String(opt.value)} value={String(opt.value)}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[140px] space-y-1.5">
            <label className="text-xs font-bold text-[#656A73] uppercase">Status</label>
            <Select
              value={filterStore.status ?? "all"}
              onValueChange={(value) => handleStatusFilterChange(value === "all" ? undefined : value)}
            >
              <SelectTrigger variant="adminFilter">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                {ADMIN_GROUP_STATUS_SELECT_OPTIONS.map((opt) => (
                  <SelectItem key={String(opt.value)} value={String(opt.value)}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[140px] space-y-1.5">
            <label className="text-xs font-bold text-[#656A73] uppercase">Sort By</label>
            <Select
              value={filterStore.sort}
              onValueChange={(value) => handleSortChange(value as AdminGroupListInput["sort"])}
            >
              <SelectTrigger variant="adminFilter">
                <SelectValue placeholder="Newest First" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
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
              handleTypeFilterChange(undefined);
              handleSortChange("-createdAt");
              handleSearchChange("");
            }}
            className="h-11 px-4 border-[#E2E8F0] text-xs font-bold uppercase text-[#656A73] rounded-lg hidden md:flex"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {/* View Switcher (Desktop only) */}
        <div className="hidden md:flex items-center mb-2 gap-5">
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
          <div className="text-sm font-semibold text-muted-foreground mr-2">Total Groups: {total}</div>
        </div>

        {/* Desktop View: Data Table or Card List based on viewMode */}
        <div className="hidden md:block">
          {viewMode === "table" ? (
            <GroupDataTable
              items={groups}
              isLoading={isLoading}
              total={total}
              pagination={{
                pageIndex: (filterStore.page || 1) - 1,
                pageSize: filterStore.pageSize || 10,
              }}
              onPaginationChange={handlePaginationChange}
              onView={(id) => handleViewGroup(id)}
            />
          ) : (
            <GroupCardList
              items={groups}
              isLoading={isLoading}
              onView={(id) => handleViewGroup(id)}
              onLoadMore={handleLoadMore}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
        </div>

        {/* Mobile View: Card List (Always) */}
        <div className="md:hidden">
          <GroupCardList
            items={groups}
            isLoading={isLoading}
            onView={(id) => handleViewGroup(id)}
            onLoadMore={handleLoadMore}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
      </div>
    </div>
  );
}
