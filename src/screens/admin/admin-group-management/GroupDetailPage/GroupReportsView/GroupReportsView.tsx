import React, { useState } from "react";
import { Loader2, AlertCircle, List, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReportDataTable } from "@/components/admin/admin-group-management/ReportDataTable/ReportDataTable";
import { ReportCardList } from "@/components/admin/admin-group-management/ReportCardList/ReportCardList";
import { useGroupReportsView } from "./GroupReportsView.hooks";
import { useAdminViewStore } from "@/store/useAdminViewStore";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export function GroupReportsView() {
  const {
    reports,
    total,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    handleLoadMore,
    handlePaginationChange,
    triggerDismissReport,
    triggerWarnLeader,
    pagination,
  } = useGroupReportsView();

  const { viewMode, setViewMode } = useAdminViewStore();

  const [reportToDismiss, setReportToDismiss] = useState<string | null>(null);
  const [reportToWarn, setReportToWarn] = useState<string | null>(null);
  const [warnMessage, setWarnMessage] = useState("");

  const handleDismissClick = (reportId: string) => {
    setReportToDismiss(reportId);
  };

  const handleWarnClick = (reportId: string) => {
    setReportToWarn(reportId);
  };

  const onConfirmDismiss = () => {
    if (reportToDismiss) {
      triggerDismissReport(reportToDismiss);
      setReportToDismiss(null);
    }
  };

  const onConfirmWarn = () => {
    if (reportToWarn && warnMessage.trim()) {
      triggerWarnLeader(reportToWarn, warnMessage);
      setReportToWarn(null);
      setWarnMessage("Your group has received a new report. Please review the group guidelines.");
    }
  };

  if (isLoading && reports.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4 bg-white rounded-xl border border-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-[#989FE2]" />
        <p className="text-sm font-medium text-slate-500 italic">Loading reports...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4 bg-white rounded-xl border border-red-100 p-6 text-center">
        <AlertCircle className="h-8 w-8 text-destructive" />
        <div>
          <h4 className="font-bold text-slate-900">Failed to load reports</h4>
          <p className="text-sm text-slate-500 mt-1">Please try refreshing the page later.</p>
        </div>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex h-64 flex-col items-center justify-center gap-2 bg-white rounded-xl border border-gray-100 p-6 text-center">
          <p className="text-lg font-bold text-slate-900">No reports found</p>
          <p className="text-sm text-slate-500 max-w-xs">There are no reports for this group.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* View Switcher (Desktop only) */}
      <div className="hidden md:flex justify-between items-center">
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
        <div className="text-sm font-semibold text-muted-foreground mr-2">Total Reports: {total}</div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block bg-white rounded-xl">
        {viewMode === "table" ? (
          <ReportDataTable
            items={reports}
            total={total}
            isLoading={isLoading}
            pagination={pagination}
            onPaginationChange={handlePaginationChange}
            onDismissReport={handleDismissClick}
            onWarnLeader={handleWarnClick}
          />
        ) : (
          <ReportCardList
            items={reports}
            onLoadMore={handleLoadMore}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isLoading={isLoading}
            onDismissReport={handleDismissClick}
            onWarnLeader={handleWarnClick}
          />
        )}
      </div>

      {/* Mobile View (Always Cards) */}
      <div className="block md:hidden">
        <ReportCardList
          items={reports}
          onLoadMore={handleLoadMore}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          isLoading={isLoading}
          onDismissReport={handleDismissClick}
          onWarnLeader={handleWarnClick}
        />
      </div>

      {/* Confirmation Dialogs */}
      <Dialog open={!!reportToDismiss} onOpenChange={(open) => !open && setReportToDismiss(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dismiss Report</DialogTitle>
            <DialogDescription>
              Are you sure you want to dismiss this report? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReportToDismiss(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onConfirmDismiss}>
              Dismiss
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!reportToWarn} onOpenChange={(open) => !open && setReportToWarn(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Warn Group Leader</DialogTitle>
            <DialogDescription>
              Are you sure you want to warn the group leader? This will send a notification to the leader regarding this
              report.
            </DialogDescription>
          </DialogHeader>
          <div className="px-5 -mt-4">
            <label htmlFor="warn-message" className="block text-sm font-semibold text-slate-700 mb-2">
              Message <span className="text-red-600">*</span>
            </label>
            <Textarea
              id="warn-message"
              value={warnMessage}
              onChange={(e) => setWarnMessage(e.target.value)}
              placeholder="Enter warning message..."
              className="min-h-[100px]"
              variant="adminPrimary"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReportToWarn(null)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={onConfirmWarn}
              disabled={!warnMessage.trim()}
            >
              Warn Leader
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
