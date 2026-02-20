"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { type MemberCardProps } from "./MemberCard.types";
import { ADMIN_GROUP_MEMBER_ROLE_LABELS, ADMIN_GROUP_MEMBER_STATUS_LABELS } from "@/resources/admin-group-management";

export const MemberCard: React.FC<MemberCardProps> = ({ member, onManage }) => {
  const { name, username, role, status, joinedAt, avatarUrl } = member;

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const getRoleStyle = () => {
    switch (role) {
      case "leader":
        return "bg-amber-100 text-amber-800";
      case "co_leader":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getStatusStyle = () => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800";
      case "banned":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col gap-4">
      {/* Header Info */}
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatarUrl || ""} alt={name} />
          <AvatarFallback className="bg-slate-100 text-slate-600 font-medium">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col flex-1 truncate">
          <span className="font-bold text-slate-900 truncate">{name}</span>
          <span className="text-sm text-slate-500 truncate">@{username}</span>
        </div>
      </div>

      {/* Meta Labels */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getRoleStyle()}`}>
            {ADMIN_GROUP_MEMBER_ROLE_LABELS[role]}
          </span>
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusStyle()}`}>
            {ADMIN_GROUP_MEMBER_STATUS_LABELS[status]}
          </span>
        </div>
        <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
          Joined {format(new Date(joinedAt), "MMM dd, yyyy")}
        </span>
      </div>

      {/* Actions */}
      <Button
        variant="outline"
        className="w-full bg-white text-slate-700 hover:bg-slate-50 border-slate-200 font-bold h-11 rounded-xl shadow-none"
        onClick={() => onManage(member)}
      >
        Manage
      </Button>
    </div>
  );
};
