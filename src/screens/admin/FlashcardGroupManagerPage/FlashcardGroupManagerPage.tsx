"use client";

import { Plus, List, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/assets";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAdminViewStore } from "@/store/useAdminViewStore";
import { cn } from "@/lib/utils";
import {
  FlashcardGroupDataTable,
  FlashcardGroupForm,
  FlashcardGroupDeleteModal,
  FlashcardGroupStats,
  FlashcardGroupCardList,
  FlashcardGroupStatusActionModal,
} from "@/components/admin/admin-flashcard-group";
import { useFlashcardGroupManagerPage } from "./FlashcardGroupManagerPage.hooks";

export function FlashcardGroupManagerPage() {
  const {
    groups,
    total,
    stats,
    filterStore,
    isLoading,
    isFormOpen,
    editingGroup,
    isDeletingGroup,
    statusActionGroup,
    statusAction,
    isActionLoading,
    handleSearchChange,
    handleStatusFilterChange,
    handlePaginationChange,
    handleSortChange,
    sortOptions,
    handleCreate,
    handleEdit,
    handleDelete,
    handlePublish,
    handleArchive,
    handleClone,
    handleConfirmStatusAction,
    setStatusActionGroup,
    setStatusAction,
    setIsDeletingGroup,
    handleConfirmDelete,
    handleFormSuccess,
    setIsFormOpen,
  } = useFlashcardGroupManagerPage();

  const { viewMode, setViewMode } = useAdminViewStore();

  return (
    <div className="space-y-4 pt-2">
      {/* Header Actions */}
      <div className="flex items-end justify-between gap-4">
        <h2 className="hidden md:block text-lg font-bold truncate">Flashcard Groups</h2>
        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
          <Button variant="actionAdd" onClick={handleCreate} className="font-semibold w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Create Group
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Stats Section */}
        <div className="w-full md:w-72">
          <FlashcardGroupStats stats={stats} isLoading={isLoading} />
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
                placeholder="Search by name or description..."
                value={filterStore.q ?? ""}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 h-11"
              />
            </div>
          </div>

          <div className="flex-1 min-w-[200px] space-y-1.5">
            <label className="text-xs font-bold text-[#656A73] uppercase">Status</label>
            <Select
              value={filterStore.status ?? "all"}
              onValueChange={(value) =>
                handleStatusFilterChange(value === "all" ? undefined : (value as "Draft" | "Published" | "Archived"))
              }
            >
              <SelectTrigger variant="adminFilter">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[200px] space-y-1.5">
            <label className="text-xs font-bold text-[#656A73] uppercase">Sort By</label>
            <Select value={filterStore.sort} onValueChange={(value) => handleSortChange(value)}>
              <SelectTrigger variant="adminFilter">
                <SelectValue placeholder="Newest First" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              handleStatusFilterChange(undefined);
              handleSearchChange("");
              handleSortChange("-createdAt");
            }}
            className="h-11 px-4 border-[#E2E8F0] text-xs font-bold uppercase text-[#656A73] rounded-lg hidden md:flex"
          >
            Clear Filters
          </Button>
        </div>
      </div>
      {/* List Section */}

      {/* List Section */}

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
        <div className="text-sm font-semibold text-muted-foreground">Total Groups: {total}</div>
      </div>

      {/* Mobile View: Cards (Always) */}
      <div className="block md:hidden">
        <FlashcardGroupCardList
          items={groups}
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
          <FlashcardGroupDataTable
            items={groups}
            isLoading={isLoading}
            total={total}
            pagination={{
              pageIndex: filterStore.page - 1,
              pageSize: filterStore.pageSize,
            }}
            onPaginationChange={handlePaginationChange}
            searchValue={filterStore.q ?? ""}
            onSearchChange={handleSearchChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPublish={handlePublish}
            onArchive={handleArchive}
            onClone={handleClone}
          />
        ) : (
          <FlashcardGroupCardList
            items={groups}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPublish={handlePublish}
            onArchive={handleArchive}
            onClone={handleClone}
          />
        )}
      </div>

      {/* Form Drawer */}
      {isFormOpen && (
        <FlashcardGroupForm
          mode={editingGroup ? "edit" : "create"}
          group={editingGroup ?? undefined}
          onClose={() => setIsFormOpen(false)}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Delete Confirmation */}
      <FlashcardGroupDeleteModal
        open={Boolean(isDeletingGroup)}
        onOpenChange={(open) => !open && setIsDeletingGroup(null)}
        item={isDeletingGroup}
        onConfirm={handleConfirmDelete}
        isLoading={isActionLoading}
      />

      {/* Status Action Confirmation */}
      <FlashcardGroupStatusActionModal
        open={Boolean(statusActionGroup && statusAction)}
        onOpenChange={(open) => {
          if (!open) {
            setStatusActionGroup(null);
            setStatusAction(null);
          }
        }}
        item={statusActionGroup}
        action={statusAction}
        onConfirm={handleConfirmStatusAction}
        isLoading={isActionLoading}
      />
    </div>
  );
}
