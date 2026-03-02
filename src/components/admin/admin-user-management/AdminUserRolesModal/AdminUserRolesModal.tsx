"use client";

import React from "react";
import { Loader2, CheckCircle2, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAdminUserRolesModal } from "./AdminUserRolesModal.hooks";
import type { AdminUserRolesModalProps } from "./AdminUserRolesModal.types";

export function AdminUserRolesModal(props: AdminUserRolesModalProps) {
  const { open, onOpenChange, userName, isProcessing } = props;

  const {
    isRoleAssigned,
    handleToggle,
    searchValue,
    setSearchValue,
    allRoles,
    isLoading,
    isFetchingNextPage,
    handleLoadMore,
  } = useAdminUserRolesModal(props);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      handleLoadMore();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden gap-0 rounded-[20px] border-none shadow-2xl">
        <DialogHeader className="p-4 pb-0 flex-row justify-between items-start space-y-0">
          <div className="flex-1 space-y-1">
            <DialogTitle className="text-[18px] font-bold text-[#202020]">Manage Roles</DialogTitle>
            <DialogDescription className="text-[14px] text-[#6B7280]">
              Select roles for <span className="font-semibold text-[#202020]">{userName}</span>
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="px-4 pt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search roles..."
              className="pl-9 h-10 border-[#E4E4E4] bg-[#F9FAFB] rounded-[10px] focus-visible:ring-1 focus-visible:ring-[#0369A1]"
            />
          </div>
        </div>

        <div className="flex flex-col p-4 pt-3">
          {isLoading && allRoles.length === 0 ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-[#0369A1]" />
            </div>
          ) : (
            <div className="h-[300px] -mx-1 px-1 overflow-y-auto" onScroll={handleScroll}>
              <div className="space-y-3 pb-2">
                {allRoles.map((role) => {
                  const assigned = isRoleAssigned(role.id);
                  return (
                    <button
                      key={role.id}
                      type="button"
                      disabled={isProcessing}
                      onClick={() => handleToggle(role.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-[12px] border p-3 text-left transition-all",
                        assigned ? "border-[#0369A1] bg-[#E0F2FE]" : "border-[#E4E4E4] bg-[#F9FAFB]"
                      )}
                    >
                      <div className="flex-1 space-y-0.5">
                        <div className="flex items-center justify-between">
                          <p
                            className={cn("text-[14px] font-semibold", assigned ? "text-[#0369A1]" : "text-[#202020]")}
                          >
                            {role.name}
                          </p>
                        </div>
                        <p className="text-[10px] text-[#6B7280]">{role.description}</p>
                      </div>
                      {assigned && <CheckCircle2 className="h-4 w-4 text-[#0369A1] fill-none" />}
                    </button>
                  );
                })}
                {isFetchingNextPage && (
                  <div className="flex py-4 items-center justify-center">
                    <Loader2 className="h-5 w-5 animate-spin text-[#0369A1]" />
                  </div>
                )}
                {!isLoading && allRoles.length === 0 && (
                  <div className="flex h-40 flex-col items-center justify-center text-center">
                    <p className="text-sm text-[#6B7280]">No roles found</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
