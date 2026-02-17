"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { AdminUserListItem } from "@/resources/admin-user-management/admin-user-management.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { formatDateString } from "@/utils/formatting/formatting";
import { USER_STATUS_LABELS } from "@/resources/admin-user-management/admin-user-management.constants";

export const useUserDataTableColumns = (onView?: (item: AdminUserListItem) => void) => {
  const columns: ColumnDef<AdminUserListItem>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "User",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-center gap-3 min-w-0 max-w-[300px]">
              {item.avatarUrl ? (
                <Image
                  src={item.avatarUrl}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#E2E8F0] shrink-0"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#E2E8F0] flex items-center justify-center border-2 border-[#E2E8F0] shrink-0">
                  <span className="text-sm font-bold text-[#656A73]">{item.name.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-medium text-[#202020] truncate">{item.name}</span>
                <span className="text-xs text-[#656A73] truncate">@{item.username}</span>
                {item.email && <span className="text-xs text-[#656A73] truncate">{item.email}</span>}
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          const statusVariant = status === "active" ? "statusActive" : "statusSuspended";
          return (
            <Badge variant={statusVariant} size="sm">
              {USER_STATUS_LABELS[status]}
            </Badge>
          );
        },
      },
      {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => {
          const location = row.original.location;
          return location ? (
            <span className="text-sm font-medium text-[#202020]">{location}</span>
          ) : (
            <span className="text-xs text-[#94A3B8] font-medium">-</span>
          );
        },
      },
      {
        accessorKey: "joinedAt",
        header: "Joined At",
        cell: ({ row }) => <span className="text-xs text-[#656A73]">{formatDateString(row.getValue("joinedAt"))}</span>,
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-center gap-1">
              {onView && (
                <Button variant="actionAdd" size="xs" onClick={() => onView(item)} title="View User">
                  <Eye className="h-3 w-3" />
                </Button>
              )}
            </div>
          );
        },
      },
    ],
    [onView]
  );

  return columns;
};
