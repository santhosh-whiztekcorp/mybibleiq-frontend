"use client";

import { Loader2, Megaphone, Trash2, FileText, List, LayoutGrid } from "lucide-react";
import { AnnouncementDataTable } from "@/components/admin/admin-group-management/AnnouncementDataTable/AnnouncementDataTable";
import { AnnouncementCard } from "@/components/admin/admin-group-management/AnnouncementCard/AnnouncementCard";
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
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { useInView } from "react-intersection-observer";
import { useGroupAnnouncementsView } from "./GroupAnnouncementsView.hooks";
import { useState, useEffect } from "react";

export function GroupAnnouncementsView() {
  const {
    announcements,
    total,
    isLoading,
    pagination,
    handlePaginationChange,
    triggerRejectAnnouncement,
    confirmReject,
    rejectId,
    setRejectId,
    isRejecting,
    isReportsModalOpen,
    setIsReportsModalOpen,
    triggerViewReports,
    reports,
    isReportsLoading,
    isReportsFetchingNextPage,
    hasMoreReports,
    handleReportsLoadMore,
  } = useGroupAnnouncementsView();

  const { viewMode, setViewMode } = useAdminViewStore();

  const [rejectMessage, setRejectMessage] = useState("");
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasMoreReports && !isReportsFetchingNextPage) {
      handleReportsLoadMore();
    }
  }, [inView, hasMoreReports, isReportsFetchingNextPage, handleReportsLoadMore]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!announcements.length) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mb-4">
          <Megaphone className="h-6 w-6 text-slate-400" />
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-1">No announcements yet</h3>
        <p className="text-slate-500 max-w-sm">There are no announcements to display for this group at the moment.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* View Switcher (Desktop only) */}
      <div className="hidden md:flex items-center gap-5">
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
        <div className="text-sm font-semibold text-muted-foreground mr-2">Total Announcements: {total}</div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block bg-white rounded-xl">
        {viewMode === "table" ? (
          <AnnouncementDataTable
            data={announcements}
            isLoading={isLoading}
            total={total}
            pagination={pagination}
            onPaginationChange={handlePaginationChange}
            onRejectAnnouncement={triggerRejectAnnouncement}
            onViewReports={triggerViewReports}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                onRejectAnnouncement={triggerRejectAnnouncement}
                onViewReports={triggerViewReports}
              />
            ))}
          </div>
        )}
      </div>

      {/* Mobile View (Always Cards) */}
      <div className="md:hidden flex flex-col gap-4">
        {announcements.map((announcement) => (
          <AnnouncementCard
            key={announcement.id}
            announcement={announcement}
            onRejectAnnouncement={triggerRejectAnnouncement}
            onViewReports={triggerViewReports}
          />
        ))}
      </div>

      <Dialog open={!!rejectId} onOpenChange={(open: boolean) => !open && setRejectId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              Reject Announcement?
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this announcement? This action cannot be undone and the announcement will
              be removed.
            </DialogDescription>
          </DialogHeader>
          <div className="px-5 -mt-4">
            <label htmlFor="reject-message" className="block text-sm font-semibold text-slate-700 mb-2">
              Reason <span className="text-red-600">*</span>
            </label>
            <Textarea
              id="reject-message"
              value={rejectMessage}
              onChange={(e) => setRejectMessage(e.target.value)}
              placeholder="Enter rejection reason..."
              className="min-h-[100px]"
              variant="adminPrimary"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" disabled={isRejecting} onClick={() => setRejectId(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                if (rejectMessage.trim()) {
                  confirmReject(rejectMessage);
                  setRejectMessage("This announcement violates group guidelines.");
                }
              }}
              disabled={isRejecting || !rejectMessage.trim()}
            >
              {isRejecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Rejecting...
                </>
              ) : (
                "Reject Announcement"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Sheet open={isReportsModalOpen} onOpenChange={setIsReportsModalOpen}>
        <SheetContent side="right" className="sm:max-w-[500px] flex flex-col w-full p-0">
          <SheetHeader className="p-6 pb-2">
            <SheetTitle>Announcement Reports</SheetTitle>
            <SheetDescription>Review the reports submitted for this announcement by group members.</SheetDescription>
          </SheetHeader>

          <ScrollArea className="flex-1 overflow-y-auto w-full">
            {isReportsLoading && reports.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10">
                <Loader2 className="h-8 w-8 text-slate-400 animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Loading reports...</p>
              </div>
            ) : reports.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 mt-4">
                <FileText className="h-10 w-10 text-slate-300 mb-3" />
                <h3 className="text-sm font-medium text-slate-900 mb-1">No reports found</h3>
                <p className="text-xs text-slate-500">There are no reports for this announcement.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 py-4 px-5">
                {reports.map((report) => (
                  <div key={report.id} className="p-4 rounded-xl border bg-white flex flex-col gap-3">
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-slate-900 font-medium leading-relaxed">{report.reason}</p>
                      <span className="text-xs text-slate-400 shrink-0 ml-4 font-medium">
                        {format(new Date(report.reportedAt), "MMM dd, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 font-medium">{report.reportedBy.name}</span>
                        <span className="text-xs text-slate-400">@{report.reportedBy.username}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {hasMoreReports && (
                  <div ref={loadMoreRef} className="flex flex-col items-center justify-center pt-4 pb-2">
                    {isReportsFetchingNextPage ? (
                      <Loader2 className="h-6 w-6 text-slate-400 animate-spin" />
                    ) : (
                      <span className="text-xs text-slate-400">Scroll for more...</span>
                    )}
                  </div>
                )}
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
