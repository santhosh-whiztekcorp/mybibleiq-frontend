"use client";

import { Plus, Upload, List, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { TaskListIcon, SearchIcon } from "@/assets";
import { useAdminViewStore } from "@/store/useAdminViewStore";
import { cn } from "@/lib/utils";
import { SpiritFoodCardList } from "@/components/admin/admin-spirit-food/SpiritFoodCardList";
import { SpiritFoodDataTable } from "@/components/admin/admin-spirit-food/SpiritFoodDataTable";
import { SpiritFoodForm } from "@/components/admin/admin-spirit-food/SpiritFoodForm";
import { SpiritFoodReviewModal } from "@/components/admin/admin-spirit-food/SpiritFoodReviewModal";
import { useSpiritFoodManagerPage } from "./SpiritFoodManagerPage.hooks";
import { FILTER_OPTIONS } from "./SpiritFoodManagerPage.types";
import { SpiritFoodBulkUploadModal } from "@/components/admin/admin-spirit-food";

export function SpiritFoodManagerPage() {
  const {
    filterStore,
    currentUserId,
    isFormOpen,
    reviewingItem,
    reviewAction,
    isReviewLoading,
    editingItem,
    isListLoading,
    isFetchingNextPage,
    hasNextPage,
    allLoadedItems,
    spiritFoodEntries,
    total,
    pagination,
    isBulkUploadOpen,
    handlePaginationChange,
    handleSearchChange,
    handleFilterChange,
    handleFormSuccess,
    handleEdit,
    handleSubmit,
    handleApprove,
    handleCancel,
    handleRequestDelete,
    handleApproveDelete,
    handleCancelDelete,
    handleCreate,
    handleCloseForm,
    handleBulkUpload,
    handleBulkUploadSuccess,
    handleBulkUploadClose,
    handleConfirmReview,
    handleCloseReviewModal,
    fetchNextPage,
  } = useSpiritFoodManagerPage();

  const { viewMode, setViewMode } = useAdminViewStore();

  return (
    <div className="w-full space-y-4 md:space-y-6">
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <TaskListIcon width={20} height={20} className="text-black" />
            <h1 className="text-xl font-bold">Spirit Food Manager</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="actionAdd" onClick={handleCreate} className="font-semibold">
            <Plus className="h-4 w-4" />
            Add New Entry
          </Button>
          <Button variant="actionUpload" onClick={handleBulkUpload}>
            <Upload className="h-4 w-4" />
            Bulk Upload
          </Button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden space-y-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <TaskListIcon width={18} height={18} className="text-black" />
          <h1 className="text-lg font-bold">Spirit Food Manager</h1>
        </div>
        {/* Mobile Actions Container */}
        <div className="flex items-center gap-2">
          <Button variant="actionAdd" onClick={handleCreate} className="flex-1 font-semibold">
            <Plus className="h-4 w-4" />
            Add New Entry
          </Button>
          <Button variant="actionUpload" onClick={handleBulkUpload} className="flex-1 font-semibold">
            <Upload className="h-4 w-4" />
            Bulk Upload
          </Button>
        </div>
      </div>

      {/* Mobile: Cards List */}
      <div className="md:hidden space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
          <Input
            variant="adminSearchBar"
            placeholder="Search by book, reference, date, maker or checker..."
            value={filterStore.q ?? ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {FILTER_OPTIONS.map((option) => {
            const isActive = filterStore.status === option.value;
            return (
              <Button
                key={option.value || "all"}
                variant={isActive ? option.activeVariant : option.variant}
                size="sm"
                onClick={() => handleFilterChange(option.value)}
              >
                {option.label}
              </Button>
            );
          })}
        </div>

        {/* Entries Count */}
        <div className="text-sm text-muted-foreground">Spirit Food Entries ({total})</div>

        {/* Cards with Infinite Scroll */}
        {isListLoading && allLoadedItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">Loading...</div>
        ) : allLoadedItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No results.</div>
        ) : (
          <SpiritFoodCardList
            items={allLoadedItems}
            currentUserId={currentUserId}
            onEdit={handleEdit}
            onSubmit={handleSubmit}
            onApprove={handleApprove}
            onCancel={handleCancel}
            onRequestDelete={handleRequestDelete}
            onApproveDelete={handleApproveDelete}
            onCancelDelete={handleCancelDelete}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onLoadMore={fetchNextPage}
          />
        )}
      </div>

      {/* Desktop: Filter Buttons */}
      <div className="hidden md:flex flex-wrap items-center gap-2">
        {FILTER_OPTIONS.map((option) => {
          const isActive = filterStore.status === option.value;
          return (
            <Button
              key={option.value || "all"}
              variant={isActive ? option.activeVariant : option.variant}
              size="sm"
              onClick={() => handleFilterChange(option.value)}
            >
              {option.label}
            </Button>
          );
        })}
      </div>

      {/* Desktop: Search Bar (Below Filters) */}
      <div className="hidden md:block w-full">
        <div className="relative w-full md:w-100">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none text-muted-foreground" />
          <Input
            variant="adminSearchBar"
            placeholder="Search by book, reference, date, maker or checker..."
            value={filterStore.q ?? ""}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 h-10"
          />
        </div>
      </div>

      {/* Desktop: View Switcher */}
      <div className="hidden md:flex justify-between items-center mb-2">
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
        <div className="text-sm font-semibold text-muted-foreground mr-2">Total Entries: {total}</div>
      </div>

      {/* Desktop: Data Table or Card List based on viewMode */}
      <div className="hidden md:block">
        {viewMode === "table" ? (
          <SpiritFoodDataTable
            items={spiritFoodEntries}
            isLoading={isListLoading}
            pagination={
              total > 0
                ? {
                    pageIndex: pagination.pageIndex,
                    pageSize: pagination.pageSize,
                    total,
                  }
                : undefined
            }
            onPaginationChange={handlePaginationChange}
            searchValue={filterStore.q ?? ""}
            onSearchChange={handleSearchChange}
            currentUserId={currentUserId}
            onEdit={handleEdit}
            onSubmit={handleSubmit}
            onApprove={handleApprove}
            onCancel={handleCancel}
            onRequestDelete={handleRequestDelete}
            onApproveDelete={handleApproveDelete}
            onCancelDelete={handleCancelDelete}
          />
        ) : (
          <SpiritFoodCardList
            items={allLoadedItems}
            currentUserId={currentUserId}
            onEdit={handleEdit}
            onSubmit={handleSubmit}
            onApprove={handleApprove}
            onCancel={handleCancel}
            onRequestDelete={handleRequestDelete}
            onApproveDelete={handleApproveDelete}
            onCancelDelete={handleCancelDelete}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            onLoadMore={fetchNextPage}
          />
        )}
      </div>

      {/* Form Sheet */}
      {isFormOpen && (
        <SpiritFoodForm
          mode={editingItem ? "edit" : "create"}
          spiritFood={editingItem ?? undefined}
          onClose={handleCloseForm}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Bulk Upload Modal */}
      <SpiritFoodBulkUploadModal
        open={isBulkUploadOpen}
        onOpenChange={handleBulkUploadClose}
        onSuccess={handleBulkUploadSuccess}
      />

      {/* Review Confirmation Modal */}
      <SpiritFoodReviewModal
        open={Boolean(reviewingItem)}
        onOpenChange={(open) => !open && handleCloseReviewModal()}
        action={reviewAction}
        item={reviewingItem}
        onConfirm={handleConfirmReview}
        isLoading={isReviewLoading}
      />
    </div>
  );
}
