"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, AlertCircle, List, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ADMIN_GROUP_ASSIGNMENT_STATUS_SELECT_OPTIONS } from "@/resources/admin-group-management/admin-group-management.constants";
import { useGroupAssignmentsTab } from "./GroupAssignmentsTab.hooks";
import { AssignmentDataTable } from "@/components/admin/admin-group-management/AssignmentDataTable/AssignmentDataTable";
import { AssignmentCardList } from "@/components/admin/admin-group-management/AssignmentCardList/AssignmentCardList";
import { useAdminViewStore } from "@/store/useAdminViewStore";
import { cn } from "@/lib/utils";

export function GroupAssignmentsTab() {
  const { viewMode, setViewMode } = useAdminViewStore();

  const {
    status,
    assignments,
    total,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    handleStatusChange,
    handlePaginationChange,
    pagination,
  } = useGroupAssignmentsTab();

  if (isLoading && !isFetchingNextPage) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2 text-red-500">
        <AlertCircle className="h-8 w-8" />
        <p>Error loading assignments. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      {/* Header with Filter */}
      <div className="w-full md:w-[200px]">
        <Select value={status || "all"} onValueChange={handleStatusChange}>
          <SelectTrigger variant="adminFilter">
            <SelectValue placeholder="All Assignments" />
          </SelectTrigger>
          <SelectContent>
            {ADMIN_GROUP_ASSIGNMENT_STATUS_SELECT_OPTIONS.map((option) => (
              <SelectItem key={String(option.value)} value={String(option.value)}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

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
        <div className="text-sm font-semibold text-muted-foreground">Total: {total}</div>
      </div>

      {/* Desktop View: Data Table or Card List based on viewMode */}
      <div className="hidden md:block bg-white rounded-xl">
        {viewMode === "table" ? (
          <AssignmentDataTable
            items={assignments}
            isLoading={isLoading}
            total={total}
            pagination={pagination}
            onPaginationChange={handlePaginationChange}
          />
        ) : (
          <AssignmentCardList
            items={assignments}
            isLoading={isLoading}
            onLoadMore={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
      </div>

      {/* Mobile View: Card List (Always) */}
      <div className="md:hidden">
        <AssignmentCardList
          items={assignments}
          isLoading={isLoading}
          onLoadMore={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  );
}
