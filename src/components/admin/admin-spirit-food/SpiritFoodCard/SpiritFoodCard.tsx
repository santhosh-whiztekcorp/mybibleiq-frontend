"use client";

import * as React from "react";
import { Edit, Check, X, Trash2, Send } from "lucide-react";
import { formatDate, formatDateString, isToday } from "@/utils/formatting";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SPIRIT_FOOD_STATUS_LABELS } from "@/resources/admin-spirit-food";
import { useSpiritFoodCard } from "./SpiritFoodCard.hooks";
import type { SpiritFoodCardProps } from "./SpiritFoodCard.types";

export const SpiritFoodCard = React.memo(function SpiritFoodCard({
  item,
  onEdit,
  onSubmit,
  onApprove,
  onCancel,
  onRequestDelete,
  onApproveDelete,
  onCancelDelete,
  currentUserId,
}: SpiritFoodCardProps) {
  const { isMaker, isChecker, cardVariant, badgeVariant } = useSpiritFoodCard(item, currentUserId);

  return (
    <Card variant={cardVariant} className="h-full flex flex-col gap-3 py-6!">
      <div className="px-6 flex-1 flex flex-col gap-3">
        {/* Verse Reference */}
        <div>
          <h3 className="text-sm font-bold text-[#393737] leading-tight">{item.verseReference}</h3>
          {item.bibleVersion && <p className="text-xs font-semibold text-[#6B7280] mt-1">{item.bibleVersion}</p>}
        </div>

        {/* Info Container - Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={badgeVariant} size="sm">
            {SPIRIT_FOOD_STATUS_LABELS[item.status]}
          </Badge>
          {item.scheduledDate && isToday(item.scheduledDate) && (
            <Badge variant="statusToday" size="sm">
              Today&apos;s Entry
            </Badge>
          )}
          {item.makerUserName && (
            <Badge variant="tag" size="sm">
              Maker: {item.makerUserName}
            </Badge>
          )}
          {item.checkerUserName && (
            <Badge variant="tag" size="sm">
              Checker: {item.checkerUserName}
            </Badge>
          )}
        </div>

        {/* Reflection Text */}
        {item.reflectionText && (
          <p className="text-xs font-semibold text-[#6B7280] italic line-clamp-2">{item.reflectionText}</p>
        )}

        {/* Verse Text */}
        {item.concatenatedText && (
          <p className="text-xs font-semibold text-[#4E4E4E] italic line-clamp-3">
            &quot;{item.concatenatedText}&quot;
          </p>
        )}

        {/* Dates Container */}
        <div className="flex flex-col gap-1">
          {item.scheduledDate && (
            <p className="text-[10px] font-semibold text-[#B4B4B4]">
              Scheduled: {formatDate(new Date(item.scheduledDate), "DD/MM/YYYY – h:mm A")}
            </p>
          )}
          {item.deliveredAt && (
            <p className="text-[10px] font-semibold text-[#B4B4B4]">
              Delivered: {formatDate(new Date(item.deliveredAt), "DD/MM/YYYY – h:mm A")}
            </p>
          )}
          {item.createdAt && (
            <p className="text-[10px] font-semibold text-[#B4B4B4]">Created: {formatDateString(item.createdAt)}</p>
          )}
          {item.updatedAt && (
            <p className="text-[10px] font-semibold text-[#B4B4B4]">Updated: {formatDateString(item.updatedAt)}</p>
          )}
        </div>

        {/* Actions Row */}
        <div className="flex flex-wrap items-center gap-2 mt-auto pt-2">
          {/* Edit - InProgress only */}
          {item.status === "InProgress" && (
            <Button variant="actionEdit" size="xs" onClick={() => onEdit?.(item)} className="font-semibold">
              <Edit className="h-3 w-3" />
              Edit
            </Button>
          )}

          {/* Submit - InProgress AND isMaker */}
          {item.status === "InProgress" && isMaker && (
            <Button variant="actionPublish" size="xs" onClick={() => onSubmit?.(item)} className="font-semibold">
              <Send className="h-3 w-3" />
              Submit
            </Button>
          )}

          {/* Request Delete - InProgress AND isMaker */}
          {item.status === "InProgress" && isMaker && (
            <Button variant="actionDelete" size="xs" onClick={() => onRequestDelete?.(item)} className="font-semibold">
              <Trash2 className="h-3 w-3" />
              Request Delete
            </Button>
          )}

          {/* Approve - InReview AND isChecker */}
          {item.status === "InReview" && isChecker && (
            <Button variant="actionApprove" size="xs" onClick={() => onApprove?.(item)} className="font-semibold">
              <Check className="h-3 w-3" />
              Approve
            </Button>
          )}

          {/* Cancel Review - InReview AND isMaker */}
          {item.status === "InReview" && isMaker && (
            <Button variant="actionReject" size="xs" onClick={() => onCancel?.(item)} className="font-semibold">
              <X className="h-3 w-3" />
              Cancel Review
            </Button>
          )}

          {/* Approve Delete - PendingDelete AND isChecker */}
          {item.status === "PendingDelete" && isChecker && (
            <Button variant="actionApprove" size="xs" onClick={() => onApproveDelete?.(item)} className="font-semibold">
              <Check className="h-3 w-3" />
              Approve Delete
            </Button>
          )}

          {/* Cancel Delete - PendingDelete AND isChecker */}
          {item.status === "PendingDelete" && isChecker && (
            <Button variant="actionReject" size="xs" onClick={() => onCancelDelete?.(item)} className="font-semibold">
              <X className="h-3 w-3" />
              Cancel Delete
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
});
