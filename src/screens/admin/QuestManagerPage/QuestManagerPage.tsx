"use client";

import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { TrophyIcon, SearchIcon } from "@/assets";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  QuestStatusStats,
  QuestDataTable,
  QuestCardList,
  QuestDeleteModal,
  QuestStatusActionModal,
  QuestForm,
  QuestScheduleModal,
  QuestStageListing,
  QuestStageForm,
} from "@/components/admin/admin-quest";
import { useQuestManagerPage } from "./QuestManagerPage.hooks";
import { QUEST_STATUS_OPTIONS, QUEST_STATUS_LABELS } from "@/resources/admin-quest";
import type { AdminQuestListInput } from "@/resources/admin-quest";

export function QuestManagerPage() {
  const {
    quests,
    total,
    statusStats,
    isStatusStatsLoading,
    filterStore,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFormOpen,
    editingQuest,
    isDeletingQuest,
    statusActionQuest,
    statusAction,
    isScheduleModalOpen,
    schedulingQuest,
    isStageListingVisible,
    stageListingQuestId,
    stages,
    isStageFormVisible,
    editingStageId,
    stageListingQuest,
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
    handleSchedule,
    handleManageStages,
    handleConfirmStatusAction,
    handleConfirmDelete,
    handleScheduleConfirm,
    handleFormSuccess,
    handleCloseStageListing,
    handleAddStage,
    handleEditStage,
    handleCloseStageForm,
    handleDeleteStage,
    handleStageFormSuccess,
    setIsFormOpen,
    setIsDeletingQuest,
    setStatusActionQuest,
    setStatusAction,
    setIsScheduleModalOpen,
    isEditingQuestLoading,
  } = useQuestManagerPage();

  return (
    <div className="w-full space-y-4 md:space-y-6">
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <TrophyIcon width={20} height={20} className="text-black" />
            <h1 className="text-xl font-bold text-black">Quest Manager</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="actionAdd" onClick={handleCreate} className="font-semibold">
            <Plus className="h-4 w-4" />
            Create Quest
          </Button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden space-y-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <TrophyIcon width={18} height={18} className="text-black" />
          <h1 className="text-lg font-bold text-black">Quest Manager</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="actionAdd" onClick={handleCreate} className="flex-1 font-semibold">
            <Plus className="h-4 w-4" />
            Create Quest
          </Button>
        </div>
      </div>

      {/* Stats and Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 h-full md:items-stretch">
        <div className="w-full md:w-[350px] shrink-0">
          <QuestStatusStats stats={statusStats} isLoading={isStatusStatsLoading} />
        </div>

        {/* Filters Section */}
        <div className="flex-1 flex flex-wrap items-end gap-2 bg-white p-2 rounded-lg border border-[#E2E8F0]">
          <div className="w-full space-y-1.5 order-first mb-2">
            <label className="text-xs font-bold text-[#656A73] uppercase text-nowrap">Search</label>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#656A73] pointer-events-none" />
              <Input
                variant="adminSearchBar"
                placeholder="Search quests by title or description..."
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
                {QUEST_STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {QUEST_STATUS_LABELS[status]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[200px] space-y-1.5">
            <label className="text-xs font-bold text-[#656A73] uppercase">Sort By</label>
            <Select
              value={filterStore.sort}
              onValueChange={(value) => handleSortChange(value as AdminQuestListInput["sort"])}
            >
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
              handleSortChange("-createdAt");
            }}
            className="h-11 px-4 border-[#E2E8F0] text-xs font-bold uppercase text-[#656A73] rounded-lg hidden md:flex"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {/* Desktop View: Data Table */}
        <div className="hidden md:block bg-white rounded-lg border border-[#E2E8F0] overflow-hidden">
          <QuestDataTable
            items={quests}
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
            onManageStages={handleManageStages}
          />
        </div>

        {/* Mobile View: Card List */}
        <div className="md:hidden">
          <QuestCardList
            items={quests}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPublish={handlePublish}
            onArchive={handleArchive}
            onClone={handleClone}
            onSchedule={handleSchedule}
            onManageStages={handleManageStages}
            onLoadMore={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
      </div>

      {/* Modals & Forms */}
      {isFormOpen && !isEditingQuestLoading && (
        <QuestForm
          item={editingQuest ?? undefined}
          onSuccess={handleFormSuccess}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      {isStageListingVisible && stageListingQuest && (
        <QuestStageListing
          questId={stageListingQuest.id}
          questStatus={stageListingQuest.status}
          stages={stages}
          onAddStage={handleAddStage}
          onEditStage={handleEditStage}
          onDeleteStage={handleDeleteStage}
          onClose={handleCloseStageListing}
        />
      )}

      {isStageFormVisible && stageListingQuestId && (
        <QuestStageForm
          questId={stageListingQuestId}
          mode={editingStageId ? "edit" : "create"}
          stageId={editingStageId ?? undefined}
          stages={stages}
          onSuccess={handleStageFormSuccess}
          onClose={handleCloseStageForm}
        />
      )}

      <QuestDeleteModal
        open={!!isDeletingQuest}
        onOpenChange={(open) => !open && setIsDeletingQuest(null)}
        item={isDeletingQuest}
        onConfirm={handleConfirmDelete}
        isLoading={isActionLoading}
      />

      <QuestStatusActionModal
        open={!!statusActionQuest && !!statusAction}
        onOpenChange={(open) => {
          if (!open) {
            setStatusActionQuest(null);
            setStatusAction(null);
          }
        }}
        item={statusActionQuest}
        action={statusAction}
        onConfirm={handleConfirmStatusAction}
        isLoading={isActionLoading}
      />

      <QuestScheduleModal
        open={isScheduleModalOpen}
        onOpenChange={setIsScheduleModalOpen}
        item={schedulingQuest}
        onConfirm={handleScheduleConfirm}
        isLoading={isActionLoading}
      />
    </div>
  );
}
