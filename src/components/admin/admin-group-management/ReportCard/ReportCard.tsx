"use client";

import React from "react";
import { format } from "date-fns";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ReportCardProps } from "./ReportCard.types";

export function ReportCard({ report, onDismissReport, onWarnLeader }: ReportCardProps) {
  const { title, description, reportedBy, reportedAt } = report;

  return (
    <div className="flex flex-col gap-4 rounded-2xl border bg-white p-4">
      {/* Header */}
      <div>
        <h4 className="text-lg font-bold text-slate-900 mb-1">{title}</h4>
        <p className="text-sm text-slate-500 line-clamp-2">{description || "No description provided"}</p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-slate-400 mb-0.5">Reported By</span>
          <span className="text-sm font-bold text-slate-900">{reportedBy.name}</span>
          <span className="text-xs text-slate-400">@{reportedBy.username}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-slate-400 mb-0.5">Reported Date</span>
          <span className="text-sm font-bold text-slate-900">{format(new Date(reportedAt), "MMM dd, yyyy")}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mt-2">
        <Button
          className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold h-11 rounded-xl"
          onClick={() => onWarnLeader?.(report.id)}
        >
          <Shield className="h-4 w-4" />
          Warn Leader
        </Button>
        <Button
          variant="outline"
          className="w-full border-gray-200 text-slate-900 font-bold h-11 rounded-xl bg-white hover:bg-slate-50"
          onClick={() => onDismissReport?.(report.id)}
        >
          Dismiss Report
        </Button>
      </div>
    </div>
  );
}
