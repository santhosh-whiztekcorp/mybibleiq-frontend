"use client";

import React from "react";
import { Plus, Upload, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/assets";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useAdminViewStore } from "@/store/useAdminViewStore";
import {
  QuestionTypeStats,
  QuestionStatusStats,
  QuestionDataTable,
  QuestionCardList,
  QuestionDeleteModal,
  QuestionStatusActionModal,
  QuestionForm,
  QuestionImportModal,
} from "@/components/admin/admin-question";
import { useQuestionManagerPage } from "./QuestionManagerPage.hooks";
import {
  QUESTION_TYPE_OPTIONS,
  QUESTION_TYPE_LABELS,
  QUESTION_STATUS_OPTIONS,
  QUESTION_STATUS_LABELS,
} from "@/resources/admin-question";

export function QuestionManagerPage() {
  const {
    questions,
    total,
    typeStats,
    statusStats,
    isTypeStatsLoading,
    isStatusStatsLoading,
    filterStore,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFormOpen,
    editingQuestion,
    isDeletingQuestion,
    statusActionQuestion,
    statusAction,
    isActionLoading,
    handleSearchChange,
    handleStatusFilterChange,
    handleTypeFilterChange,
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
    setStatusActionQuestion,
    setStatusAction,
    setIsDeletingQuestion,
    handleConfirmDelete,
    handleFormSuccess,
    setIsFormOpen,
    isEditingQuestionLoading,
    handleImport,
    isImportModalOpen,
    setIsImportModalOpen,
  } = useQuestionManagerPage();

  const { viewMode, setViewMode } = useAdminViewStore();

  return (
    <div className="w-full space-y-4 pt-2">
      {/* Header Actions */}
      <div className="flex items-end justify-between gap-4">
        <h2 className="hidden md:block text-lg font-bold truncate">Question Bank</h2>
        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
          <Button variant="actionAdd" onClick={handleCreate} className="font-semibold w-auto flex-1">
            <Plus className="h-4 w-4" />
            Create Question
          </Button>
          <Button variant="actionAdd" onClick={handleImport} className="font-semibold w-auto flex-1">
            <Upload className="h-4 w-4" />
            Bulk Upload
          </Button>
        </div>
      </div>

      {/* Stats and Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 h-full md:items-stretch">
        <div className="w-full md:w-[350px] shrink-0">
          <QuestionTypeStats stats={typeStats} isLoading={isTypeStatsLoading} />
        </div>
        <div className="w-full md:w-[240px] shrink-0">
          <QuestionStatusStats stats={statusStats} isLoading={isStatusStatsLoading} />
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
                placeholder="Search questions by text..."
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
                {QUESTION_STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {QUESTION_STATUS_LABELS[status]}
                  </SelectItem>
                ))}
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
                {QUESTION_TYPE_OPTIONS.map((type) => (
                  <SelectItem key={type} value={type}>
                    {QUESTION_TYPE_LABELS[type]}
                  </SelectItem>
                ))}
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

      {/* Questions Content */}
      <div className="space-y-4">
        {/* Desktop View Switcher */}
        <div className="hidden md:flex items-center gap-3 mb-2">
          <div className="flex items-center bg-white p-1 rounded-lg border border-[#E2E8F0] gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("table")}
              className={cn(
                "h-8 px-3 text-xs font-bold uppercase transition-all",
                viewMode === "table"
                  ? "bg-[#F8FAFC] text-primary shadow-sm"
                  : "border-transparent text-[#656A73] hover:text-[#1E293B]"
              )}
            >
              <List className="h-4 w-4 mr-2" />
              Table
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode("card")}
              className={cn(
                "h-8 px-3 text-xs font-bold uppercase transition-all",
                viewMode === "card"
                  ? "bg-[#F8FAFC] text-primary shadow-sm"
                  : "border-transparent text-[#656A73] hover:text-[#1E293B]"
              )}
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Cards
            </Button>
          </div>
          <div className="text-sm font-semibold text-[#656A73]">Total Questions: {total}</div>
        </div>

        {/* Desktop View: Data Table / Card List */}
        <div className="hidden md:block">
          {viewMode === "table" ? (
            <QuestionDataTable
              items={questions}
              isLoading={isLoading}
              total={total}
              pagination={{
                pageIndex: (filterStore.page || 1) - 1,
                pageSize: filterStore.pageSize || 10,
              }}
              onPaginationChange={handlePaginationChange}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onPublish={handlePublish}
              onArchive={handleArchive}
              onClone={handleClone}
            />
          ) : (
            <QuestionCardList
              items={questions}
              isLoading={isLoading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onPublish={handlePublish}
              onArchive={handleArchive}
              onClone={handleClone}
              onLoadMore={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
        </div>

        {/* Mobile View: Card List (Always) */}
        <div className="md:hidden">
          <QuestionCardList
            items={questions}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPublish={handlePublish}
            onArchive={handleArchive}
            onClone={handleClone}
            onLoadMore={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
      </div>

      {/* Modals & Forms */}
      {isFormOpen && !isEditingQuestionLoading && (
        <QuestionForm item={editingQuestion} onSuccess={handleFormSuccess} onClose={() => setIsFormOpen(false)} />
      )}

      <QuestionImportModal
        open={isImportModalOpen}
        onOpenChange={setIsImportModalOpen}
        onSuccess={() => setIsImportModalOpen(false)}
      />

      <QuestionDeleteModal
        open={!!isDeletingQuestion}
        onOpenChange={(open) => !open && setIsDeletingQuestion(null)}
        item={isDeletingQuestion}
        onConfirm={handleConfirmDelete}
        isLoading={isActionLoading}
      />

      <QuestionStatusActionModal
        open={!!statusActionQuestion && !!statusAction}
        onOpenChange={(open) => {
          if (!open) {
            setStatusActionQuestion(null);
            setStatusAction(null);
          }
        }}
        item={statusActionQuestion}
        action={statusAction}
        onConfirm={handleConfirmStatusAction}
        isLoading={isActionLoading}
      />
    </div>
  );
}
