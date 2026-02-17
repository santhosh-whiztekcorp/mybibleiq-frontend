"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { AdminQuestSummary } from "@/resources/admin-quest/admin-quest.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Send, Archive, Copy, Calendar, List } from "lucide-react";
import { formatDateString } from "@/utils/formatting/formatting";
import { QUEST_STATUS_LABELS } from "@/resources/admin-quest/admin-quest.constants";

export const useQuestDataTableColumns = (
  onEdit?: (item: AdminQuestSummary) => void,
  onDelete?: (item: AdminQuestSummary) => void,
  onPublish?: (item: AdminQuestSummary) => void,
  onArchive?: (item: AdminQuestSummary) => void,
  onClone?: (item: AdminQuestSummary) => void,
  onSchedule?: (item: AdminQuestSummary) => void,
  onManageStages?: (item: AdminQuestSummary) => void
) => {
  const columns: ColumnDef<AdminQuestSummary>[] = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Quest Title",
        cell: ({ row }) => {
          return (
            <div className="flex flex-col min-w-0 max-w-[400px]">
              <span className="text-sm font-medium text-[#202020] truncate">{row.original.title}</span>
              <span className="text-xs text-[#656A73] truncate line-clamp-1">{row.original.description}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <Badge variant={`status${status}`} size="sm">
              {QUEST_STATUS_LABELS[status]}
            </Badge>
          );
        },
      },
      {
        accessorKey: "totalStages",
        header: "Stages",
        cell: ({ row }) => <span className="text-sm font-medium">{row.original.totalStages}</span>,
      },
      {
        accessorKey: "tags",
        header: "Tags",
        cell: ({ row }) => {
          const tags = row.original.tags || [];
          if (tags.length === 0) return <span className="text-xs text-[#94A3B8] font-medium">-</span>;
          return (
            <div className="flex flex-wrap gap-1 max-w-[200px]">
              {tags.slice(0, 2).map((tag, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="text-[10px] px-1.5 py-0 bg-[#F1F5F9] text-[#475569] border-[#E2E8F0] font-bold"
                >
                  {tag}
                </Badge>
              ))}
              {tags.length > 2 && <span className="text-[10px] text-[#94A3B8] font-bold">+{tags.length - 2}</span>}
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
              {onManageStages && (
                <Button variant="actionAdd" size="xs" onClick={() => onManageStages(item)} title="Manage Stages">
                  <List className="h-3 w-3" />
                </Button>
              )}
              {item.status === "Draft" && (
                <>
                  <Button variant="actionEdit" size="xs" onClick={() => onEdit?.(item)}>
                    <Pencil className="h-3 w-3" />
                  </Button>
                  {item.totalStages > 0 && (
                    <>
                      <Button variant="actionPublish" size="xs" onClick={() => onPublish?.(item)}>
                        <Send className="h-3 w-3" />
                      </Button>
                      <Button variant="actionSchedule" size="xs" onClick={() => onSchedule?.(item)}>
                        <Calendar className="h-3 w-3" />
                      </Button>
                    </>
                  )}
                  <Button variant="actionDelete" size="xs" onClick={() => onDelete?.(item)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </>
              )}
              {item.status === "Published" && (
                <>
                  <Button variant="actionArchive" size="xs" onClick={() => onArchive?.(item)}>
                    <Archive className="h-3 w-3" />
                  </Button>
                  <Button variant="actionClone" size="xs" onClick={() => onClone?.(item)}>
                    <Copy className="h-3 w-3" />
                  </Button>
                </>
              )}
              {item.status === "Archived" && (
                <Button variant="actionClone" size="xs" onClick={() => onClone?.(item)}>
                  <Copy className="h-3 w-3" />
                </Button>
              )}
            </div>
          );
        },
      },
    ],
    [onEdit, onDelete, onPublish, onArchive, onClone, onSchedule, onManageStages]
  );

  return columns;
};
