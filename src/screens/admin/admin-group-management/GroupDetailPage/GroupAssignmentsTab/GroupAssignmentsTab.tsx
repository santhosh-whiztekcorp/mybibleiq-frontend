"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, AlertCircle } from "lucide-react";
import { ADMIN_GROUP_ASSIGNMENT_STATUS_SELECT_OPTIONS } from "@/resources/admin-group-management/admin-group-management.constants";
import { useGroupAssignmentsTab } from "./GroupAssignmentsTab.hooks";
import { AssignmentDataTable } from "@/components/admin/admin-group-management/AssignmentDataTable/AssignmentDataTable";
import { AssignmentCardList } from "@/components/admin/admin-group-management/AssignmentCardList/AssignmentCardList";

export function GroupAssignmentsTab() {
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
      <div className="flex items-center justify-between">
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
      </div>

      {/* Desktop View: Data Table */}
      <div className="hidden md:block bg-white rounded-xl">
        <AssignmentDataTable
          items={assignments}
          isLoading={isLoading}
          total={total}
          pagination={pagination}
          onPaginationChange={handlePaginationChange}
        />
      </div>

      {/* Mobile View: Card List */}
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
