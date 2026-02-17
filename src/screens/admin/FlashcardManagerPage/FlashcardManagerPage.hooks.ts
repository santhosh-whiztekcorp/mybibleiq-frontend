import { useCallback, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useAdminFlashcardFilterStore,
  useAdminFlashcardList,
  useAdminFlashcardStatusStats,
  useCreateAdminFlashcard,
  useDeleteAdminFlashcard,
  useUpdateAdminFlashcard,
  useUpdateAdminFlashcardStatus,
} from "@/resources/admin-flashcard";
import type { AdminFlashcardSummary, FlashcardStatusAction } from "@/resources/admin-flashcard/admin-flashcard.types";

const TAB_PARAM = "subtab";
const DEFAULT_TAB = "flashcards";

export const useTabNavigation = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams ? searchParams.get(TAB_PARAM) || DEFAULT_TAB : DEFAULT_TAB;

  const handleTabChange = useCallback(
    (value: string) => {
      if (!searchParams) return;
      const currentParams = searchParams.toString();
      const params = new URLSearchParams(currentParams);
      if (value === DEFAULT_TAB) {
        params.delete(TAB_PARAM);
      } else {
        params.set(TAB_PARAM, value);
      }
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  return { activeTab, handleTabChange };
};

export const useFlashcardManagerPage = () => {
  const { status, tag, q, page, pageSize, sort, setFilters } = useAdminFlashcardFilterStore();

  const debouncedQ = useDebounce(q ?? "", 500);

  const filters = useMemo(
    () => ({
      status,
      tag,
      q: debouncedQ || undefined,
      pageSize,
      sort,
    }),
    [status, tag, debouncedQ, pageSize, sort]
  );

  const {
    data: listData,
    isLoading: isListLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAdminFlashcardList(filters);

  const flashcards = useMemo(() => listData?.pages.flatMap((page) => page?.items ?? []) ?? [], [listData]);
  const total = useMemo(() => listData?.pages[0]?.total ?? 0, [listData]);

  const { data: statsData, isLoading: isStatsLoading } = useAdminFlashcardStatusStats();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingFlashcard, setEditingFlashcard] = useState<AdminFlashcardSummary | null>(null);
  const [isDeletingFlashcard, setIsDeletingFlashcard] = useState<AdminFlashcardSummary | null>(null);
  const [statusActionFlashcard, setStatusActionFlashcard] = useState<AdminFlashcardSummary | null>(null);
  const [statusAction, setStatusAction] = useState<FlashcardStatusAction | null>(null);

  const createMutation = useCreateAdminFlashcard();
  const updateMutation = useUpdateAdminFlashcard();
  const deleteMutation = useDeleteAdminFlashcard();
  const updateStatusMutation = useUpdateAdminFlashcardStatus();

  const handleSearchChange = useCallback(
    (value: string) => {
      setFilters({ q: value });
    },
    [setFilters]
  );

  const handleStatusFilterChange = useCallback(
    (status?: "Draft" | "Published" | "Archived") => {
      setFilters({ status });
    },
    [setFilters]
  );

  const handlePaginationChange = useCallback(
    (pagination: { pageIndex: number; pageSize: number }) => {
      setFilters({ page: pagination.pageIndex + 1, pageSize: pagination.pageSize });
    },
    [setFilters]
  );

  const handleCreate = useCallback(() => {
    setEditingFlashcard(null);
    setIsFormOpen(true);
  }, []);

  const handleEdit = useCallback((flashcard: AdminFlashcardSummary) => {
    setEditingFlashcard(flashcard);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback((flashcard: AdminFlashcardSummary) => {
    setIsDeletingFlashcard(flashcard);
  }, []);

  const handlePublish = useCallback(
    (flashcardId: string) => {
      const flashcard = flashcards.find((f) => f.id === flashcardId);
      if (flashcard) {
        setStatusActionFlashcard(flashcard);
        setStatusAction("Publish");
      }
    },
    [flashcards]
  );

  const handleArchive = useCallback(
    (flashcardId: string) => {
      const flashcard = flashcards.find((f) => f.id === flashcardId);
      if (flashcard) {
        setStatusActionFlashcard(flashcard);
        setStatusAction("Archive");
      }
    },
    [flashcards]
  );

  const handleClone = useCallback((flashcard: AdminFlashcardSummary) => {
    setStatusActionFlashcard(flashcard);
    setStatusAction("CloneFromPublished");
  }, []);

  const handleConfirmStatusAction = useCallback(async () => {
    if (!statusActionFlashcard || !statusAction) return;
    try {
      await updateStatusMutation.mutateAsync({ id: statusActionFlashcard.id, input: { action: statusAction } });
      setStatusActionFlashcard(null);
      setStatusAction(null);
    } catch {
      // Toast handled by mutation
    }
  }, [statusActionFlashcard, statusAction, updateStatusMutation]);

  const handleConfirmDelete = useCallback(async () => {
    if (!isDeletingFlashcard) return;
    try {
      await deleteMutation.mutateAsync(isDeletingFlashcard.id);
      setIsDeletingFlashcard(null);
    } catch {
      // Toast handled by mutation
    }
  }, [deleteMutation, isDeletingFlashcard]);

  const handleFormSuccess = useCallback(() => {
    setIsFormOpen(false);
    setEditingFlashcard(null);
  }, []);

  const handleSortChange = useCallback(
    (sort: string) => {
      setFilters({ sort });
    },
    [setFilters]
  );

  const sortOptions = [
    { label: "Newest First", value: "-createdAt" },
    { label: "Oldest First", value: "createdAt" },
    { label: "Alphabetical (A-Z)", value: "word" },
    { label: "Alphabetical (Z-A)", value: "-word" },
  ];

  return {
    flashcards,
    total,
    stats: statsData,
    filterStore: { status, tag, q, page, pageSize, sort },
    isLoading: isListLoading || isStatsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFormOpen,
    editingFlashcard,
    isDeletingFlashcard,
    statusActionFlashcard,
    statusAction,
    isActionLoading:
      createMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending ||
      updateStatusMutation.isPending,
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
  };
};
