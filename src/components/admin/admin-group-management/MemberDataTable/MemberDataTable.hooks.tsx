import { useMemo } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { AdminGroupMember } from "@/resources/admin-group-management";
import { ADMIN_GROUP_MEMBER_ROLE_LABELS, ADMIN_GROUP_MEMBER_STATUS_LABELS } from "@/resources/admin-group-management";

export const useMemberDataTableColumns = (
  onManage: (member: AdminGroupMember) => void
): ColumnDef<AdminGroupMember>[] => {
  return useMemo(
    () => [
      {
        id: "member",
        accessorKey: "name",
        header: "Member",
        cell: ({ row }) => {
          const { name, username, avatarUrl } = row.original;
          const initials = name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

          return (
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-[#E5E7EB]">
                <AvatarImage src={avatarUrl || ""} alt={name} />
                <AvatarFallback className="bg-[#F3F3F3] text-[#8B8B8B] font-medium">{initials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium text-slate-900">{name}</span>
                <span className="text-xs text-slate-500">@{username}</span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
          const role = row.original.role;
          const label = ADMIN_GROUP_MEMBER_ROLE_LABELS[role];

          let style = "bg-slate-100 text-slate-700";
          if (role === "leader") style = "bg-amber-100 text-amber-800";
          if (role === "co_leader") style = "bg-indigo-100 text-indigo-800";

          return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${style}`}>{label}</span>;
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          const label = ADMIN_GROUP_MEMBER_STATUS_LABELS[status];

          let style = "bg-slate-100 text-slate-700";
          if (status === "active") style = "bg-emerald-100 text-emerald-800";
          if (status === "banned") style = "bg-red-100 text-red-800";

          return <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${style}`}>{label}</span>;
        },
      },
      {
        accessorKey: "joinedAt",
        header: "Joined Date",
        cell: ({ row }) => (
          <span className="text-slate-500">{format(new Date(row.original.joinedAt), "MMM dd, yyyy")}</span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        enableHiding: false,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="bg-white text-slate-700 hover:bg-slate-50 border-slate-200 font-medium h-9 rounded-lg px-4 shadow-none"
              size="sm"
              onClick={() => onManage(row.original)}
            >
              Manage
            </Button>
          </div>
        ),
      },
    ],
    [onManage]
  );
};
