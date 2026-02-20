"use client";

import React from "react";
import { Plus, List, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { CircleQuestionIcon, SearchIcon } from "@/assets";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAdminViewStore } from "@/store/useAdminViewStore";
import { cn } from "@/lib/utils";
import {
  QuizStatusStats,
  QuizDataTable,
  QuizCardList,
  QuizDeleteModal,
  QuizStatusActionModal,
  QuizForm,
  QuizScheduleModal,
} from "@/components/admin/admin-quiz";
import { useQuizManagerPage } from "./QuizManagerPage.hooks";
import {
  QUIZ_STATUS_OPTIONS,
  QUIZ_STATUS_LABELS,
  QUIZ_DIFFICULTY_OPTIONS,
  QUIZ_DIFFICULTY_LABELS,
} from "@/resources/admin-quiz";

export function QuizManagerPage() {
  const {
    quizzes,
    total,
    statusStats,
    isStatusStatsLoading,
    filterStore,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFormOpen,
    editingQuiz,
    isDeletingQuiz,
    statusActionQuiz,
    statusAction,
    isScheduleModalOpen,
    schedulingQuiz,
    isActionLoading,
    handleSearchChange,
    handleStatusFilterChange,
    handleDifficultyFilterChange,
    handlePaginationChange,
    handleSortChange,
    sortOptions,
    handleCreate,
    handleEdit,
    handleDelete,
    handlePublish,
    handleArchive,
    handleClone,
    handleSchedule,
    handleConfirmStatusAction,
    handleConfirmDelete,
    handleScheduleConfirm,
    handleFormSuccess,
    setIsFormOpen,
    setIsDeletingQuiz,
    setStatusActionQuiz,
    setStatusAction,
    setIsScheduleModalOpen,
    isEditingQuizLoading,
  } = useQuizManagerPage();

  const { viewMode, setViewMode } = useAdminViewStore();

  return (
    <div className="w-full space-y-4 md:space-y-6">
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <CircleQuestionIcon width={20} height={20} className="text-black" />
            <h1 className="text-xl font-bold text-black">Quiz Manager</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="actionAdd" onClick={handleCreate} className="font-semibold">
            <Plus className="h-4 w-4" />
            Create Quiz
          </Button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden space-y-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <CircleQuestionIcon width={18} height={18} className="text-black" />
          <h1 className="text-lg font-bold text-black">Quiz Manager</h1>
        </div>
        {/* Mobile Actions Container */}
        <div className="flex items-center gap-2">
          <Button variant="actionAdd" onClick={handleCreate} className="flex-1 font-semibold">
            <Plus className="h-4 w-4" />
            Create Quiz
          </Button>
        </div>
      </div>

      {/* Stats and Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 h-full md:items-stretch">
        <div className="w-full md:w-[350px] shrink-0">
          <QuizStatusStats stats={statusStats} isLoading={isStatusStatsLoading} />
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
                placeholder="Search quizzes by title or description..."
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
                {QUIZ_STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {QUIZ_STATUS_LABELS[status]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[200px] space-y-1.5">
            <label className="text-xs font-bold text-[#656A73] uppercase">Difficulty</label>
            <Select
              value={filterStore.difficulty ?? "all"}
              onValueChange={(value) => handleDifficultyFilterChange(value === "all" ? undefined : value)}
            >
              <SelectTrigger variant="adminFilter">
                <SelectValue placeholder="All Difficulties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                {QUIZ_DIFFICULTY_OPTIONS.map((diff) => (
                  <SelectItem key={diff} value={diff}>
                    {QUIZ_DIFFICULTY_LABELS[diff]}
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
              handleDifficultyFilterChange(undefined);
              handleSortChange("-createdAt");
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
          <div className="text-sm font-semibold text-muted-foreground">Total Quizzes: {total}</div>
        </div>

        {/* Desktop View: Data Table or Card List based on viewMode */}
        <div className="hidden md:block">
          {viewMode === "table" ? (
            <div className="bg-white rounded-lg border border-[#E2E8F0] overflow-hidden">
              <QuizDataTable
                items={quizzes}
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
                onSchedule={handleSchedule}
              />
            </div>
          ) : (
            <QuizCardList
              items={quizzes}
              isLoading={isLoading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onPublish={handlePublish}
              onArchive={handleArchive}
              onClone={handleClone}
              onSchedule={handleSchedule}
              onLoadMore={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
        </div>

        {/* Mobile View: Card List (Always) */}
        <div className="md:hidden">
          <QuizCardList
            items={quizzes}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPublish={handlePublish}
            onArchive={handleArchive}
            onClone={handleClone}
            onSchedule={handleSchedule}
            onLoadMore={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
      </div>

      {/* Modals & Forms */}
      {isFormOpen && !isEditingQuizLoading && (
        <QuizForm item={editingQuiz} onSuccess={handleFormSuccess} onClose={() => setIsFormOpen(false)} />
      )}

      <QuizDeleteModal
        open={!!isDeletingQuiz}
        onOpenChange={(open) => !open && setIsDeletingQuiz(null)}
        item={isDeletingQuiz}
        onConfirm={handleConfirmDelete}
        isLoading={isActionLoading}
      />

      <QuizStatusActionModal
        open={!!statusActionQuiz && !!statusAction}
        onOpenChange={(open) => {
          if (!open) {
            setStatusActionQuiz(null);
            setStatusAction(null);
          }
        }}
        item={statusActionQuiz}
        action={statusAction}
        onConfirm={handleConfirmStatusAction}
        isLoading={isActionLoading}
      />

      <QuizScheduleModal
        open={isScheduleModalOpen}
        onOpenChange={setIsScheduleModalOpen}
        item={schedulingQuiz}
        onConfirm={handleScheduleConfirm}
        isLoading={isActionLoading}
      />
    </div>
  );
}
