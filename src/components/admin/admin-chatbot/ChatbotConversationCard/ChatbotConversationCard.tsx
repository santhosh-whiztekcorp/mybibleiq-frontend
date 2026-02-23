"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatTimeAgo } from "@/utils/formatting/formatting";
import type { ChatbotConversationCardProps } from "./ChatbotConversationCard.types";
import { CHATBOT_CONVERSATION_STATUS_LABELS } from "@/resources/admin-chatbot/admin-chatbot.constants";

const ChatbotConversationCardComponent = ({ item, onView }: ChatbotConversationCardProps) => {
  const name = item.name || item.userName || "Unknown";
  const username = item.username || "Guest";
  const statusVariant = item.status === "RESOLVED" ? "statusActive" : "statusArchived";

  return (
    <div
      onClick={() => onView?.(item)}
      className="group relative flex items-center gap-4 rounded-2xl border border-[#E9EAEC] bg-white p-4 transition-all hover:border-[#D1D5DB] hover:bg-gray-50/50 cursor-pointer"
    >
      {/* Left: Avatar */}
      <div className="shrink-0">
        {item.avatarUrl ? (
          <Image
            src={item.avatarUrl}
            alt={name}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover border border-[#E9EAEC]"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FF96C7]">
            <span className="text-xl font-bold text-white">{username.charAt(0).toUpperCase()}</span>
          </div>
        )}
      </div>

      {/* Right: Info */}
      <div className="flex flex-1 flex-col justify-between self-stretch min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex flex-col min-w-0">
            <h3 className="text-[17px] font-bold text-[#1a1a1a] truncate leading-tight">{name}</h3>
            <p className="text-sm text-[#656A73] truncate">@{username}</p>
          </div>
          {item.status && (
            <Badge variant={statusVariant} size="sm" className="shrink-0">
              {CHATBOT_CONVERSATION_STATUS_LABELS[item.status]}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs font-medium text-[#202020]">{item.messageCount} messages</span>
          <p className="text-[11px] font-medium text-[#656A73]">
            <span className="text-[#94A3B8]">Started:</span> {formatTimeAgo(item.startedAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

ChatbotConversationCardComponent.displayName = "ChatbotConversationCard";

export const ChatbotConversationCard = React.memo(ChatbotConversationCardComponent);
