"use client";

import { useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { type AdminGroupActivityLogEntry } from "@/resources/admin-group-management";
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Book, Megaphone, Shield, Activity, UserMinus } from "lucide-react";
import {
  ADMIN_GROUP_MEMBER_ROLE_LABELS,
  ADMIN_GROUP_ACTIVITY_EVENT_TYPE_LABELS,
} from "@/resources/admin-group-management/admin-group-management.constants";
import { type AdminGroupMemberRole, type AdminGroupActivityEventType } from "@/resources/admin-group-management";

export const useActivityLogDataTableColumns = (): ColumnDef<AdminGroupActivityLogEntry>[] => {
  return useMemo(
    () => [
      {
        accessorKey: "actor",
        header: "User",
        cell: ({ row }) => {
          const actor = row.original.actor;
          const displayName = actor.name || "Unknown";
          const initials = displayName
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

          return (
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border border-[#E5E7EB]">
                <AvatarFallback className="bg-[#F3F3F3] text-[#8B8B8B] text-xs font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-bold text-sm text-[#111827]">{displayName}</span>
                <span className="text-xs text-[#6B7280]">@{actor.username}</span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
          const role = row.original.actor.role as AdminGroupMemberRole;
          return <span className="text-sm text-[#4B5563]">{ADMIN_GROUP_MEMBER_ROLE_LABELS[role] || role}</span>;
        },
      },
      {
        accessorKey: "type",
        header: "Event Type",
        cell: ({ row }) => {
          const type = row.original.type as AdminGroupActivityEventType;
          const title = row.original.metadata.title;
          let colorClass = "bg-gray-100 text-gray-800";
          let Icon = Activity;
          let iconColor = "#6B7280";

          switch (type) {
            case "member":
              if (title.toLowerCase().includes("removed") || title.toLowerCase().includes("ban")) {
                Icon = UserMinus;
                colorClass = "bg-red-100 text-red-800";
                iconColor = "#EF4444";
              } else {
                Icon = User;
                colorClass = "bg-blue-100 text-blue-800";
                iconColor = "#3B82F6";
              }
              break;
            case "assignment":
              Icon = Book;
              colorClass = "bg-green-100 text-green-800";
              iconColor = "#10B981";
              break;
            case "announcement":
              Icon = Megaphone;
              colorClass = "bg-purple-100 text-purple-800";
              iconColor = "#8B5CF6";
              break;
            case "report":
              Icon = Shield;
              colorClass = "bg-red-100 text-red-800";
              iconColor = "#EF4444";
              break;
          }

          return (
            <Badge variant="outline" className={`capitalize border-0 ${colorClass} gap-1.5 py-1`}>
              <Icon size={14} color={iconColor} strokeWidth={2.5} />
              {ADMIN_GROUP_ACTIVITY_EVENT_TYPE_LABELS[type] || type}
            </Badge>
          );
        },
      },
      {
        accessorKey: "metadata",
        header: "Activity Details",
        cell: ({ row }) => {
          const { title, description } = row.original.metadata;
          return (
            <div className="flex flex-col py-1 min-w-[300px]">
              <span className="font-semibold text-sm text-[#111827] whitespace-normal">{title}</span>
              <span className="text-xs text-[#6B7280] leading-relaxed mt-0.5 whitespace-normal">{description}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "timestamp",
        header: "Date & Time",
        cell: ({ row }) => {
          const timestamp = row.original.timestamp;
          if (!timestamp) return <span className="text-sm text-[#4B5563]">-</span>;

          return (
            <span className="text-sm font-medium text-[#111827]">
              {format(new Date(timestamp), "MMM dd, yyyy - hh:mm a")}
            </span>
          );
        },
      },
    ],
    []
  );
};
