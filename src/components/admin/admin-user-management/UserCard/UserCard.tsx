"use client";

import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatDateString } from "@/utils/formatting/formatting";
import type { UserCardProps } from "./UserCard.types";
import { useUserCard } from "./UserCard.hooks";
import { USER_STATUS_LABELS } from "@/resources/admin-user-management/admin-user-management.constants";

const UserCardComponent = (props: UserCardProps) => {
  const { item, onView } = props;
  useUserCard();

  const statusVariant = item.status === "active" ? "statusActive" : "statusSuspended";

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
            alt={item.name}
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover border border-[#E9EAEC]"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F3F4F6] border border-[#E9EAEC]">
            <span className="text-xl font-bold text-[#656A73]">
              {(item.name || item.username || "U").charAt(0).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Right: Info */}
      <div className="flex flex-1 flex-col justify-between self-stretch min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex flex-col min-w-0">
            <h3 className="text-[17px] font-bold text-[#1a1a1a] truncate leading-tight">{item.name}</h3>
            <p className="text-sm text-[#656A73] truncate">@{item.username}</p>
          </div>
          <Badge variant={statusVariant} size="sm" className="shrink-0">
            {USER_STATUS_LABELS[item.status]}
          </Badge>
        </div>

        <div className="flex justify-end mt-auto">
          <p className="text-[11px] font-medium text-[#656A73]">
            <span className="text-[#94A3B8]">Joined:</span> {formatDateString(item.joinedAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

UserCardComponent.displayName = "UserCard";

export const UserCard = React.memo(UserCardComponent);
