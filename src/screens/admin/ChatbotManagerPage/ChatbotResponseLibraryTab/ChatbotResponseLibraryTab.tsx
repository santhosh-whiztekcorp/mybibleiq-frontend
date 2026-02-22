"use client";

import React from "react";
import { Plus, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "@/assets";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useAdminViewStore } from "@/store/useAdminViewStore";
import { AdminConfirmationModal } from "@/components/admin/admin-shared";
import {
  ChatbotResponseCardList,
  ChatbotResponseDataTable,
  ChatbotResponseForm,
} from "@/components/admin/admin-chatbot";
import { useChatbotResponseLibraryTab } from "./ChatbotResponseLibraryTab.hooks";
import type { ChatbotResponseLibraryTabProps } from "./ChatbotResponseLibraryTab.types";

export function ChatbotResponseLibraryTab({ active }: ChatbotResponseLibraryTabProps) {
  const {
    responses,
    total,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    filterStore,
    categoryOptions,
    handleSearchChange,
    handleCategoryChange,
    handleClearFilters,
    handleLoadMore,
    isFormOpen,
    editingResponse,
    handleCreate,
    handleEdit,
    handleCloseForm,
    handleFormSuccess,
    isConfirmOpen,
    deletingResponse,
    handleDelete,
    handleConfirmDelete,
    handleCloseConfirm,
    isActionLoading,
  } = useChatbotResponseLibraryTab();

  const { viewMode, setViewMode } = useAdminViewStore();

  if (!active) return null;

  return (
    <div className="w-full space-y-4">
      {/* Header Actions */}
      <div className="flex items-end justify-between gap-4">
        <h2 className="hidden md:block text-lg font-bold truncate">Response Library</h2>
        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
          <Button variant="actionAdd" onClick={handleCreate} className="font-semibold w-auto flex-1 md:flex-none">
            <Plus className="h-4 w-4" />
            Add Response
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 h-full md:items-stretch">
        <div className="flex-1 bg-white p-2 rounded-lg border border-[#E2E8F0] w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px_auto] gap-2 items-end">
            {/* Search Bar */}
            <div className="w-full space-y-1.5">
              <label className="text-xs font-bold text-[#656A73] uppercase text-nowrap">Search</label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#656A73] pointer-events-none" />
                <Input
                  variant="adminSearchBar"
                  placeholder="Search responses..."
                  value={filterStore.q ?? ""}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 h-11"
                />
              </div>
            </div>

            <div className="w-full space-y-1.5">
              <label className="text-xs font-bold text-[#656A73] uppercase">Category</label>
              <Select
                value={filterStore.category ?? "all"}
                onValueChange={(value) => handleCategoryChange(value === "all" ? undefined : value)}
              >
                <SelectTrigger variant="adminFilter">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categoryOptions.map((opt) => (
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
              onClick={handleClearFilters}
              className="h-11 px-4 border-[#E2E8F0] text-xs font-bold uppercase text-[#656A73] rounded-lg hidden md:flex"
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Desktop View Switcher */}
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
              <List className="h-4 w-4 mr-2" />
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
              <LayoutGrid className="h-4 w-4 mr-2" />
              Cards
            </Button>
          </div>
          <div className="text-sm font-semibold text-[#656A73]">Total Responses: {total}</div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:block">
          {viewMode === "table" ? (
            <ChatbotResponseDataTable
              items={responses}
              isLoading={isLoading}
              total={total}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onLoadMore={handleLoadMore}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          ) : (
            <ChatbotResponseCardList
              items={responses}
              isLoading={isLoading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onLoadMore={handleLoadMore}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          )}
        </div>

        {/* Mobile View: Cards */}
        <div className="md:hidden">
          <ChatbotResponseCardList
            items={responses}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onLoadMore={handleLoadMore}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
      </div>

      {/* Form Sheet */}
      {isFormOpen && (
        <ChatbotResponseForm
          mode={editingResponse ? "edit" : "create"}
          response={editingResponse ?? undefined}
          onClose={handleCloseForm}
          onSuccess={handleFormSuccess}
        />
      )}

      {/* Delete Confirmation */}
      <AdminConfirmationModal
        open={isConfirmOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleCloseConfirm();
          }
        }}
        action="delete"
        entityName={deletingResponse?.question || "Response"}
        onConfirm={handleConfirmDelete}
        isLoading={isActionLoading}
      />
    </div>
  );
}
