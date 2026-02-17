import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useAdminQuizFilterStore,
  useAdminQuizList,
  useAdminQuizStatusStats,
  useAdminQuizDetail,
  useDeleteAdminQuiz,
  useUpdateAdminQuizStatus,
} from "@/resources/admin-quiz";
import type {
  AdminQuizSummary,
  QuizStatusAction,
  AdminQuizStatus,
  QuizDifficulty,
} from "@/resources/admin-quiz/admin-quiz.types";

export const useQuizManagerPage = () => {
  const { status, difficulty, tags, q, page, pageSize, sort, setFilters } = useAdminQuizFilterStore();

  const debouncedQ = useDebounce(q ?? "", 500);

  const filters = useMemo(
    () => ({
      status,
      difficulty,
      tags,
      q: debouncedQ || undefined,
      pageSize,
      sort,
    }),
    [status, difficulty, tags, debouncedQ, pageSize, sort]
  );

  const {
    data: listData,
    isLoading: isListLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAdminQuizList(filters);
  const { data: statusStats, isLoading: isStatusStatsLoading } = useAdminQuizStatusStats();

  const quizzes = useMemo(() => listData?.pages.flatMap((page) => page?.items ?? []) ?? [], [listData]);
  const total = useMemo(() => listData?.pages[0]?.total ?? 0, [listData]);

  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingQuizId, setEditingQuizId] = useState<string | null>(null);
  const { data: editingQuiz, isLoading: isEditingQuizLoading } = useAdminQuizDetail(
    editingQuizId || "",
    !!editingQuizId
  );

  // Delete state
  const [isDeletingQuiz, setIsDeletingQuiz] = useState<AdminQuizSummary | null>(null);

  // Status action state
  const [statusActionQuiz, setStatusActionQuiz] = useState<AdminQuizSummary | null>(null);
  const [statusAction, setStatusAction] = useState<QuizStatusAction | null>(null);

  // Schedule action state
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [schedulingQuiz, setSchedulingQuiz] = useState<AdminQuizSummary | null>(null);

  // Mutations
  const updateStatusMutation = useUpdateAdminQuizStatus();
  const deleteMutation = useDeleteAdminQuiz();

  // Handlers
  const handleSearchChange = useCallback(
    (value: string) => {
      setFilters({ q: value });
    },
    [setFilters]
  );

  const handleStatusFilterChange = useCallback(
    (value: string | undefined) => {
      setFilters({ status: value as AdminQuizStatus });
    },
    [setFilters]
  );

  const handleDifficultyFilterChange = useCallback(
    (value: string | undefined) => {
      setFilters({ difficulty: value as QuizDifficulty });
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
      { label: "Title (A-Z)", value: "title" },
      { label: "Title (Z-A)", value: "-title" },
    ],
    []
  );

  const handleCreate = useCallback(() => {
    setEditingQuizId(null);
    setIsFormOpen(true);
  }, []);

  const handleEdit = useCallback((quiz: AdminQuizSummary) => {
    setEditingQuizId(quiz.id);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback((quiz: AdminQuizSummary) => {
    setIsDeletingQuiz(quiz);
  }, []);

  const handlePublish = useCallback((quiz: AdminQuizSummary) => {
    setStatusActionQuiz(quiz);
    setStatusAction("Publish");
  }, []);

  const handleArchive = useCallback((quiz: AdminQuizSummary) => {
    setStatusActionQuiz(quiz);
    setStatusAction("Archive");
  }, []);

  const handleClone = useCallback((quiz: AdminQuizSummary) => {
    setStatusActionQuiz(quiz);
    setStatusAction("Clone");
  }, []);

  const handleSchedule = useCallback((quiz: AdminQuizSummary) => {
    setSchedulingQuiz(quiz);
    setIsScheduleModalOpen(true);
  }, []);

  const handleConfirmStatusAction = useCallback(async () => {
    if (!statusActionQuiz || !statusAction) return;

    try {
      await updateStatusMutation.mutateAsync({
        id: statusActionQuiz.id,
        input: { action: statusAction },
      });
      setStatusActionQuiz(null);
      setStatusAction(null);
    } catch {
      // Error handled by mutation
    }
  }, [statusActionQuiz, statusAction, updateStatusMutation]);

  const handleConfirmDelete = useCallback(async () => {
    if (!isDeletingQuiz) return;

    try {
      await deleteMutation.mutateAsync(isDeletingQuiz.id);
      setIsDeletingQuiz(null);
    } catch {
      // Error handled by mutation
    }
  }, [isDeletingQuiz, deleteMutation]);

  const handleScheduleConfirm = useCallback(
    async (publishAt: string) => {
      if (!schedulingQuiz) return;

      try {
        await updateStatusMutation.mutateAsync({
          id: schedulingQuiz.id,
          input: { action: "Schedule", publishAt },
        });
        setIsScheduleModalOpen(false);
        setSchedulingQuiz(null);
      } catch {
        // Error handled by mutation
      }
    },
    [schedulingQuiz, updateStatusMutation]
  );

  const handleFormSuccess = useCallback(() => {
    setIsFormOpen(false);
    setEditingQuizId(null);
  }, []);

  return {
    quizzes,
    total,
    statusStats,
    isStatusStatsLoading,
    filterStore: { status, difficulty, tags, q, page, pageSize, sort },
    isLoading: isListLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isFormOpen,
    editingQuiz,
    isDeletingQuiz,
    statusActionQuiz,
    statusAction,
    isScheduleModalOpen,
    schedulingQuiz,
    isActionLoading: updateStatusMutation.isPending || deleteMutation.isPending,
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
  };
};
