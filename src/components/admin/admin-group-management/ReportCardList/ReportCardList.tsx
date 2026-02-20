"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { ReportCard } from "../ReportCard/ReportCard";
import { useReportCardList } from "./ReportCardList.hooks";
import type { ReportCardListProps } from "./ReportCardList.types";

export function ReportCardList({
  items,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
  isLoading,
  onDismissReport,
  onWarnLeader,
}: ReportCardListProps) {
  const { loadMoreRef } = useReportCardList({
    onLoadMore,
    hasNextPage,
    isFetchingNextPage,
  });

  if (isLoading && items.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((report) => (
        <ReportCard key={report.id} report={report} onDismissReport={onDismissReport} onWarnLeader={onWarnLeader} />
      ))}

      {/* Infinite scroll trigger */}
      <div ref={loadMoreRef} className="flex h-10 items-center justify-center">
        {isFetchingNextPage && (
          <div className="flex items-center gap-2 text-slate-400 animate-pulse">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-xs font-medium">Loading more reports...</span>
          </div>
        )}
      </div>
    </div>
  );
}
