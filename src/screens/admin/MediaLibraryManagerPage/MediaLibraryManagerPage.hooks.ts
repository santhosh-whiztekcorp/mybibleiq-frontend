import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { SortingState } from "@tanstack/react-table";
import {
  useAdminMediaFilterStore,
  useAdminMediaList,
  useAdminMediaTypeStats,
  useAdminMediaDetail,
  useCreateAdminMedia,
  useDeleteAdminMedia,
  useUpdateAdminMediaStatus,
} from "@/resources/admin-media";
import type {
  AdminMediaSummary,
  MediaStatusAction,
  AdminMediaStatus,
  MediaType,
} from "@/resources/admin-media/admin-media.types";

export const useMediaLibraryManagerPage = () => {
  const { status, type, tags, q, page, pageSize, sort, setFilters } = useAdminMediaFilterStore();

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
  } = useAdminMediaList(filters);
  const { data: typeStatsData } = useAdminMediaTypeStats();

  const media = useMemo(() => listData?.pages.flatMap((page) => page?.items ?? []) ?? [], [listData]);
  const total = useMemo(() => listData?.pages[0]?.total ?? 0, [listData]);

  // Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMediaId, setEditingMediaId] = useState<string | null>(null);
  const { data: editingMedia, isLoading: isEditingMediaLoading } = useAdminMediaDetail(
    editingMediaId || "",
    !!editingMediaId
  );

  // Delete state
  const [isDeletingMedia, setIsDeletingMedia] = useState<AdminMediaSummary | null>(null);

  // Status action state
  const [statusActionMedia, setStatusActionMedia] = useState<AdminMediaSummary | null>(null);
  const [statusAction, setStatusAction] = useState<MediaStatusAction | null>(null);

  // Preview state
  const [previewMedia, setPreviewMedia] = useState<AdminMediaSummary | null>(null);

  // Mutations
  const createMutation = useCreateAdminMedia();
  const updateStatusMutation = useUpdateAdminMediaStatus();
  const deleteMutation = useDeleteAdminMedia();

  // Handlers
  const handleSearchChange = useCallback(
    (value: string) => {
      setFilters({ q: value });
    },
    [setFilters]
  );

  const handleStatusFilterChange = useCallback(
    (value: string | undefined) => {
      setFilters({ status: value as AdminMediaStatus });
    },
    [setFilters]
  );

  const handleTypeFilterChange = useCallback(
    (value: string | undefined) => {
      setFilters({ type: value as MediaType });
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

  const handleDataTableSortChange = useCallback(
    (sorting: SortingState) => {
      if (sorting.length > 0) {
        const { id, desc } = sorting[0];
        setFilters({ sort: desc ? `-${id}` : id });
      } else {
        setFilters({ sort: "-createdAt" }); // Default sort
      }
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
    setEditingMediaId(null);
    setIsFormOpen(true);
  }, []);

  const handleEdit = useCallback((media: AdminMediaSummary) => {
    setEditingMediaId(media.id);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback((media: AdminMediaSummary) => {
    setIsDeletingMedia(media);
  }, []);

  const handlePublish = useCallback((media: AdminMediaSummary) => {
    setStatusActionMedia(media);
    setStatusAction("Publish");
  }, []);

  const handleArchive = useCallback((media: AdminMediaSummary) => {
    setStatusActionMedia(media);
    setStatusAction("Archive");
  }, []);

  const handleClone = useCallback((media: AdminMediaSummary) => {
    setStatusActionMedia(media);
    setStatusAction("Clone");
  }, []);

  const handleConfirmStatusAction = useCallback(async () => {
    if (!statusActionMedia || !statusAction) return;

    try {
      await updateStatusMutation.mutateAsync({
        id: statusActionMedia.id,
        input: { action: statusAction },
      });
      setStatusActionMedia(null);
      setStatusAction(null);
    } catch {
      // Error handled by mutation
    }
  }, [statusActionMedia, statusAction, updateStatusMutation]);

  const handleConfirmDelete = useCallback(async () => {
    if (!isDeletingMedia) return;

    try {
      await deleteMutation.mutateAsync(isDeletingMedia.id);
      setIsDeletingMedia(null);
    } catch {
      // Error handled by mutation
    }
  }, [isDeletingMedia, deleteMutation]);

  const handleFormSuccess = useCallback(() => {
    setIsFormOpen(false);
    setEditingMediaId(null);
  }, []);

  const handlePreview = useCallback((media: AdminMediaSummary) => {
    setPreviewMedia(media);
  }, []);

  return {
    media,
    total,
    stats: typeStatsData,
    filterStore: { status, type, tags, q, page, pageSize, sort },
    isLoading: isListLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFormOpen,
    editingMedia,
    isDeletingMedia,
    statusActionMedia,
    statusAction,
    previewMedia,
    isActionLoading: createMutation.isPending || updateStatusMutation.isPending || deleteMutation.isPending,
    handleSearchChange,
    handleStatusFilterChange,
    handleTypeFilterChange,
    handlePaginationChange,
    handleSortChange,
    handleDataTableSortChange,
    sortOptions,
    handleCreate,
    handleEdit,
    handleDelete,
    handlePublish,
    handleArchive,
    handleClone,
    handleConfirmStatusAction,
    setStatusActionMedia,
    setStatusAction,
    setIsDeletingMedia,
    handleConfirmDelete,
    handleFormSuccess,
    setIsFormOpen,
    handlePreview,
    setPreviewMedia,
    isEditingMediaLoading,
  };
};
