"use client";

import React from "react";
import { Pencil, Trash2, Send, Archive, Copy, Calendar, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { formatDateString } from "@/utils/formatting/formatting";
import type { QuestCardProps } from "./QuestCard.types";
import { useQuestCard } from "./QuestCard.hooks";
import { QUEST_STATUS_LABELS } from "@/resources/admin-quest/admin-quest.constants";

const QuestCardComponent = (props: QuestCardProps) => {
  const { item, onEdit, onDelete, onPublish, onArchive, onClone, onSchedule, onManageStages } = props;
  const { cardBgColor, cardBorderColor } = useQuestCard(item);

  return (
    <div
      className={cn(
        "rounded-xl border overflow-hidden transition-all hover:shadow-md p-4 space-y-3",
        cardBgColor,
        cardBorderColor
      )}
    >
      {/* 1. Title & Description */}
      <div>
        <p className="text-sm font-bold text-[#1a1a1a] line-clamp-1 leading-snug">{item.title}</p>
        <p className="text-xs text-[#656A73] line-clamp-2 mt-1">{item.description}</p>
      </div>

      {/* 2. Info Badges */}
      <div className="flex items-center gap-2">
        <Badge variant={`status${item.status}`} size="sm">
          {QUEST_STATUS_LABELS[item.status]}
        </Badge>
        <Badge variant="question" size="sm">
          {item.totalStages} Stages
        </Badge>
      </div>

      {/* 3. Tags */}
      {(item.tags || []).length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap">
          {(item.tags || []).slice(0, 3).map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-[9px] px-2 py-0.5 bg-[#F1F5F9] text-[#475569] border-[#E2E8F0] font-bold"
            >
              {tag}
            </Badge>
          ))}
          {(item.tags || []).length > 3 && (
            <span className="text-[10px] text-[#B4B4B4] font-bold ml-0.5">+{(item.tags || []).length - 3}</span>
          )}
        </div>
      )}

      {/* 4. Dates */}
      <div className="flex flex-col gap-1 text-[10px] text-[#94A3B8] font-medium pt-3 border-t border-[#F1F5F9]">
        {item.createdAt && <span>Created: {formatDateString(item.createdAt)}</span>}
        {item.status === "Published" && item.publishedAt && (
          <span>Published: {formatDateString(item.publishedAt)}</span>
        )}
        {item.status === "Draft" && item.publishAt && (
          <span className="text-blue-500 flex items-center gap-1">
            <Calendar className="h-2 w-2" /> Scheduled: {formatDateString(item.publishAt)}
          </span>
        )}
      </div>

      {/* 5. Actions */}
      <div className="flex -mx-4 -mb-4 px-4 py-2 mt-2 gap-2 border-t border-[#F1F5F9] flex-wrap ">
        {onManageStages && (
          <Button variant="actionAdd" size="sm" onClick={() => onManageStages(item)}>
            <List className="size-3" />
            <span className="text-xs">Stages</span>
          </Button>
        )}
        {item.status === "Draft" && (
          <>
            <Button variant="actionEdit" size="sm" onClick={() => onEdit?.(item)}>
              <Pencil className="h-3 w-3" />
              <span className="text-xs">Edit</span>
            </Button>
            {item.totalStages > 0 && (
              <>
                <Button variant="actionPublish" size="sm" onClick={() => onPublish?.(item)}>
                  <Send className="h-3 w-3" />
                  <span className="text-xs">Publish</span>
                </Button>
                <Button variant="actionSchedule" size="sm" onClick={() => onSchedule?.(item)}>
                  <Calendar className="h-3 w-3" />
                  <span className="text-xs">Schedule</span>
                </Button>
              </>
            )}
            <Button variant="actionDelete" size="sm" onClick={() => onDelete?.(item)}>
              <Trash2 className="h-3 w-3" />
              <span className="text-xs">Delete</span>
            </Button>
          </>
        )}
        {item.status === "Published" && (
          <>
            <Button variant="actionArchive" size="sm" onClick={() => onArchive?.(item)}>
              <Archive className="h-3 w-3" />
              <span className="text-xs">Archive</span>
            </Button>
            <Button
              variant="actionClone"
              size="sm"
              className="flex-1 min-w-0 h-8 text-[10px]"
              onClick={() => onClone?.(item)}
            >
              <Copy className="h-3 w-3" />
              <span className="text-xs">Clone</span>
            </Button>
          </>
        )}
        {item.status === "Archived" && (
          <Button variant="actionClone" size="sm" onClick={() => onClone?.(item)}>
            <Copy className="h-3 w-3" />
            <span className="text-xs">Clone</span>
          </Button>
        )}
      </div>
    </div>
  );
};

QuestCardComponent.displayName = "QuestCard";

export const QuestCard = React.memo(QuestCardComponent);
