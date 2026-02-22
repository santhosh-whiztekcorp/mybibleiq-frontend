"use client";

import React, { useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import mailClosed from "@/assets/icons/png/mail-closed.png";
import mailOpened from "@/assets/icons/png/mail-opened.png";

import { GlobalUpdatePreviewProps } from "./GlobalUpdatePreview.types";

export const GlobalUpdatePreview: React.FC<GlobalUpdatePreviewProps> = ({
  title,
  message,
  deliveredAt,
  isRead = false,
  onDismiss,
  className,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={cn(
        "flex flex-row items-start p-4 bg-white rounded-[12px] gap-3 cursor-pointer select-none border border-[#E5E7EB]",
        className
      )}
    >
      {/* Icon Section */}
      <div className="flex items-center justify-center w-10 h-10 shrink-0">
        <Image
          src={isRead ? mailOpened : mailClosed}
          alt="Mail Icon"
          width={40}
          height={40}
          className="w-10 h-10 object-contain"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex flex-row justify-between items-start">
          <div className="flex flex-row items-center gap-2 flex-1 min-w-0">
            {!isRead && <div className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] shrink-0" />}
            <h4 className="text-[14px] font-fredoka font-bold text-[#111827] truncate">{title}</h4>
          </div>

          {onDismiss && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDismiss();
              }}
              className="p-1 -mr-1 text-[#9CA3AF] hover:text-[#EF4444] transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Message (Expandable) */}
        {isExpanded && message && (
          <p className="mt-1 text-[13px] font-fredoka text-[#4B5563] leading-snug whitespace-pre-wrap">{message}</p>
        )}

        {/* Date (Always at bottom) */}
        <span className="mt-1.5 text-[11px] font-fredoka font-medium text-[#9CA3AF]">
          {formatDistanceToNow(new Date(deliveredAt), { addSuffix: true })}
        </span>
      </div>
    </div>
  );
};
