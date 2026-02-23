"use client";

import React from "react";
import { ActivityLogDataTable } from "@/components/admin/admin-group-management/ActivityLogDataTable/ActivityLogDataTable";
import { ActivityLogCard } from "@/components/admin/admin-group-management/ActivityLogCard/ActivityLogCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useGroupActivityLogView } from "./GroupActivityLogView.hooks";
import { Loader2, Activity, List, LayoutGrid } from "lucide-react";
import { useAdminViewStore } from "@/store/useAdminViewStore";
import { cn } from "@/lib/utils";
import {
  ADMIN_GROUP_ACTIVITY_EVENT_TYPE_SELECT_OPTIONS,
  ADMIN_GROUP_ACTIVITY_LOG_TIME_SELECT_OPTIONS,
  type AdminGroupActivityLogTimePeriod,
} from "@/resources/admin-group-management/admin-group-management.constants";

export function GroupActivityLogView() {
  const { data, isLoading, total, pagination, setPagination, typeFilter, setTypeFilter, timeFilter, setTimeFilter } =
    useGroupActivityLogView();

  const { viewMode, setViewMode } = useAdminViewStore();

  if (isLoading && data.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!data.length && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mb-4">
          <Activity className="h-6 w-6 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-1">No activity log yet</h3>
        <p className="text-slate-500 max-w-sm">There are no activity logs to display for this group at the moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters Row */}
      <div className="flex flex-col md:flex-row items-start gap-4 mb-4">
        <div className="w-full md:w-auto flex flex-row gap-4">
          <Select value={timeFilter} onValueChange={(v) => setTimeFilter(v as AdminGroupActivityLogTimePeriod)}>
            <SelectTrigger variant="adminFilter" className="w-full md:w-[180px]">
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent>
              {ADMIN_GROUP_ACTIVITY_LOG_TIME_SELECT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value as string} value={opt.value as string}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger variant="adminFilter" className="w-full md:w-[180px]">
              <SelectValue placeholder="All Events" />
            </SelectTrigger>
            <SelectContent>
              {ADMIN_GROUP_ACTIVITY_EVENT_TYPE_SELECT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value as string} value={opt.value as string}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

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
        <div className="text-sm font-semibold text-muted-foreground">Total Logs: {total}</div>
      </div>

      {/* Desktop Table or Card View */}
      <div className="hidden md:block">
        {viewMode === "table" ? (
          <ActivityLogDataTable
            data={data}
            isLoading={isLoading}
            total={total}
            pagination={pagination}
            onPaginationChange={setPagination}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {data.map((entry, index) => (
              <ActivityLogCard key={`${entry.timestamp}-${index}`} entry={entry} />
            ))}
            {isLoading && (
              <div className="flex justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Card View (Always) */}
      <div className="md:hidden flex flex-col gap-6">
        {data.map((entry, index) => (
          <ActivityLogCard key={`${entry.timestamp}-${index}`} entry={entry} />
        ))}
        {isLoading && (
          <div className="flex justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
          </div>
        )}
      </div>
    </div>
  );
}
