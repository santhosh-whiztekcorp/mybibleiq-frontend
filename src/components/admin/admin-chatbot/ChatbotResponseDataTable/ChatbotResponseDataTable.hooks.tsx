"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { CHATBOT_RESPONSE_CATEGORY_LABELS } from "@/resources/admin-chatbot";
import type { ChatbotResponseCategory, ChatbotResponseDetail } from "@/resources/admin-chatbot";

export const useChatbotResponseDataTableColumns = (
  onEdit?: (item: ChatbotResponseDetail) => void,
  onDelete?: (item: ChatbotResponseDetail) => void
) => {
  const columns: ColumnDef<ChatbotResponseDetail>[] = useMemo(
    () => [
      {
        accessorKey: "question",
        header: "Question",
        cell: ({ row }) => (
          <div className="flex flex-col min-w-0 max-w-[420px]">
            <span className="text-sm text-[#1a1a1a] truncate">{row.original.question}</span>
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
          <Badge variant="outline" className="text-[10px] px-2 py-0.5 bg-[#EEF2FF] border-transparent text-[#4F46E5]">
            {CHATBOT_RESPONSE_CATEGORY_LABELS[row.original.category as ChatbotResponseCategory]}
          </Badge>
        ),
      },
      {
        accessorKey: "enabled",
        header: "Status",
        cell: ({ row }) => (
          <Badge variant={row.original.enabled ? "statusPublished" : "statusArchived"} size="xs">
            {row.original.enabled ? "Enabled" : "Disabled"}
          </Badge>
        ),
      },
      {
        accessorKey: "keywords",
        header: "Keywords",
        cell: ({ row }) => {
          const keywords = row.original.keywords || [];
          if (keywords.length === 0) return <span className="text-xs text-[#B4B4B4]">-</span>;
          return (
            <div className="flex flex-wrap gap-1 max-w-[240px]">
              {keywords.slice(0, 2).map((kw, i) => (
                <Badge
                  key={`${row.original.id}-kw-${i}`}
                  variant="outline"
                  className="text-[10px] px-1.5 py-0 bg-[#F3F4F6] text-[#374151] border-transparent"
                >
                  {kw}
                </Badge>
              ))}
              {keywords.length > 2 && <span className="text-[10px] text-[#B4B4B4]">+{keywords.length - 2}</span>}
            </div>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-center gap-1">
              <Button variant="actionEdit" size="xs" onClick={() => onEdit?.(item)}>
                <Pencil className="h-3 w-3" />
              </Button>
              <Button variant="actionDelete" size="xs" onClick={() => onDelete?.(item)}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          );
        },
      },
    ],
    [onEdit, onDelete]
  );

  return columns;
};
