"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Eye, Send, Pencil, Trash2 } from "lucide-react";
import {
  GLOBAL_UPDATE_TYPE_LABELS,
  GLOBAL_UPDATE_STATUS_LABELS,
  GLOBAL_UPDATE_TYPE_ICONS,
  GLOBAL_UPDATE_TYPE_ICON_COLORS,
  GLOBAL_UPDATE_TARGET_TYPE_LABELS,
} from "@/resources/admin-global-updates";
import { GlobalUpdatePreview } from "../GlobalUpdatePreview/GlobalUpdatePreview";
import type { GlobalUpdateCardProps } from "./GlobalUpdateCard.types";

export const GlobalUpdateCard = (props: GlobalUpdateCardProps) => {
  const { item, onEdit, onDeliver, onDelete } = props;
  const [showPreview, setShowPreview] = React.useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Draft":
        return "bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]";
      case "Scheduled":
        return "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]";
      case "Delivered":
        return "bg-[#ECFDF5] text-[#065F46] border-[#6EE7B7]";
      default:
        return "bg-[#F3F4F6] text-[#374151] border-[#E5E7EB]";
    }
  };

  const TypeIcon = GLOBAL_UPDATE_TYPE_ICONS[item.type];

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white overflow-hidden transition-all hover:shadow-md p-4 flex flex-col h-full space-y-3">
      {/* 1. Header & Description */}
      <div>
        <div className="flex flex-row justify-between items-center mb-1">
          <p className="text-sm font-bold text-[#111827] line-clamp-1 leading-snug flex-1 mr-2">{item.title}</p>
          <Badge className={getStatusColor(item.status)} variant="outline">
            {GLOBAL_UPDATE_STATUS_LABELS[item.status]}
          </Badge>
        </div>
        <p className="text-xs text-[#4B5563] line-clamp-2">{item.message}</p>
      </div>

      {/* 2. Meta Info */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-[#6B7280]">Type:</span>
          <TypeIcon width={16} height={16} style={{ color: GLOBAL_UPDATE_TYPE_ICON_COLORS[item.type] }} />
          <span className="text-xs text-[#374151]">{GLOBAL_UPDATE_TYPE_LABELS[item.type]}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-[#6B7280]">Target:</span>
          <span className="text-xs text-[#374151]">
            {GLOBAL_UPDATE_TARGET_TYPE_LABELS?.[item.targetType] || item.targetType}
          </span>
        </div>
        {item.readCount !== undefined && (
          <div className="flex items-center gap-1.5">
            <Eye width={16} height={16} className="text-[#6B7280]" />
            <span className="text-xs font-semibold text-[#6B7280]">Read:</span>
            <span className="text-xs text-[#374151]">{item.readCount}</span>
          </div>
        )}
      </div>

      {/* 3. Dates */}
      <div className="flex flex-col gap-1 text-[10px] text-[#94A3B8] font-medium pt-3 border-t border-[#F1F5F9]">
        {item.scheduledAt && <span>Scheduled: {format(new Date(item.scheduledAt), "MMM d, yyyy h:mm a")}</span>}
        {item.createdAt && <span>Created: {format(new Date(item.createdAt), "MMM d, yyyy h:mm a")}</span>}
        {item.updatedAt ? (
          <span>Updated: {format(new Date(item.updatedAt), "MMM d, yyyy h:mm a")}</span>
        ) : item.deliveredAt ? (
          <span>Delivered: {format(new Date(item.deliveredAt), "MMM d, yyyy h:mm a")}</span>
        ) : null}
      </div>

      {/* 4. Actions */}
      <div className="flex flex-wrap -mx-4 px-4 py-2 mt-auto gap-2 border-t border-[#F1F5F9] bg-white">
        <Button
          variant="actionEdit"
          size="sm"
          onClick={() => setShowPreview(!showPreview)}
          className="w-fit h-8 text-[10px] px-3 font-bold"
        >
          <Eye className="h-3 w-3 mr-1" />
          {showPreview ? "Hide Preview" : "Show Preview"}
        </Button>

        {(item.status === "Draft" || item.status === "Scheduled") && onDeliver && (
          <Button
            variant="actionPublish"
            size="sm"
            onClick={() => onDeliver(item.id, item.title)}
            className="w-fit h-8 text-[10px] px-3 font-bold"
          >
            <Send className="h-3 w-3 mr-1" />
            Deliver
          </Button>
        )}

        {(item.status === "Draft" || item.status === "Scheduled") && onEdit && (
          <Button
            variant="actionEdit"
            size="sm"
            onClick={() => onEdit(item.id)}
            className="w-fit h-8 text-[10px] px-3 font-bold"
          >
            <Pencil className="h-3 w-3 mr-1" />
            Edit
          </Button>
        )}

        {(item.status === "Draft" || item.status === "Scheduled") && onDelete && (
          <Button
            variant="actionDelete"
            size="sm"
            onClick={() => onDelete(item.id, item.title)}
            className="w-fit h-8 text-[10px] px-3 font-bold"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        )}
      </div>

      {/* 5. Inline Preview */}
      {showPreview && (
        <div className="pt-2 animate-in fade-in zoom-in-95 duration-200">
          <GlobalUpdatePreview
            title={item.title}
            message={item.message}
            deliveredAt={item.scheduledAt || item.createdAt}
            isRead={false}
          />
        </div>
      )}
    </div>
  );
};

GlobalUpdateCard.displayName = "GlobalUpdateCard";

export default React.memo(GlobalUpdateCard);
