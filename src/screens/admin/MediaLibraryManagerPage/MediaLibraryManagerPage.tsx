"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/assets";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  MediaStats,
  MediaDataTable,
  MediaCardList,
  MediaForm,
  MediaDeleteModal,
  MediaStatusActionModal,
  MediaPreviewModal,
} from "@/components/admin/admin-media";
import { useMediaLibraryManagerPage } from "./MediaLibraryManagerPage.hooks";

export function MediaLibraryManagerPage() {
  const {
    media,
    total,
    stats,
    filterStore,
    isLoading,
    isFormOpen,
    editingMedia,
    isDeletingMedia,
    statusActionMedia,
    statusAction,
    previewMedia,
    isActionLoading,
    handleSearchChange,
    handleStatusFilterChange,
    handleTypeFilterChange,
    handlePaginationChange,
    handleSortChange,
    handleDataTableSortChange,
    sortOptions,
    handleCreate,
    handleEdit,
    handleDelete,
    handlePublish,
    handleArchive,
    handleClone,
    handleConfirmStatusAction,
    setStatusActionMedia,
    setStatusAction,
    setIsDeletingMedia,
    handleConfirmDelete,
    handleFormSuccess,
    setIsFormOpen,
    handlePreview,
    setPreviewMedia,
    isEditingMediaLoading,
  } = useMediaLibraryManagerPage();

  return (
    <div className="w-full space-y-4 pt-2">
      {/* Header Actions */}
      <div className="flex items-end justify-between gap-4">
        <h2 className="hidden md:block text-lg font-bold truncate">Media Library</h2>
        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
          <Button variant="actionAdd" onClick={handleCreate} className="font-semibold w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Upload Media
          </Button>
        </div>
      </div>

      {/* Stats and Filters Section */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Stats Section */}
        <div className="w-full md:w-72">
          <MediaStats stats={stats} isLoading={isLoading} />
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
                placeholder="Search media by title..."
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
              onValueChange={(value) => handleStatusFilterChange(value === "all" ? undefined : value)}
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
            <label className="text-xs font-bold text-[#656A73] uppercase">Type</label>
            <Select
              value={filterStore.type ?? "all"}
              onValueChange={(value) => handleTypeFilterChange(value === "all" ? undefined : value)}
            >
              <SelectTrigger variant="adminFilter">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="IMAGE">Image</SelectItem>
                <SelectItem value="AUDIO">Audio</SelectItem>
                <SelectItem value="VIDEO">Video</SelectItem>
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
              handleTypeFilterChange(undefined);
              handleSortChange("-createdAt");
            }}
            className="h-11 px-4 border-[#E2E8F0] text-xs font-bold uppercase text-[#656A73] rounded-lg hidden md:flex"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Media Content */}
      <div className="space-y-4">
        {/* Desktop View: Data Table */}
        <div className="hidden md:block">
          <MediaDataTable
            items={media}
            isLoading={isLoading}
            total={total}
            pagination={{
              pageIndex: (filterStore.page || 1) - 1,
              pageSize: filterStore.pageSize || 10,
            }}
            onPaginationChange={handlePaginationChange}
            sorting={
              filterStore.sort
                ? [
                    {
                      id: filterStore.sort.replace("-", ""),
                      desc: filterStore.sort.startsWith("-"),
                    },
                  ]
                : []
            }
            onSortingChange={handleDataTableSortChange}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPublish={handlePublish}
            onArchive={handleArchive}
            onClone={handleClone}
            onPreview={handlePreview}
          />
        </div>

        {/* Mobile View: Card List */}
        <div className="md:hidden">
          <MediaCardList
            items={media}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPublish={handlePublish}
            onArchive={handleArchive}
            onClone={handleClone}
            onPreview={handlePreview}
          />
        </div>
      </div>

      {/* Modals & Forms */}
      {isFormOpen && !isEditingMediaLoading && (
        <MediaForm
          item={editingMedia}
          onSuccess={handleFormSuccess}
          onClose={() => {
            setIsFormOpen(false);
          }}
        />
      )}

      <MediaDeleteModal
        open={!!isDeletingMedia}
        onOpenChange={(open: boolean) => !open && setIsDeletingMedia(null)}
        item={isDeletingMedia}
        onConfirm={handleConfirmDelete}
        isLoading={isActionLoading}
      />

      <MediaStatusActionModal
        open={!!statusActionMedia && !!statusAction}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setStatusActionMedia(null);
            setStatusAction(null);
          }
        }}
        item={statusActionMedia}
        action={statusAction}
        onConfirm={handleConfirmStatusAction}
        isLoading={isActionLoading}
      />

      <MediaPreviewModal
        open={!!previewMedia}
        onOpenChange={(open: boolean) => !open && setPreviewMedia(null)}
        item={previewMedia}
      />
    </div>
  );
}
