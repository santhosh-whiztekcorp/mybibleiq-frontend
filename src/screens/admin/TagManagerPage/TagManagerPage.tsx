"use client";

import { Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/assets";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TagDataTable, TagForm, TagStats, TagDeleteModal, TagCardList } from "@/components/admin/admin-tag";
import { useTagManagerPage } from "./TagManagerPage.hooks";

export function TagManagerPage() {
  const {
    tags,
    total,
    stats,
    categories,
    isLoading,
    isFormOpen,
    editingTag,
    isDeletingTag,
    isActionLoading,
    isExporting,
    filterStore,
    handleSearchChange,
    handleFilterChange,
    handlePaginationChange,
    handleSortChange,
    sortOptions,
    handleCreate,
    handleEdit,
    handleDelete,
    setIsDeletingTag,
    handleConfirmDelete,
    handleExport,
    handleFormSuccess,
    setIsFormOpen,
  } = useTagManagerPage();

  return (
    <div className="w-full space-y-4 pt-2">
      {/* Header Actions */}
      <div className="flex items-end justify-between gap-4">
        <h2 className="hidden md:block text-lg font-bold truncate">Tag Management</h2>
        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
          <Button variant="actionAdd" onClick={handleCreate} className="font-semibold flex-1 md:flex-none">
            <Plus className="mr-2 h-4 w-4" />
            Create Tag
          </Button>
          <Button
            variant="actionView"
            onClick={handleExport}
            disabled={isExporting}
            className="font-semibold flex-1 md:flex-none"
          >
            <Download className="mr-2 h-4 w-4" />
            {isExporting ? "Exporting..." : "Export"}
          </Button>
        </div>
      </div>

      {/* Stats and Filters Section */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Stats Section */}
        <div className="w-full md:w-80">
          <TagStats stats={stats} isLoading={isLoading} />
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
                placeholder="Search by tag name or category..."
                value={filterStore.q ?? ""}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 h-11"
              />
            </div>
          </div>

          <div className="flex-1 min-w-[200px] space-y-1.5">
            <label className="text-xs font-bold text-[#656A73] uppercase">Category</label>
            <Select
              value={filterStore.categoryId ?? "all"}
              onValueChange={(value) => handleFilterChange(value === "all" ? undefined : value)}
            >
              <SelectTrigger variant="adminFilter">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[200px] space-y-1.5">
            <label className="text-xs font-bold text-[#656A73] uppercase">Sort By</label>
            <Select value={filterStore.sort} onValueChange={(value) => handleSortChange(value)}>
              <SelectTrigger variant="adminFilter">
                <SelectValue placeholder="Most Popular" />
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
              handleFilterChange(undefined);
              handleSortChange("-usageCount");
            }}
            className="h-11 px-4 border-[#E2E8F0] text-xs font-bold uppercase text-[#656A73] rounded-lg hidden md:flex"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {/* Tags List Section - Responsive */}
      {/* Tags List Section - Responsive */}

      {/* Mobile View: Cards */}
      <div className="block md:hidden">
        <TagCardList items={tags} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      {/* Desktop View: Table */}
      <div className="hidden md:block bg-white rounded-lg border border-[#E2E8F0] overflow-hidden">
        <TagDataTable
          items={tags}
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
        />
      </div>

      {/* Form Drawer */}
      {isFormOpen && (
        <TagForm
          mode={editingTag ? "edit" : "create"}
          tag={editingTag ?? undefined}
          onClose={() => setIsFormOpen(false)}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Delete Confirmation */}
      <TagDeleteModal
        open={Boolean(isDeletingTag)}
        onOpenChange={(open) => !open && setIsDeletingTag(null)}
        item={isDeletingTag}
        onConfirm={handleConfirmDelete}
        isLoading={isActionLoading}
      />
    </div>
  );
}
