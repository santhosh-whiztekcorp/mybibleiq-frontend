"use client";

import { useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AdminGroupReport } from "@/resources/admin-group-management/admin-group-management.types";

export const useReportDataTableColumns = (
  onDismissReport?: (reportId: string) => void,
  onWarnLeader?: (reportId: string) => void
): ColumnDef<AdminGroupReport>[] => {
  return useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Report",
        cell: ({ row }) => (
          <div className="flex flex-col max-w-[300px]">
            <span className="font-semibold text-sm truncate" title={row.original.title}>
              {row.original.title}
            </span>
            <span className="text-xs text-muted-foreground truncate" title={row.original.description}>
              {row.original.description}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "reportedBy",
        header: "Reported By",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="text-sm font-medium">{row.original.reportedBy.name}</span>
            <span className="text-xs text-muted-foreground">@{row.original.reportedBy.username}</span>
          </div>
        ),
      },
      {
        accessorKey: "reportedAt",
        header: "Date",
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {format(new Date(row.original.reportedAt), "MMM dd, yyyy")}
          </span>
        ),
      },
      {
        id: "actions",
        header: () => <div className="">Actions</div>,
        enableHiding: false,
        cell: ({ row }) => {
          const report = row.original;

          return (
            <div className="flex items-center gap-2">
              <Button
                className="bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold h-9 rounded-lg px-4"
                size="sm"
                onClick={() => onWarnLeader?.(report.id)}
              >
                <Shield className="h-4 w-4" />
                Warn Leader
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDismissReport?.(report.id)}
                className="border-gray-200 text-slate-900 font-bold h-9 rounded-lg bg-white hover:bg-slate-50 px-4"
              >
                Dismiss Report
              </Button>
            </div>
          );
        },
      },
    ],
    [onDismissReport, onWarnLeader]
  );
};
