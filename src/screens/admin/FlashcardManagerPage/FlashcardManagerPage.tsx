"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FlashcardGroupManagerPage } from "@/screens/admin/FlashcardGroupManagerPage";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/assets";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  FlashcardDataTable,
  FlashcardForm,
  FlashcardDeleteModal,
  FlashcardStats,
  FlashcardCardList,
  FlashcardStatusActionModal,
} from "@/components/admin/admin-flashcard";
import { useFlashcardManagerPage, useTabNavigation } from "./FlashcardManagerPage.hooks";

export function FlashcardManagerPage() {
  const { activeTab, handleTabChange } = useTabNavigation();

  const {
    flashcards,
    total,
    stats,
    filterStore,
    isLoading,
    isFormOpen,
    editingFlashcard,
    isDeletingFlashcard,
    statusActionFlashcard,
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
    setStatusActionFlashcard,
    setStatusAction,
    setIsDeletingFlashcard,
    handleConfirmDelete,
    handleFormSuccess,
    setIsFormOpen,
  } = useFlashcardManagerPage();

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList variant="adminSecondary">
          <TabsTrigger variant="adminSecondary" value="flashcards">
            Flashcards
          </TabsTrigger>
          <TabsTrigger variant="adminSecondary" value="groups">
            Groups
          </TabsTrigger>
        </TabsList>
        <TabsContent value="flashcards" className="space-y-4 pt-2">
          {/* Header Actions */}
          <div className="flex items-end justify-between gap-4">
            <h2 className="hidden md:block text-lg font-bold truncate">Flashcard Management</h2>
            <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
              <Button variant="actionAdd" onClick={handleCreate} className="font-semibold w-full md:w-auto">
                <Plus className="mr-2 h-4 w-4" />
                Create Flashcard
              </Button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            {/* Stats Section */}
            <div className="w-full md:w-72">
              <FlashcardStats stats={stats} isLoading={isLoading} />
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
                    placeholder="Search by word or definition..."
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
                    handleStatusFilterChange(
                      value === "all" ? undefined : (value as "Draft" | "Published" | "Archived")
                    )
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

          {/* Mobile View: Cards */}
          <div className="block md:hidden">
            <FlashcardCardList
              items={flashcards}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onPublish={handlePublish}
              onArchive={handleArchive}
              onClone={handleClone}
            />
          </div>

          {/* Desktop View: Table */}
          <div className="hidden md:block bg-white rounded-lg border border-[#E2E8F0] overflow-hidden">
            <FlashcardDataTable
              items={flashcards}
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
          </div>

          {/* Form Drawer */}
          {isFormOpen && (
            <FlashcardForm
              mode={editingFlashcard ? "edit" : "create"}
              flashcard={editingFlashcard ?? undefined}
              onClose={() => setIsFormOpen(false)}
              onSuccess={handleFormSuccess}
            />
          )}

          {/* Delete Confirmation */}
          <FlashcardDeleteModal
            open={Boolean(isDeletingFlashcard)}
            onOpenChange={(open) => !open && setIsDeletingFlashcard(null)}
            item={isDeletingFlashcard}
            onConfirm={handleConfirmDelete}
            isLoading={isActionLoading}
          />

          {/* Status Action Confirmation */}
          <FlashcardStatusActionModal
            open={Boolean(statusActionFlashcard && statusAction)}
            onOpenChange={(open) => {
              if (!open) {
                setStatusActionFlashcard(null);
                setStatusAction(null);
              }
            }}
            item={statusActionFlashcard}
            action={statusAction}
            onConfirm={handleConfirmStatusAction}
            isLoading={isActionLoading}
          />
        </TabsContent>
        <TabsContent value="groups">
          <FlashcardGroupManagerPage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
