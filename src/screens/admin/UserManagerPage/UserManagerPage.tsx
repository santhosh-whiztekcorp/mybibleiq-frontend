"use client";

import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SearchIcon } from "@/assets";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { UserManagementStats, UserDataTable, UserCardList } from "@/components/admin/admin-user-management";
import { useUserManagerPage } from "./UserManagerPage.hooks";
import { USER_STATUS_OPTIONS, USER_STATUS_LABELS } from "@/resources/admin-user-management";
import type { AdminUserListInput } from "@/resources/admin-user-management";
import { UserIcon, List, LayoutGrid } from "lucide-react";
import { useAdminViewStore } from "@/store/useAdminViewStore";
import { cn } from "@/lib/utils";

export function UserManagerPage() {
  const {
    users,
    total,
    statusStats,
    isStatusStatsLoading,
    filterStore,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    handleSearchChange,
    handleStatusFilterChange,
    handlePaginationChange,
    handleSortChange,
    sortOptions,
    handleLoadMore,
    handleViewUser,
  } = useUserManagerPage();

  const { viewMode, setViewMode } = useAdminViewStore();

  return (
    <div className="w-full space-y-4 md:space-y-6">
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <UserIcon width={20} height={20} className="text-black" />
            <h1 className="text-xl font-bold text-black">User Manager</h1>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden space-y-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <UserIcon width={18} height={18} className="text-black" />
          <h1 className="text-lg font-bold text-black">User Manager</h1>
        </div>
      </div>

      {/* Stats and Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 h-full md:items-stretch">
        <div className="w-full md:w-[350px] shrink-0">
          <UserManagementStats stats={statusStats} isLoading={isStatusStatsLoading} />
        </div>

        {/* Filters Section */}
        <div className="flex-1 flex flex-wrap items-end gap-2 bg-white p-2 rounded-lg border border-[#E2E8F0]">
          <div className="w-full space-y-1.5 order-first mb-2">
            <label className="text-xs font-bold text-[#656A73] uppercase text-nowrap">Search</label>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#656A73] pointer-events-none" />
              <Input
                variant="adminSearchBar"
                placeholder="Search by name, username, or location..."
                value={filterStore.q ?? ""}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 h-11"
              />
            </div>
          </div>

          <div className="flex-1 min-w-[200px] space-y-1.5">
            <label className="text-xs font-bold text-[#656A73] uppercase">Status</label>
            <Select
              value={filterStore.status ?? "all"}
              onValueChange={(value) => handleStatusFilterChange(value === "all" ? undefined : value)}
            >
              <SelectTrigger variant="adminFilter">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {USER_STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {USER_STATUS_LABELS[status]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[200px] space-y-1.5">
            <label className="text-xs font-bold text-[#656A73] uppercase">Sort By</label>
            <Select
              value={filterStore.sort}
              onValueChange={(value) => handleSortChange(value as AdminUserListInput["sort"])}
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
        <div className="hidden md:flex items-center gap-3 mb-2">
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
          <div className="text-sm font-semibold text-muted-foreground">Total Users: {total}</div>
        </div>

        {/* Desktop View: Data Table or Card List based on viewMode */}
        <div className="hidden md:block">
          {viewMode === "table" ? (
            <div className="bg-white rounded-lg border border-[#E2E8F0] overflow-hidden">
              <UserDataTable
                items={users}
                isLoading={isLoading}
                total={total}
                pagination={{
                  pageIndex: (filterStore.page || 1) - 1,
                  pageSize: filterStore.pageSize || 10,
                }}
                onPaginationChange={handlePaginationChange}
                onView={(item) => handleViewUser(item.id)}
              />
            </div>
          ) : (
            <UserCardList
              items={users}
              isLoading={isLoading}
              onView={(item) => handleViewUser(item.id)}
              onLoadMore={handleLoadMore}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
        </div>

        {/* Mobile View: Card List (Always) */}
        <div className="md:hidden">
          <UserCardList
            items={users}
            isLoading={isLoading}
            onView={(item) => handleViewUser(item.id)}
            onLoadMore={handleLoadMore}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
      </div>
    </div>
  );
}
