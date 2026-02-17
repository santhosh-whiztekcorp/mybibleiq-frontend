"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { AdminQuestionSummary } from "@/resources/admin-question/admin-question.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Send, Archive, Copy } from "lucide-react";
import { formatDateString } from "@/utils/formatting/formatting";
import { QUESTION_TYPE_LABELS, QUESTION_STATUS_LABELS } from "@/resources/admin-question";
import { formatQuestionText } from "@/resources/admin-question/admin-question.utils";

export const useQuestionDataTableColumns = (
  onEdit?: (item: AdminQuestionSummary) => void,
  onDelete?: (item: AdminQuestionSummary) => void,
  onPublish?: (item: AdminQuestionSummary) => void,
  onArchive?: (item: AdminQuestionSummary) => void,
  onClone?: (item: AdminQuestionSummary) => void
) => {
  const columns: ColumnDef<AdminQuestionSummary>[] = useMemo(
    () => [
      {
        accessorKey: "questionText",
        header: "Question",
        cell: ({ row }) => {
          return (
            <div className="flex flex-col min-w-0 max-w-[400px]">
              <span className="text-sm text-[#1a1a1a] truncate">
                {formatQuestionText(row.original.questionText, row.original.type)}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
          const type = row.original.type;

          return (
            <Badge variant={`type${type}`} size="sm">
              {QUESTION_TYPE_LABELS[type]}
            </Badge>
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
              {QUESTION_STATUS_LABELS[status]}
            </Badge>
          );
        },
      },
      {
        accessorKey: "tags",
        header: "Tags",
        cell: ({ row }) => {
          const tags = row.original.tags || [];
          if (tags.length === 0) return <span className="text-xs text-[#B4B4B4]">-</span>;
          return (
            <div className="flex flex-wrap gap-1 max-w-[200px]">
              {tags.slice(0, 2).map((tag, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="text-[10px] px-1.5 py-0 bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]"
                >
                  {tag}
                </Badge>
              ))}
              {tags.length > 2 && <span className="text-[10px] text-[#B4B4B4]">+{tags.length - 2}</span>}
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
              {item.status === "Draft" && (
                <>
                  <Button variant="actionEdit" size="xs" onClick={() => onEdit?.(item)}>
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button variant="actionPublish" size="xs" onClick={() => onPublish?.(item)}>
                    <Send className="h-3 w-3" />
                  </Button>
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
    [onEdit, onDelete, onPublish, onArchive, onClone]
  );

  return columns;
};
