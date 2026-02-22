"use client";

import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { SearchIcon } from "@/assets";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useGlobalUpdatesManagerPage } from "./GlobalUpdatesManagerPage.hooks";
import {
  GLOBAL_UPDATE_TYPE_OPTIONS,
  GLOBAL_UPDATE_TYPE_LABELS,
  GLOBAL_UPDATE_STATUS_OPTIONS,
  GLOBAL_UPDATE_STATUS_LABELS,
} from "@/resources/admin-global-updates";
import type { GlobalUpdateType, GlobalUpdateStatus } from "@/resources/admin-global-updates";
import { Plus, List, LayoutGrid, GlobeIcon } from "lucide-react";
import { useAdminViewStore } from "@/store/useAdminViewStore";
import { cn } from "@/lib/utils";
import {
  GlobalUpdateStats,
  GlobalUpdateCardList,
  GlobalUpdateDataTable,
  GlobalUpdateForm,
  GlobalUpdatePreviewModal,
} from "@/components/admin/admin-global-updates";
import { AdminConfirmationModal } from "@/components/admin/admin-shared";

export function GlobalUpdatesManagerPage() {
  const {
    globalUpdates,
    total,
    stats,
    isLoading,
    isStatsLoading,
    hasNextPage,
    isFetchingNextPage,
    filterStore,
    handleSearchChange,
    handleTypeFilterChange,
    handleStatusFilterChange,
    handlePaginationChange,
    handleLoadMore,
    handleViewUpdate,
    handleEditUpdate,
    handleDeleteUpdate,
    handleDeliverUpdate,
    handleCreateUpdate,
    isFormOpen,
    setIsFormOpen,
    isEdit,
    selectedId,
    isPreviewOpen,
    selectedUpdate,
    setIsPreviewOpen,
    confirmModal,
    setConfirmModal,
    isDeleteLoading,
    isDeliverLoading,
    handleConfirmAction,
  } = useGlobalUpdatesManagerPage();

  const { viewMode, setViewMode } = useAdminViewStore();

  return (
    <div className="w-full space-y-4 md:space-y-6">
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <GlobeIcon width={20} height={20} className="text-black" />
            <h1 className="text-xl font-bold text-black">Global Updates</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="actionAdd" onClick={handleCreateUpdate} className="font-semibold">
            <Plus className="h-4 w-4" />
            Create Update
          </Button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden space-y-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <GlobeIcon width={18} height={18} className="text-black" />
          <h1 className="text-lg font-bold text-black">Global Updates</h1>
        </div>
        {/* Mobile Actions Container */}
        <div className="flex items-center gap-2">
          <Button variant="actionAdd" onClick={handleCreateUpdate} className="flex-1 font-semibold">
            <Plus className="h-4 w-4" />
            Create Update
          </Button>
        </div>
      </div>

      {/* Stats and Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 h-full md:items-stretch">
        <div className="w-full md:w-[350px] shrink-0">
          <GlobalUpdateStats stats={stats} isLoading={isStatsLoading} />
        </div>

        {/* Filters Section */}
        <div className="flex-1 flex flex-wrap items-end gap-2 bg-white p-2 rounded-lg border border-[#E2E8F0]">
          <div className="w-full space-y-1.5 order-first mb-2">
            <label className="text-xs font-bold text-[#656A73] uppercase text-nowrap">Search</label>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#656A73] pointer-events-none" />
              <Input
                variant="adminSearchBar"
                placeholder="Search by title or message..."
                value={filterStore.search ?? ""}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 h-11"
              />
            </div>
          </div>

          <div className="flex-1 min-w-[200px] space-y-1.5">
            <label className="text-xs font-bold text-[#656A73] uppercase">Type</label>
            <Select
              value={filterStore.type ?? "all"}
              onValueChange={(value) =>
                handleTypeFilterChange(value === "all" ? undefined : (value as GlobalUpdateType))
              }
            >
              <SelectTrigger variant="adminFilter">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {GLOBAL_UPDATE_TYPE_OPTIONS.map((type) => (
                  <SelectItem key={type} value={type}>
                    {GLOBAL_UPDATE_TYPE_LABELS[type]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[200px] space-y-1.5">
            <label className="text-xs font-bold text-[#656A73] uppercase">Status</label>
            <Select
              value={filterStore.status ?? "all"}
              onValueChange={(value) =>
                handleStatusFilterChange(value === "all" ? undefined : (value as GlobalUpdateStatus))
              }
            >
              <SelectTrigger variant="adminFilter">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {GLOBAL_UPDATE_STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {GLOBAL_UPDATE_STATUS_LABELS[status]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              handleTypeFilterChange(undefined);
              handleStatusFilterChange(undefined);
              handleSearchChange("");
            }}
            className="h-11 px-4 border-[#E2E8F0] text-xs font-bold uppercase text-[#656A73] rounded-lg hidden md:flex"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      <div className="space-y-4">
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
          <div className="text-sm font-semibold text-muted-foreground">Total Updates: {total}</div>
        </div>

        {/* Desktop View: Table */}
        {viewMode === "table" && (
          <div className="hidden md:block">
            <GlobalUpdateDataTable
              items={globalUpdates}
              isLoading={isLoading}
              total={total}
              pagination={{
                pageIndex: (filterStore.page || 1) - 1,
                pageSize: filterStore.pageSize || 10,
              }}
              onPaginationChange={handlePaginationChange}
              onView={handleViewUpdate}
              onEdit={handleEditUpdate}
              onDeliver={handleDeliverUpdate}
              onDelete={handleDeleteUpdate}
            />
          </div>
        )}

        {/* Card View */}
        {viewMode === "card" && (
          <div className="hidden md:block">
            <GlobalUpdateCardList
              items={globalUpdates}
              isLoading={isLoading}
              onView={handleViewUpdate}
              onEdit={handleEditUpdate}
              onDeliver={handleDeliverUpdate}
              onDelete={handleDeleteUpdate}
              onLoadMore={handleLoadMore}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </div>
        )}

        {/* Mobile View: Card List (Always) */}
        <div className="md:hidden">
          <GlobalUpdateCardList
            items={globalUpdates}
            isLoading={isLoading}
            onView={handleViewUpdate}
            onEdit={handleEditUpdate}
            onDeliver={handleDeliverUpdate}
            onDelete={handleDeleteUpdate}
            onLoadMore={handleLoadMore}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
      </div>

      <GlobalUpdateForm isOpen={isFormOpen} onOpenChange={setIsFormOpen} isEdit={isEdit} id={selectedId} />

      <GlobalUpdatePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        updateData={selectedUpdate}
      />

      <AdminConfirmationModal
        open={confirmModal.isOpen}
        onOpenChange={(open) => setConfirmModal((prev) => ({ ...prev, isOpen: open }))}
        action={confirmModal.action}
        entityName={confirmModal.name || "Update"}
        onConfirm={handleConfirmAction}
        isLoading={isDeleteLoading || isDeliverLoading}
      />
    </div>
  );
}
