"use client";

import { Plus, List, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/assets";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAdminViewStore } from "@/store/useAdminViewStore";
import { cn } from "@/lib/utils";
import {
  BadgeStats,
  BadgeDataTable,
  BadgeCardList,
  BadgeForm,
  BadgeDeleteModal,
  BadgeStatusActionModal,
} from "@/components/admin/admin-badge";
import { useBadgeManagerPage } from "./BadgeManagerPage.hooks";
import {
  BADGE_STATUS_OPTIONS,
  BADGE_STATUS_LABELS,
  BADGE_RARITY_OPTIONS,
  BADGE_RARITY_LABELS,
  BADGE_CATEGORY_OPTIONS,
  BADGE_CATEGORY_LABELS,
} from "@/resources/admin-badge/admin-badge.constants";
import type { AdminBadgeStatus, BadgeRarity, BadgeCategory } from "@/resources/admin-badge";

export function BadgeManagerPage() {
  const {
    badges,
    totalBadges,
    isLoading,
    stats,
    isStatsLoading,
    filters,

    isCreateModalOpen,
    setIsCreateModalOpen,
    handleCreate,
    handleEdit,

    editingBadge,
    setEditingBadge,

    deletingBadge,
    setDeletingBadge,

    actionBadge,
    setActionBadge,

    handleDelete,
    handlePublish,
    handleArchive,
    handleClone,

    handleSearch,
    handlePaginationChange,
  } = useBadgeManagerPage();

  const { viewMode, setViewMode } = useAdminViewStore();

  return (
    <div className="w-full space-y-4 pt-2">
      {/* Header Actions */}
      <div className="flex items-end justify-between gap-4">
        <h2 className="hidden md:block text-lg font-bold truncate">Badge Management</h2>
        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
          <Button variant="actionAdd" onClick={handleCreate} className="font-semibold flex-1 md:flex-none">
            <Plus className="mr-2 h-4 w-4" />
            Create Badge
          </Button>
        </div>
      </div>

      {/* Stats and Filters Section */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Stats Section */}
        <div className="w-full md:w-80 shrink-0">
          <BadgeStats stats={stats} isLoading={isStatsLoading} />
        </div>

        {/* Filters Section */}
        <div className="flex-1 flex flex-wrap items-end gap-2 bg-white p-2 rounded-lg border border-[#E2E8F0]">
          {/* Search Bar */}
          <div className="w-full space-y-1.5 order-first mb-2">
            <label className="text-xs font-bold text-[#656A73] uppercase text-nowrap">Search</label>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#656A73] pointer-events-none" />
              <Input
                variant="adminSearchBar"
                placeholder="Search by badge name..."
                value={filters.q || ""}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 h-11"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex-1 min-w-[140px] space-y-1.5">
            <label className="text-xs font-bold text-[#656A73] uppercase">Status</label>
            <Select
              value={filters.status || "all"}
              onValueChange={(value) =>
                filters.setFilters({ status: value === "all" ? undefined : (value as AdminBadgeStatus) })
              }
            >
              <SelectTrigger variant="adminFilter">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {BADGE_STATUS_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {BADGE_STATUS_LABELS[opt as keyof typeof BADGE_STATUS_LABELS]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[140px] space-y-1.5">
            <label className="text-xs font-bold text-[#656A73] uppercase">Rarity</label>
            <Select
              value={filters.rarity || "all"}
              onValueChange={(value) =>
                filters.setFilters({ rarity: value === "all" ? undefined : (value as BadgeRarity) })
              }
            >
              <SelectTrigger variant="adminFilter">
                <SelectValue placeholder="All Rarity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rarity</SelectItem>
                {BADGE_RARITY_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {BADGE_RARITY_LABELS[opt as keyof typeof BADGE_RARITY_LABELS]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[140px] space-y-1.5">
            <label className="text-xs font-bold text-[#656A73] uppercase">Category</label>
            <Select
              value={filters.category || "all"}
              onValueChange={(value) =>
                filters.setFilters({ category: value === "all" ? undefined : (value as BadgeCategory) })
              }
            >
              <SelectTrigger variant="adminFilter">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {BADGE_CATEGORY_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {BADGE_CATEGORY_LABELS[opt as keyof typeof BADGE_CATEGORY_LABELS]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              filters.resetFilters();
            }}
            className="h-11 px-4 border-[#E2E8F0] text-xs font-bold uppercase text-[#656A73] rounded-lg hidden md:flex"
            title="Clear Filters"
          >
            Clear
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden space-y-6">
        {/* Content Section */}
        <div className="fex flex-col">
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
            <div className="text-sm font-semibold text-muted-foreground">Total Badges: {totalBadges}</div>
          </div>

          {/* Mobile View: Cards (Always) */}
          <div className="block md:hidden">
            <BadgeCardList
              items={badges}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onPublish={handlePublish}
              onArchive={handleArchive}
              onClone={handleClone}
            />
          </div>

          {/* Desktop View: Table or Cards based on viewMode */}
          <div className="hidden md:block">
            {viewMode === "table" ? (
              <BadgeDataTable
                items={badges}
                isLoading={isLoading}
                total={totalBadges}
                pagination={{
                  pageIndex: filters.page - 1,
                  pageSize: filters.pageSize,
                }}
                onPaginationChange={handlePaginationChange}
                searchValue={filters.q || ""}
                onSearchChange={handleSearch}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPublish={handlePublish}
                onArchive={handleArchive}
                onClone={handleClone}
              />
            ) : (
              <BadgeCardList
                items={badges}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPublish={handlePublish}
                onArchive={handleArchive}
                onClone={handleClone}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {(isCreateModalOpen || editingBadge) && (
        <BadgeForm
          mode={editingBadge ? "edit" : "create"}
          badge={editingBadge}
          onClose={() => {
            setIsCreateModalOpen(false);
            setEditingBadge(undefined);
          }}
        />
      )}

      <BadgeDeleteModal
        isOpen={!!deletingBadge}
        onClose={() => setDeletingBadge(undefined)}
        badgeId={deletingBadge?.id}
        badgeName={deletingBadge?.name}
      />

      <BadgeStatusActionModal
        isOpen={!!actionBadge}
        onClose={() => setActionBadge(null)}
        badgeId={actionBadge?.id}
        badgeName={actionBadge?.name}
        action={actionBadge?.action || null}
      />
    </div>
  );
}
