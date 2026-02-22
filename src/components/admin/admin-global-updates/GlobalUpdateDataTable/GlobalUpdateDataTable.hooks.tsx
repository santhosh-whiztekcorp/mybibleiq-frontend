"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Send, Pencil, Trash2 } from "lucide-react";
import { formatDateString } from "@/utils/formatting/formatting";
import {
  GLOBAL_UPDATE_TYPE_LABELS,
  GLOBAL_UPDATE_STATUS_LABELS,
  GLOBAL_UPDATE_TYPE_ICONS,
  GLOBAL_UPDATE_TYPE_ICON_COLORS,
  GLOBAL_UPDATE_TARGET_TYPE_LABELS,
} from "@/resources/admin-global-updates";
import type { GlobalUpdateSummary } from "@/resources/admin-global-updates";

export const useGlobalUpdateDataTableColumns = (
  onView?: (id: string) => void,
  onEdit?: (id: string) => void,
  onDeliver?: (id: string, name?: string) => void,
  onDelete?: (id: string, name?: string) => void
) => {
  const columns: ColumnDef<GlobalUpdateSummary>[] = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
          return (
            <div className="flex flex-col min-w-0 max-w-[300px]">
              <span className="text-sm font-medium text-[#111827] truncate">{row.original.title}</span>
              <span className="text-xs text-[#4B5563] truncate line-clamp-2">{row.original.message}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
          const type = row.original.type;
          const TypeIcon = GLOBAL_UPDATE_TYPE_ICONS[type];
          return (
            <div className="flex items-center gap-1.5">
              <TypeIcon width={14} height={14} style={{ color: GLOBAL_UPDATE_TYPE_ICON_COLORS[type] }} />
              <span className="text-xs text-[#374151]">{GLOBAL_UPDATE_TYPE_LABELS[type]}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          const getStatusColor = (status: string) => {
            switch (status) {
              case "Draft":
                return "bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]";
              case "Scheduled":
                return "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]";
              case "Delivered":
                return "bg-[#ECFDF5] text-[#065F46] border-[#6EE7B7]";
              default:
                return "bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]";
            }
          };
          return (
            <Badge className={getStatusColor(status)} variant="outline">
              {GLOBAL_UPDATE_STATUS_LABELS[status]}
            </Badge>
          );
        },
      },
      {
        accessorKey: "targetType",
        header: "Target",
        cell: ({ row }) => {
          const targetType = row.original.targetType;
          return (
            <span className="text-xs text-[#374151] font-medium">
              {GLOBAL_UPDATE_TARGET_TYPE_LABELS[targetType] || targetType}
            </span>
          );
        },
      },
      {
        accessorKey: "readCount",
        header: "Read Count",
        cell: ({ row }) => {
          const count = row.original.readCount ?? 0;
          return (
            <div className="flex items-center gap-1">
              <Eye width={14} height={14} className="text-[#6B7280]" />
              <span className="text-xs text-[#374151]">{count}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => (
          <span className="text-xs text-[#656A73]">{formatDateString(row.getValue("createdAt"))}</span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-center gap-1">
              <Button variant="actionEdit" size="xs" onClick={() => onView?.(item.id)}>
                <Eye className="h-3 w-3" />
              </Button>

              {(item.status === "Draft" || item.status === "Scheduled") && onDeliver && (
                <Button variant="actionPublish" size="xs" onClick={() => onDeliver(item.id, item.title)}>
                  <Send className="h-3 w-3" />
                </Button>
              )}

              {(item.status === "Draft" || item.status === "Scheduled") && onEdit && (
                <Button variant="actionEdit" size="xs" onClick={() => onEdit(item.id)}>
                  <Pencil className="h-3 w-3" />
                </Button>
              )}

              {(item.status === "Draft" || item.status === "Scheduled") && onDelete && (
                <Button variant="actionDelete" size="xs" onClick={() => onDelete(item.id, item.title)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          );
        },
      },
    ],
    [onView, onEdit, onDeliver, onDelete]
  );

  return columns;
};
