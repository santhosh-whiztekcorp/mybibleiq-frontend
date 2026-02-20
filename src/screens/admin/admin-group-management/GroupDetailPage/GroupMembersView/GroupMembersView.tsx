"use client";

import React from "react";
import { Loader2, Users, Search, List, LayoutGrid } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGroupMembersView } from "./GroupMembersView.hooks";
import { MemberDataTable } from "@/components/admin/admin-group-management/MemberDataTable/MemberDataTable";
import { MemberCard } from "@/components/admin/admin-group-management/MemberCard/MemberCard";
import { MemberDetailSheet } from "@/components/admin/admin-group-management/MemberDetailSheet/MemberDetailSheet";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useAdminViewStore } from "@/store/useAdminViewStore";
import { cn } from "@/lib/utils";

export function GroupMembersView() {
  const {
    members,
    isLoading,
    totalMembers,
    searchQuery,
    handleSearchChange,
    selectedMember,
    isDetailSheetOpen,
    setIsDetailSheetOpen,
    triggerManageMember,
    triggerBanMember,
    triggerRemoveMember,
    triggerChangeRole,
    isActionLoading,
    isFetchingNextPage,
    hasNextPage,
    handleLoadMore,
    pagination,
    handlePaginationChange,
  } = useGroupMembersView();

  const { viewMode, setViewMode } = useAdminViewStore();

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      handleLoadMore();
    }
  }, [inView, hasNextPage, isFetchingNextPage, handleLoadMore]);

  if (isLoading && members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <Loader2 className="h-8 w-8 text-blue-500 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Loading members...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Search Header */}
      <div className="relative w-full max-w-[400px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <Input
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search members by name or username..."
          className="pl-10 h-11"
          variant="adminPrimary"
        />
      </div>

      {members.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-1">No members found</h3>
          <p className="text-slate-500 max-w-sm">
            Try adjusting your search or filters to find what you&apos;re looking for.
          </p>
        </div>
      ) : (
        <>
          {/* View Switcher (Desktop only) */}
          <div className="hidden md:flex items-center gap-3 mb-2">
            <div className="inline-flex p-1 bg-[#F1F5F9] rounded-lg">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("table")}
                className={cn(
                  "h-8 px-3 text-[10px] font-bold uppercase transition-all",
                  viewMode === "table"
                    ? "bg-white text-primary shadow-sm"
                    : "border-transparent text-[#656A73] hover:text-primary"
                )}
              >
                <List className="h-3.5 w-3.5 mr-1.5" />
                Table
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode("card")}
                className={cn(
                  "h-8 px-3 text-[10px] font-bold uppercase transition-all",
                  viewMode === "card"
                    ? "bg-white text-primary shadow-sm"
                    : "border-transparent text-[#656A73] hover:text-primary"
                )}
              >
                <LayoutGrid className="h-3.5 w-3.5 mr-1.5" />
                Cards
              </Button>
            </div>
            <div className="text-sm font-semibold text-muted-foreground">Total Members: {totalMembers}</div>
          </div>

          {/* Desktop View */}
          <div className="hidden md:block bg-white rounded-xl">
            {viewMode === "table" ? (
              <MemberDataTable
                data={members}
                isLoading={isLoading}
                total={totalMembers}
                pagination={pagination}
                onPaginationChange={handlePaginationChange}
                onManage={triggerManageMember}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {members.map((member) => (
                  <MemberCard key={member.id} member={member} onManage={triggerManageMember} />
                ))}
              </div>
            )}
          </div>

          {/* Mobile View (Always Cards) */}
          <div className="md:hidden flex flex-col gap-4">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} onManage={triggerManageMember} />
            ))}

            {hasNextPage && (
              <div ref={loadMoreRef} className="flex flex-col items-center justify-center pt-4 pb-2">
                {isFetchingNextPage ? (
                  <Loader2 className="h-6 w-6 text-slate-400 animate-spin" />
                ) : (
                  <span className="text-xs text-slate-400">Scroll for more...</span>
                )}
              </div>
            )}
          </div>
        </>
      )}

      <MemberDetailSheet
        member={selectedMember}
        isOpen={isDetailSheetOpen}
        onOpenChange={setIsDetailSheetOpen}
        onBan={triggerBanMember}
        onRemove={triggerRemoveMember}
        onChangeRole={triggerChangeRole}
        isActionLoading={isActionLoading}
      />
    </div>
  );
}
