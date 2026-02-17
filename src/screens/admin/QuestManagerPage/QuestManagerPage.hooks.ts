import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useAdminQuestFilterStore,
  useAdminQuestList,
  useAdminQuestStatusStats,
  useAdminQuestDetail,
  useAdminQuestStageList,
  useDeleteAdminQuest,
  useUpdateAdminQuestStatus,
  useDeleteAdminQuestStage,
} from "@/resources/admin-quest";
import type {
  AdminQuestSummary,
  QuestStatusAction,
  AdminQuestStatus,
  AdminQuestListInput,
} from "@/resources/admin-quest/admin-quest.types";

export const useQuestManagerPage = () => {
  const { status, tag, q, page, pageSize, sort, setFilters } = useAdminQuestFilterStore();

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
  } = useAdminQuestList(filters);
  const { data: statusStats, isLoading: isStatusStatsLoading } = useAdminQuestStatusStats();

  const quests = useMemo(() => listData?.pages.flatMap((page) => page?.items ?? []) ?? [], [listData]);
  const total = useMemo(() => listData?.pages[0]?.total ?? 0, [listData]);

  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingQuestId, setEditingQuestId] = useState<string | null>(null);
  const { data: editingQuest, isLoading: isEditingQuestLoading } = useAdminQuestDetail(
    editingQuestId || "",
    !!editingQuestId
  );

  // Stage listing state - store the quest when opening so we have status immediately
  const [isStageListingVisible, setIsStageListingVisible] = useState(false);
  const [stageListingQuest, setStageListingQuest] = useState<AdminQuestSummary | null>(null);
  const stageListingQuestId = stageListingQuest?.id ?? null;

  // Stage form state
  const [isStageFormVisible, setIsStageFormVisible] = useState(false);
  const [editingStageId, setEditingStageId] = useState<string | null>(null);

  // Stage list for the quest we're managing
  const { data: stageListData } = useAdminQuestStageList(
    stageListingQuestId || "",
    { page: 1, pageSize: 100, sort: "order" },
    !!stageListingQuestId
  );
  const stages = useMemo(() => {
    const items = stageListData?.items ?? [];
    return [...items].sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  }, [stageListData]);

  // Delete state
  const [isDeletingQuest, setIsDeletingQuest] = useState<AdminQuestSummary | null>(null);

  // Status action state
  const [statusActionQuest, setStatusActionQuest] = useState<AdminQuestSummary | null>(null);
  const [statusAction, setStatusAction] = useState<QuestStatusAction | null>(null);

  // Schedule action state
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [schedulingQuest, setSchedulingQuest] = useState<AdminQuestSummary | null>(null);

  // Mutations
  const updateStatusMutation = useUpdateAdminQuestStatus();
  const deleteMutation = useDeleteAdminQuest();
  const deleteStageMutation = useDeleteAdminQuestStage();

  // Handlers
  const handleSearchChange = useCallback(
    (value: string) => {
      setFilters({ q: value });
    },
    [setFilters]
  );

  const handleStatusFilterChange = useCallback(
    (value: string | undefined) => {
      setFilters({ status: value as AdminQuestStatus });
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
    (value: AdminQuestListInput["sort"]) => {
      setFilters({ sort: value });
    },
    [setFilters]
  );

  const sortOptions = useMemo(
    () => [
      { label: "Newest First", value: "-createdAt" as const },
      { label: "Oldest First", value: "createdAt" as const },
      { label: "Title (A-Z)", value: "title" as const },
      { label: "Title (Z-A)", value: "-title" as const },
    ],
    []
  );

  const handleCreate = useCallback(() => {
    setEditingQuestId(null);
    setIsFormOpen(true);
  }, []);

  const handleEdit = useCallback((quest: AdminQuestSummary) => {
    setEditingQuestId(quest.id);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback((quest: AdminQuestSummary) => {
    setIsDeletingQuest(quest);
  }, []);

  const handlePublish = useCallback((quest: AdminQuestSummary) => {
    setStatusActionQuest(quest);
    setStatusAction("Publish");
  }, []);

  const handleArchive = useCallback((quest: AdminQuestSummary) => {
    setStatusActionQuest(quest);
    setStatusAction("Archive");
  }, []);

  const handleClone = useCallback((quest: AdminQuestSummary) => {
    setStatusActionQuest(quest);
    setStatusAction("Clone");
  }, []);

  const handleSchedule = useCallback((quest: AdminQuestSummary) => {
    setSchedulingQuest(quest);
    setIsScheduleModalOpen(true);
  }, []);

  const handleManageStages = useCallback((quest: AdminQuestSummary) => {
    setStageListingQuest(quest);
    setIsStageListingVisible(true);
  }, []);

  const handleCloseStageListing = useCallback(() => {
    setIsStageListingVisible(false);
    setStageListingQuest(null);
  }, []);

  const handleAddStage = useCallback(() => {
    setEditingStageId(null);
    setIsStageFormVisible(true);
  }, []);

  const handleEditStage = useCallback((stageId: string) => {
    setEditingStageId(stageId);
    setIsStageFormVisible(true);
  }, []);

  const handleCloseStageForm = useCallback(() => {
    setIsStageFormVisible(false);
    setEditingStageId(null);
  }, []);

  const handleDeleteStage = useCallback(
    async (stageId: string) => {
      if (!stageListingQuestId) return;
      try {
        await deleteStageMutation.mutateAsync({ questId: stageListingQuestId, stageId });
      } catch {
        // Error handled by mutation
      }
    },
    [stageListingQuestId, deleteStageMutation]
  );

  const handleConfirmStatusAction = useCallback(async () => {
    if (!statusActionQuest || !statusAction) return;

    try {
      await updateStatusMutation.mutateAsync({
        id: statusActionQuest.id,
        input: { action: statusAction },
      });
      setStatusActionQuest(null);
      setStatusAction(null);
    } catch {
      // Error handled by mutation
    }
  }, [statusActionQuest, statusAction, updateStatusMutation]);

  const handleConfirmDelete = useCallback(async () => {
    if (!isDeletingQuest) return;

    try {
      await deleteMutation.mutateAsync(isDeletingQuest.id);
      setIsDeletingQuest(null);
    } catch {
      // Error handled by mutation
    }
  }, [isDeletingQuest, deleteMutation]);

  const handleScheduleConfirm = useCallback(
    async (publishAt: string) => {
      if (!schedulingQuest) return;

      try {
        await updateStatusMutation.mutateAsync({
          id: schedulingQuest.id,
          input: { action: "Schedule", publishAt },
        });
        setIsScheduleModalOpen(false);
        setSchedulingQuest(null);
      } catch {
        // Error handled by mutation
      }
    },
    [schedulingQuest, updateStatusMutation]
  );

  const handleFormSuccess = useCallback(() => {
    setIsFormOpen(false);
    setEditingQuestId(null);
  }, []);

  const handleStageFormSuccess = useCallback(() => {
    setIsStageFormVisible(false);
    setEditingStageId(null);
  }, []);

  return {
    quests,
    total,
    statusStats,
    isStatusStatsLoading,
    filterStore: { status, tag, q, page, pageSize, sort },
    isLoading: isListLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
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
    isActionLoading: updateStatusMutation.isPending || deleteMutation.isPending,
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
  };
};
