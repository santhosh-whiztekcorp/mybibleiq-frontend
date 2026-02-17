import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useAdminQuestionFilterStore,
  useAdminQuestionList,
  useAdminQuestionTypeStats,
  useAdminQuestionStatusStats,
  useAdminQuestionDetail,
  useDeleteAdminQuestion,
  useUpdateAdminQuestionStatus,
} from "@/resources/admin-question";
import type {
  AdminQuestionSummary,
  QuestionStatusAction,
  AdminQuestionStatus,
  QuestionType,
} from "@/resources/admin-question/admin-question.types";

export const useQuestionManagerPage = () => {
  const { status, type, tags, q, page, pageSize, sort, setFilters } = useAdminQuestionFilterStore();

  const debouncedQ = useDebounce(q ?? "", 500);

  const filters = useMemo(
    () => ({
      status,
      type,
      tags,
      q: debouncedQ || undefined,
      pageSize,
      sort,
    }),
    [status, type, tags, debouncedQ, pageSize, sort]
  );

  const {
    data: listData,
    isLoading: isListLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAdminQuestionList(filters);
  const { data: typeStats, isLoading: isTypeStatsLoading } = useAdminQuestionTypeStats();
  const { data: statusStats, isLoading: isStatusStatsLoading } = useAdminQuestionStatusStats();

  const questions = useMemo(() => listData?.pages.flatMap((page) => page?.items ?? []) ?? [], [listData]);
  const total = useMemo(() => listData?.pages[0]?.total ?? 0, [listData]);

  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const { data: editingQuestion, isLoading: isEditingQuestionLoading } = useAdminQuestionDetail(
    editingQuestionId || "",
    !!editingQuestionId
  );

  // Delete state
  const [isDeletingQuestion, setIsDeletingQuestion] = useState<AdminQuestionSummary | null>(null);

  // Import Modal state
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  // Status action state
  const [statusActionQuestion, setStatusActionQuestion] = useState<AdminQuestionSummary | null>(null);
  const [statusAction, setStatusAction] = useState<QuestionStatusAction | null>(null);

  // Mutations
  const updateStatusMutation = useUpdateAdminQuestionStatus();
  const deleteMutation = useDeleteAdminQuestion();

  // Handlers
  const handleSearchChange = useCallback(
    (value: string) => {
      setFilters({ q: value });
    },
    [setFilters]
  );

  const handleStatusFilterChange = useCallback(
    (value: string | undefined) => {
      setFilters({ status: value as AdminQuestionStatus });
    },
    [setFilters]
  );

  const handleTypeFilterChange = useCallback(
    (value: string | undefined) => {
      setFilters({ type: value as QuestionType });
    },
    [setFilters]
  );

  const handlePaginationChange = useCallback(
    (pagination: { pageIndex: number; pageSize: number }) => {
      setFilters({ page: pagination.pageIndex + 1, pageSize: pagination.pageSize });
    },
    [setFilters]
  );

  const handleSortChange = useCallback(
    (value: string) => {
      setFilters({ sort: value });
    },
    [setFilters]
  );

  const sortOptions = useMemo(
    () => [
      { label: "Newest First", value: "-createdAt" },
      { label: "Oldest First", value: "createdAt" },
      { label: "Question (A-Z)", value: "questionText" },
      { label: "Question (Z-A)", value: "-questionText" },
    ],
    []
  );

  const handleCreate = useCallback(() => {
    setEditingQuestionId(null);
    setIsFormOpen(true);
  }, []);

  const handleImport = useCallback(() => {
    setIsImportModalOpen(true);
  }, []);

  const handleEdit = useCallback((question: AdminQuestionSummary) => {
    setEditingQuestionId(question.id);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback((question: AdminQuestionSummary) => {
    setIsDeletingQuestion(question);
  }, []);

  const handlePublish = useCallback((question: AdminQuestionSummary) => {
    setStatusActionQuestion(question);
    setStatusAction("Publish");
  }, []);

  const handleArchive = useCallback((question: AdminQuestionSummary) => {
    setStatusActionQuestion(question);
    setStatusAction("Archive");
  }, []);

  const handleClone = useCallback((question: AdminQuestionSummary) => {
    setStatusActionQuestion(question);
    setStatusAction("Clone");
  }, []);

  const handleConfirmStatusAction = useCallback(async () => {
    if (!statusActionQuestion || !statusAction) return;

    try {
      await updateStatusMutation.mutateAsync({
        id: statusActionQuestion.id,
        input: { action: statusAction },
      });
      setStatusActionQuestion(null);
      setStatusAction(null);
    } catch {
      // Error handled by mutation
    }
  }, [statusActionQuestion, statusAction, updateStatusMutation]);

  const handleConfirmDelete = useCallback(async () => {
    if (!isDeletingQuestion) return;

    try {
      await deleteMutation.mutateAsync(isDeletingQuestion.id);
      setIsDeletingQuestion(null);
    } catch {
      // Error handled by mutation
    }
  }, [isDeletingQuestion, deleteMutation]);

  const handleFormSuccess = useCallback(() => {
    setIsFormOpen(false);
    setEditingQuestionId(null);
  }, []);

  return {
    questions,
    total,
    typeStats,
    statusStats,
    isTypeStatsLoading,
    isStatusStatsLoading,
    filterStore: { status, type, tags, q, page, pageSize, sort },
    isLoading: isListLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isFormOpen,
    editingQuestion,
    isDeletingQuestion,
    statusActionQuestion,
    statusAction,
    isActionLoading: updateStatusMutation.isPending || deleteMutation.isPending,
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
    isImportModalOpen,
    setIsImportModalOpen,
    handleImport,
  };
};
