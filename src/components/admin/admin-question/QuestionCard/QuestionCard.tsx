"use client";

import React from "react";
import { Pencil, Trash2, Send, Archive, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDateString } from "@/utils/formatting/formatting";
import { useQuestionCard } from "./QuestionCard.hooks";
import type { QuestionCardProps } from "./QuestionCard.types";
import { QUESTION_STATUS_LABELS } from "@/resources/admin-question";
import { formatQuestionText } from "@/resources/admin-question/admin-question.utils";

const QuestionCardComponent = (props: QuestionCardProps) => {
  const { onEdit, onDelete, onPublish, onArchive, onClone } = props;
  const { item, typeLabel, cardBgColor, cardBorderColor } = useQuestionCard(props);

  return (
    <div
      className={cn(
        "rounded-xl border overflow-hidden transition-all hover:shadow-md p-4 space-y-3 h-full flex flex-col",
        cardBgColor,
        cardBorderColor
      )}
    >
      {/* 1. Question Text (Prominent, Top) */}
      <div>
        <p className="text-sm font-bold text-[#1a1a1a] line-clamp-2 leading-snug">
          {formatQuestionText(item.questionText, item.type)}
        </p>
      </div>

      {/* 2. Info Badges (Type & Status) */}
      <div className="flex items-center gap-2">
        <Badge variant={`type${item.type}`} size="sm">
          {typeLabel}
        </Badge>
        <Badge variant={`status${item.status}`} size="sm">
          {QUESTION_STATUS_LABELS[item.status]}
        </Badge>
      </div>

      {/* 3. Tags */}
      {(item.tags || []).length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap">
          {(item.tags || []).slice(0, 3).map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-[9px] px-1.5 py-0 bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]"
            >
              {tag}
            </Badge>
          ))}
          {(item.tags || []).length > 3 && (
            <span className="text-[9px] text-[#B4B4B4] font-medium">+{(item.tags || []).length - 3} more</span>
          )}
        </div>
      )}

      {/* 4. Dates */}
      <div className="flex flex-col gap-1 text-[10px] text-[#94A3B8] font-medium pt-3 border-t border-[#F1F5F9] mt-auto">
        {item.createdAt && <span>Created: {formatDateString(item.createdAt)}</span>}
        {item.updatedAt && <span>Updated: {formatDateString(item.updatedAt)}</span>}
        {item.status === "Published" && item.publishedAt && (
          <span>Published: {formatDateString(item.publishedAt)}</span>
        )}
      </div>

      {/* 5. Actions */}
      <div className="flex -mx-4 -mb-4 px-4 py-2 mt-2 gap-2 border-t border-[#F1F5F9]">
        {item.status === "Draft" && (
          <>
            <Button
              variant="actionEdit"
              size="sm"
              className="flex-1 h-8 text-[10px] px-2"
              onClick={() => onEdit?.(item)}
            >
              <Pencil className="h-3 w-3" />
              Edit
            </Button>
            <Button
              variant="actionPublish"
              size="sm"
              className="flex-1 h-8 text-[10px] px-2"
              onClick={() => onPublish?.(item)}
            >
              <Send className="h-3 w-3" />
              Publish
            </Button>
            <Button
              variant="actionDelete"
              size="sm"
              className="flex-1 h-8 text-[10px] px-2"
              onClick={() => onDelete?.(item)}
            >
              <Trash2 className="h-3 w-3" />
              Delete
            </Button>
          </>
        )}
        {item.status === "Published" && (
          <>
            <Button
              variant="actionArchive"
              size="sm"
              className="flex-1 h-8 text-[10px]"
              onClick={() => onArchive?.(item)}
            >
              <Archive className="h-3 w-3" />
              Archive
            </Button>
            <Button variant="actionClone" size="sm" className="flex-1 h-8 text-[10px]" onClick={() => onClone?.(item)}>
              <Copy className="h-3 w-3" />
              Clone
            </Button>
          </>
        )}
        {item.status === "Archived" && (
          <Button variant="actionClone" size="sm" className="flex-1 h-8 text-[10px]" onClick={() => onClone?.(item)}>
            <Copy className="h-3 w-3" />
            Clone
          </Button>
        )}
      </div>
    </div>
  );
};

QuestionCardComponent.displayName = "QuestionCard";

// Memoized version for performance optimization in large lists
export const QuestionCard = React.memo(QuestionCardComponent);
