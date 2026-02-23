"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { ChatbotConversationSummary } from "@/resources/admin-chatbot/admin-chatbot.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { formatTimeAgo } from "@/utils/formatting/formatting";
import { CHATBOT_CONVERSATION_STATUS_LABELS } from "@/resources/admin-chatbot/admin-chatbot.constants";

export const useChatbotConversationDataTableColumns = (onView: (item: ChatbotConversationSummary) => void) => {
  const columns: ColumnDef<ChatbotConversationSummary>[] = useMemo(
    () => [
      {
        accessorKey: "userName",
        header: "User",
        cell: ({ row }) => {
          const item = row.original;
          const name = item.name || item.userName || "Unknown";
          const username = item.username || "Guest";

          return (
            <div className="flex items-center gap-3 min-w-0 max-w-[300px]">
              {item.avatarUrl ? (
                <Image
                  src={item.avatarUrl}
                  alt={name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#E2E8F0] shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#FF96C7] flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-white">{username.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-[#202020] truncate">{name}</span>
                <span className="text-xs text-[#656A73] truncate">@{username}</span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          const statusVariant = status === "RESOLVED" ? "statusActive" : "statusArchived";
          return (
            <>
              {status && (
                <Badge variant={statusVariant} size="sm">
                  {CHATBOT_CONVERSATION_STATUS_LABELS[status]}
                </Badge>
              )}
            </>
          );
        },
      },
      {
        accessorKey: "startedAt",
        header: "Started",
        cell: ({ row }) => <span className="text-xs text-[#656A73]">{formatTimeAgo(row.original.startedAt)}</span>,
      },
      {
        accessorKey: "messageCount",
        header: "Messages",
        cell: ({ row }) => <span className="text-sm font-medium text-[#202020]">{row.original.messageCount}</span>,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-center gap-1">
              <Button variant="actionAdd" size="xs" onClick={() => onView(item)} title="View Conversation">
                <Eye className="h-3 w-3" />
              </Button>
            </div>
          );
        },
      },
    ],
    [onView]
  );

  return columns;
};
