import { useCallback, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useAdminFlashcardGroupFilterStore,
  useAdminFlashcardGroupList,
  useAdminFlashcardGroupStatusStats,
  useCreateAdminFlashcardGroup,
  useDeleteAdminFlashcardGroup,
  useUpdateAdminFlashcardGroup,
  useUpdateAdminFlashcardGroupStatus,
} from "@/resources/admin-flashcard-group";
import type {
  AdminFlashcardGroupSummary,
  FlashcardGroupStatusAction,
} from "@/resources/admin-flashcard-group/admin-flashcard-group.types";

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

export const useFlashcardGroupManagerPage = () => {
  const { status, tag, q, page, pageSize, sort, setFilters } = useAdminFlashcardGroupFilterStore();

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

  const { data: listData, isLoading: isListLoading } = useAdminFlashcardGroupList(filters);

  const groups = useMemo(() => listData?.pages.flatMap((page) => page?.items ?? []) ?? [], [listData]);
  const total = useMemo(() => listData?.pages[0]?.total ?? 0, [listData]);

  const { data: statsData, isLoading: isStatsLoading } = useAdminFlashcardGroupStatusStats();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<AdminFlashcardGroupSummary | null>(null);
  const [isDeletingGroup, setIsDeletingGroup] = useState<AdminFlashcardGroupSummary | null>(null);
  const [statusActionGroup, setStatusActionGroup] = useState<AdminFlashcardGroupSummary | null>(null);
  const [statusAction, setStatusAction] = useState<FlashcardGroupStatusAction | null>(null);

  const createMutation = useCreateAdminFlashcardGroup();
  const updateMutation = useUpdateAdminFlashcardGroup();
  const deleteMutation = useDeleteAdminFlashcardGroup();
  const updateStatusMutation = useUpdateAdminFlashcardGroupStatus();

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
    setEditingGroup(null);
    setIsFormOpen(true);
  }, []);

  const handleEdit = useCallback((group: AdminFlashcardGroupSummary) => {
    setEditingGroup(group);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback((group: AdminFlashcardGroupSummary) => {
    setIsDeletingGroup(group);
  }, []);

  const handlePublish = useCallback(
    (groupId: string) => {
      const group = groups.find((g) => g.id === groupId);
      if (group) {
        setStatusActionGroup(group);
        setStatusAction("Publish");
      }
    },
    [groups]
  );

  const handleArchive = useCallback(
    (groupId: string) => {
      const group = groups.find((g) => g.id === groupId);
      if (group) {
        setStatusActionGroup(group);
        setStatusAction("Archive");
      }
    },
    [groups]
  );

  const handleClone = useCallback((group: AdminFlashcardGroupSummary) => {
    setStatusActionGroup(group);
    setStatusAction("CloneFromPublished");
  }, []);

  const handleConfirmStatusAction = useCallback(async () => {
    if (!statusActionGroup || !statusAction) return;
    try {
      await updateStatusMutation.mutateAsync({ id: statusActionGroup.id, input: { action: statusAction } });
      setStatusActionGroup(null);
      setStatusAction(null);
    } catch {
      // Toast handled by mutation
    }
  }, [statusActionGroup, statusAction, updateStatusMutation]);

  const handleConfirmDelete = useCallback(async () => {
    if (!isDeletingGroup) return;
    try {
      await deleteMutation.mutateAsync(isDeletingGroup.id);
      setIsDeletingGroup(null);
    } catch {
      // Toast handled by mutation
    }
  }, [deleteMutation, isDeletingGroup]);

  const handleFormSuccess = useCallback(() => {
    setIsFormOpen(false);
    setEditingGroup(null);
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
    { label: "Alphabetical (A-Z)", value: "name" },
    { label: "Alphabetical (Z-A)", value: "-name" },
  ];

  return {
    groups,
    total,
    stats: statsData,
    filterStore: { status, tag, q, page, pageSize, sort },
    isLoading: isListLoading || isStatsLoading,
    isFormOpen,
    editingGroup,
    isDeletingGroup,
    statusActionGroup,
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
    setStatusActionGroup,
    setStatusAction,
    setIsDeletingGroup,
    handleConfirmDelete,
    handleFormSuccess,
    setIsFormOpen,
  };
};
