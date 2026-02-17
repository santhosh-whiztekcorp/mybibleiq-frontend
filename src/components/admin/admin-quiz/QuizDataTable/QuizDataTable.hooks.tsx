"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { AdminQuizSummary } from "@/resources/admin-quiz/admin-quiz.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Send, Archive, Copy, Calendar } from "lucide-react";
import { formatDateString } from "@/utils/formatting/formatting";
import { QUIZ_STATUS_LABELS, QUIZ_DIFFICULTY_LABELS } from "@/resources/admin-quiz/admin-quiz.constants";

export const useQuizDataTableColumns = (
  onEdit?: (item: AdminQuizSummary) => void,
  onDelete?: (item: AdminQuizSummary) => void,
  onPublish?: (item: AdminQuizSummary) => void,
  onArchive?: (item: AdminQuizSummary) => void,
  onClone?: (item: AdminQuizSummary) => void,
  onSchedule?: (item: AdminQuizSummary) => void
) => {
  const columns: ColumnDef<AdminQuizSummary>[] = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Quiz Title",
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
        accessorKey: "difficulty",
        header: "Difficulty",
        cell: ({ row }) => {
          const difficulty = row.original.difficulty;
          return (
            <Badge variant={`difficulty${difficulty}`} size="sm">
              {QUIZ_DIFFICULTY_LABELS[difficulty]}
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
              {QUIZ_STATUS_LABELS[status]}
            </Badge>
          );
        },
      },
      {
        accessorKey: "totalQuestions",
        header: "Questions",
        cell: ({ row }) => <span className="text-sm font-medium">{row.original.totalQuestions}</span>,
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
              {item.status === "Draft" && (
                <>
                  <Button variant="actionEdit" size="xs" onClick={() => onEdit?.(item)}>
                    <Pencil className="h-3 w-3" />
                  </Button>
                  <Button variant="actionPublish" size="xs" onClick={() => onPublish?.(item)}>
                    <Send className="h-3 w-3" />
                  </Button>
                  <Button variant="actionSchedule" size="xs" onClick={() => onSchedule?.(item)}>
                    <Calendar className="h-3 w-3" />
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
    [onEdit, onDelete, onPublish, onArchive, onClone, onSchedule]
  );

  return columns;
};
