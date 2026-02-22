"use client";

import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import {
  CHATBOT_RESPONSE_CATEGORY_LABELS,
  CHATBOT_RESPONSE_CATEGORY_OPTIONS,
  useChatbotResponseFilterStore,
  useChatbotResponseList,
  useDeleteChatbotResponse,
} from "@/resources/admin-chatbot";
import type { ChatbotResponseCategory, ChatbotResponseDetail } from "@/resources/admin-chatbot";
import type { UseChatbotResponseLibraryTabReturn } from "./ChatbotResponseLibraryTab.types";

export const useChatbotResponseLibraryTab = (): UseChatbotResponseLibraryTabReturn => {
  const { category, q, page, pageSize, setFilters, resetFilters } = useChatbotResponseFilterStore();

  const debouncedQ = useDebounce(q ?? "", 500);

  const filters = useMemo(
    () => ({
      category: (category || undefined) as ChatbotResponseCategory | undefined,
      q: debouncedQ || undefined,
      pageSize,
    }),
    [category, debouncedQ, pageSize]
  );

  const {
    data: listData,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useChatbotResponseList(filters);

  const responses = useMemo(() => listData?.pages.flatMap((p) => p.items) ?? [], [listData]);
  const total = useMemo(() => listData?.pages?.[0]?.total ?? 0, [listData]);

  const categoryOptions = useMemo(
    () =>
      CHATBOT_RESPONSE_CATEGORY_OPTIONS.map((value) => ({
        value,
        label: CHATBOT_RESPONSE_CATEGORY_LABELS[value as ChatbotResponseCategory],
      })),
    []
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setFilters({ q: value || undefined });
    },
    [setFilters]
  );

  const handleCategoryChange = useCallback(
    (value: string | undefined) => {
      setFilters({ category: (value || undefined) as ChatbotResponseCategory | undefined });
    },
    [setFilters]
  );

  const handleClearFilters = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingResponse, setEditingResponse] = useState<ChatbotResponseDetail | null>(null);

  const handleCreate = useCallback(() => {
    setEditingResponse(null);
    setIsFormOpen(true);
  }, []);

  const handleEdit = useCallback((item: ChatbotResponseDetail) => {
    setEditingResponse(item);
    setIsFormOpen(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setIsFormOpen(false);
    setEditingResponse(null);
  }, []);

  const handleFormSuccess = useCallback(() => {
    setIsFormOpen(false);
    setEditingResponse(null);
    refetch();
  }, [refetch]);

  const deleteMutation = useDeleteChatbotResponse();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deletingResponse, setDeletingResponse] = useState<ChatbotResponseDetail | null>(null);

  const handleDelete = useCallback((item: ChatbotResponseDetail) => {
    setDeletingResponse(item);
    setIsConfirmOpen(true);
  }, []);

  const handleCloseConfirm = useCallback(() => {
    setIsConfirmOpen(false);
    setDeletingResponse(null);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deletingResponse) return;
    try {
      await deleteMutation.mutateAsync(deletingResponse.id);
      handleCloseConfirm();
      refetch();
    } catch {
      // toast handled in mutation
    }
  }, [deletingResponse, deleteMutation, handleCloseConfirm, refetch]);

  return {
    responses,
    total,
    isLoading,
    hasNextPage: Boolean(hasNextPage),
    isFetchingNextPage,
    filterStore: {
      category: category ?? undefined,
      q: q ?? undefined,
      page,
      pageSize,
    },
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
    isActionLoading: deleteMutation.isPending,
  };
};
