"use client";

import React from "react";
import { ChevronDown, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CHATBOT_RESPONSE_CATEGORY_LABELS } from "@/resources/admin-chatbot";
import type { ChatbotResponseCategory } from "@/resources/admin-chatbot";
import type { ChatbotResponseCardProps } from "./ChatbotResponseCard.types";

const MAX_KEYWORDS_DISPLAY = 3;

const ChatbotResponseCardComponent = ({ item, onEdit, onDelete }: ChatbotResponseCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const displayKeywords = item.keywords.slice(0, MAX_KEYWORDS_DISPLAY);
  const remainingKeywordsCount = item.keywords.length - MAX_KEYWORDS_DISPLAY;

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-[16px] overflow-hidden">
      <button
        type="button"
        className="w-full flex items-start gap-3 p-4 text-left"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <div className="flex-1 min-w-0">
          <p className={cn("text-[14px] font-bold text-[#111827] leading-snug", !item.enabled && "text-[#9CA3AF]")}>
            {item.question}
          </p>
        </div>
        <div className={cn("shrink-0 transition-transform", isExpanded && "rotate-180")}>
          <ChevronDown className="h-4 w-4 text-[#6B7280]" />
        </div>
      </button>

      <div className="px-4 pb-3 -mt-2 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-[10px] px-2 py-0.5 bg-[#EEF2FF] border-transparent text-[#4F46E5]">
            {CHATBOT_RESPONSE_CATEGORY_LABELS[item.category as ChatbotResponseCategory]}
          </Badge>
          <Badge variant={item.enabled ? "statusPublished" : "statusArchived"} size="xs">
            {item.enabled ? "Enabled" : "Disabled"}
          </Badge>
        </div>

        {item.keywords.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5">
            {displayKeywords.map((keyword, index) => (
              <Badge
                key={`${item.id}-kw-${index}`}
                variant="outline"
                className="text-[10px] px-2 py-0.5 rounded-full bg-[#F3F4F6] border-transparent text-[#374151]"
              >
                {keyword}
              </Badge>
            ))}
            {remainingKeywordsCount > 0 && (
              <span className="text-[11px] font-semibold text-[#9CA3AF]">+{remainingKeywordsCount} more</span>
            )}
          </div>
        )}

        {isExpanded && (
          <div className="pt-2 space-y-3">
            <div
              className={cn(
                "text-[13px] font-medium text-[#374151] whitespace-pre-wrap",
                !item.enabled && "text-[#9CA3AF]"
              )}
            >
              {item.answer}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-[#F3F4F6]">
              <Button variant="actionEdit" size="sm" className="h-8 text-[11px]" onClick={() => onEdit?.(item)}>
                <Pencil className="h-3 w-3" />
                Edit
              </Button>
              <Button variant="actionDelete" size="sm" className="h-8 text-[11px]" onClick={() => onDelete?.(item)}>
                <Trash2 className="h-3 w-3" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

ChatbotResponseCardComponent.displayName = "ChatbotResponseCard";

export const ChatbotResponseCard = React.memo(ChatbotResponseCardComponent);
