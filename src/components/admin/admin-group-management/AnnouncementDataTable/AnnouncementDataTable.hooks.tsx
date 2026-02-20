"use client";

import { useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Trash2, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { AdminGroupAnnouncement } from "@/resources/admin-group-management/admin-group-management.types";
import type { UseAnnouncementDataTableColumnsProps } from "./AnnouncementDataTable.types";

export const useAnnouncementDataTableColumns = ({
  onRejectAnnouncement,
  onViewReports,
}: UseAnnouncementDataTableColumnsProps): ColumnDef<AdminGroupAnnouncement>[] => {
  return useMemo(
    () => [
      {
        accessorKey: "content",
        header: "Content",
        cell: ({ row }) => (
          <div className="max-w-[300px] truncate" title={row.original.content}>
            {row.original.content}
          </div>
        ),
      },
      {
        accessorKey: "postedBy",
        header: "Posted By",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="font-medium text-slate-900">{row.original.postedBy.name}</span>
            <span className="text-xs text-slate-500">@{row.original.postedBy.username}</span>
          </div>
        ),
      },
      {
        accessorKey: "postedAt",
        header: "Date",
        cell: ({ row }) => (
          <span className="text-slate-500">{format(new Date(row.original.postedAt), "MMM dd, yyyy")}</span>
        ),
      },
      {
        accessorKey: "views",
        header: "Views",
        cell: ({ row }) => (
          <div className="flex items-center gap-1 text-slate-500">
            <Eye className="h-3 w-3" />
            <span>{row.original.views}</span>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          if (row.original.isFlagged) {
            return (
              <Badge variant="destructive" className="bg-red-50 text-red-600 hover:bg-red-50 border-red-100">
                Flagged
              </Badge>
            );
          }
          return (
            <Badge variant="outline" className="text-slate-500 font-normal">
              Active
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        enableHiding: false,
        cell: ({ row }) => {
          const announcement = row.original;

          return (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                className="bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900 border-blue-300 font-bold h-9 rounded-lg px-4 shadow-none"
                size="sm"
                onClick={() => onViewReports?.(announcement)}
              >
                <FileText className="h-4 w-4" />
                View Reports
              </Button>
              <Button
                className="bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold h-9 rounded-lg px-4 shadow-none"
                size="sm"
                onClick={() => onRejectAnnouncement?.(announcement.id)}
              >
                <Trash2 className="h-4 w-4" />
                Reject
              </Button>
            </div>
          );
        },
      },
    ],
    [onRejectAnnouncement, onViewReports]
  );
};
