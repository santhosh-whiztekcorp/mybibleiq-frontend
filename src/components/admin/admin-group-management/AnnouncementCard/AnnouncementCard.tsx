"use client";

import React from "react";
import { format } from "date-fns";
import { Eye, Trash2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AnnouncementCardProps } from "./AnnouncementCard.types";

export function AnnouncementCard({ announcement, onRejectAnnouncement, onViewReports }: AnnouncementCardProps) {
  const { content, postedBy, postedAt, views, isFlagged } = announcement;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border bg-white p-4">
      {/* Header */}
      <div className="flex justify-between items-start gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
          <Eye className="h-3 w-3" />
          <span className="font-medium">{views} views</span>
        </div>
        {isFlagged && (
          <div className="px-2 py-1 rounded-md bg-red-50 border border-red-100">
            <span className="text-xs font-bold text-red-600">Flagged</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        <p className="text-sm text-slate-900 line-clamp-3 leading-relaxed">{content}</p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-50">
        <div className="flex flex-col">
          <span className="text-xs text-slate-400 mb-0.5">Posted By</span>
          <span className="text-sm font-bold text-slate-900 line-clamp-1">{postedBy.name}</span>
          <span className="text-xs text-slate-400 truncate">@{postedBy.username}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-slate-400 mb-0.5">Posted Date</span>
          <span className="text-sm font-bold text-slate-900">{format(new Date(postedAt), "MMM dd, yyyy")}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-col gap-2">
        <Button
          variant="outline"
          className="w-full bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900 border-blue-300 font-bold h-11 rounded-xl shadow-none"
          onClick={() => onViewReports?.(announcement)}
        >
          <FileText className="h-4 w-4" />
          View Reports
        </Button>
        <Button
          className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold h-11 rounded-xl shadow-none"
          onClick={() => onRejectAnnouncement?.(announcement.id)}
        >
          <Trash2 className="h-4 w-4" />
          Reject Announcement
        </Button>
      </div>
    </div>
  );
}
