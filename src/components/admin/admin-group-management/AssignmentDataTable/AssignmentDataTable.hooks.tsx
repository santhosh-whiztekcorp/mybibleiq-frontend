"use client";

import { useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  ADMIN_GROUP_ASSIGNMENT_STATUS_LABELS,
  ADMIN_GROUP_ASSIGNMENT_STATUS_VARIANTS,
} from "@/resources/admin-group-management/admin-group-management.constants";
import type { AdminGroupAssignment } from "@/resources/admin-group-management/admin-group-management.types";

export const useAssignmentDataTableColumns = (): ColumnDef<AdminGroupAssignment>[] => {
  return useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Assignment Title",
        cell: ({ row }) => <span className="font-semibold text-sm">{row.original.title}</span>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const statusKey = row.original.status || "not_started";
          const statusLabel = ADMIN_GROUP_ASSIGNMENT_STATUS_LABELS[statusKey] || statusKey;
          const statusVariant = (ADMIN_GROUP_ASSIGNMENT_STATUS_VARIANTS[statusKey] || "tag") as
            | "tag"
            | "statusInProgress"
            | "statusPublished";

          return (
            <Badge variant={statusVariant} size="xs">
              {statusLabel}
            </Badge>
          );
        },
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
          const isQuiz = row.original.type === "Quiz";
          return (
            <Badge
              variant={isQuiz ? "typeQuestion" : "typeONE_WORD"}
              size="xs"
              className={isQuiz ? "" : "bg-[#EFF6FF] border-[#5BB2F0] text-[#5BB2F0]"}
            >
              {row.original.type === "Quiz" ? "Quiz" : "Quest"}
            </Badge>
          );
        },
      },
      {
        accessorKey: "dueDate",
        header: "Due Date",
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {format(new Date(row.original.dueDate), "MMM dd, yyyy")}
          </span>
        ),
      },
      {
        id: "progress",
        header: "Progress",
        cell: ({ row }) => {
          const { completed, total, percentage } = row.original.progress;
          return (
            <div className="flex flex-col">
              <span className="text-sm font-medium">{percentage}%</span>
              <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                {completed} of {total} {total === 1 ? "Member" : "Members"}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "avgScore",
        header: "IQ",
        cell: ({ row }) => {
          const score = row.original.avgScore;
          if (score === null) return <span className="text-muted-foreground">-</span>;
          return <span className="font-bold text-[#289C2C]">{score}</span>;
        },
      },
    ],
    []
  );
};
