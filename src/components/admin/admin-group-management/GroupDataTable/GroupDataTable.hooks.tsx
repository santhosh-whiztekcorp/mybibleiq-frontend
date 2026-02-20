"use client";

import { useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Users, AlertTriangle } from "lucide-react";
import { formatDate } from "@/utils/formatting";
import type { AdminGroupListItem } from "@/resources/admin-group-management/admin-group-management.types";

import {
  ADMIN_GROUP_TYPE_LABELS,
  ADMIN_GROUP_TYPE_TO_BADGE_VARIANT,
  ADMIN_GROUP_STATUS_VARIANTS,
  ADMIN_GROUP_STATUS_LABELS,
  ADMIN_GROUP_ICON_SET,
} from "@/resources/admin-group-management/admin-group-management.constants";

export const useGroupDataTableColumns = (onView: (id: string) => void): ColumnDef<AdminGroupListItem>[] => {
  return useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Group Name",
        cell: ({ row }) => {
          const item = row.original;
          const firstLetter = item.name.charAt(0).toUpperCase();
          const icon = (() => {
            if (!item.iconPath) return null;
            if (item.iconPath.startsWith("http")) return item.iconPath;
            return ADMIN_GROUP_ICON_SET[item.iconPath] || null;
          })();

          return (
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 overflow-hidden relative">
                {icon ? (
                  <Image src={icon} alt={item.name} fill className="object-cover" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-[#F3F3F3] border border-[#E5E7EB] text-[#8B8B8B] rounded-full">
                    <span className="text-xs font-bold uppercase">{firstLetter}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm line-clamp-1">{item.name}</span>
                <span className="text-xs text-muted-foreground line-clamp-1">{item.description}</span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "leader",
        header: "Leader",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="text-sm font-medium">{row.original.leader.name}</span>
            <span className="text-xs text-muted-foreground">@{row.original.leader.username}</span>
          </div>
        ),
      },
      {
        accessorKey: "memberCount",
        header: "Members",
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{row.original.memberCount}</span>
          </div>
        ),
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
          const type = row.original.type;
          return (
            <Badge variant={(ADMIN_GROUP_TYPE_TO_BADGE_VARIANT[type] as "secondary") || "outline"}>
              {ADMIN_GROUP_TYPE_LABELS[type] || type}
            </Badge>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <Badge variant={(ADMIN_GROUP_STATUS_VARIANTS[status] as "secondary") || "outline"} className="capitalize">
              {ADMIN_GROUP_STATUS_LABELS[status] || status}
            </Badge>
          );
        },
      },
      {
        accessorKey: "reportsCount",
        header: "Reports",
        cell: ({ row }) => {
          if (row.original.reportsCount > 0) {
            return (
              <Badge variant="destructive" className="gap-1">
                <AlertTriangle className="h-3 w-3" />
                {row.original.reportsCount}
              </Badge>
            );
          }
          return <span className="text-muted-foreground">-</span>;
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => (
          <span className="text-xs text-muted-foreground">{formatDate(new Date(row.original.createdAt))}</span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-1">
              <Button variant="actionAdd" size="xs" onClick={() => onView(row.original.id)} title="View Group">
                <Eye className="h-3 w-3" />
              </Button>
            </div>
          );
        },
      },
    ],
    [onView]
  );
};
