import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useAdminTagCategories,
  useAdminTagFilterStore,
  useAdminTagList,
  useAdminTagStats,
  useCreateAdminTag,
  useDeleteAdminTag,
  useUpdateAdminTag,
  useExportAdminTags,
} from "@/resources/admin-tag";
import type { AdminTagSummary } from "@/resources/admin-tag/admin-tag.types";
import { toast } from "sonner";

export const useTagManagerPage = () => {
  const { categoryId, q, page, pageSize, sort, setFilters } = useAdminTagFilterStore();

  const debouncedQ = useDebounce(q ?? "", 500);

  const filters = useMemo(
    () => ({
      categoryId,
      q: debouncedQ || undefined,
      pageSize,
      sort,
    }),
    [categoryId, debouncedQ, pageSize, sort]
  );

  const {
    data: listData,
    isLoading: isListLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAdminTagList(filters);

  const tags = useMemo(() => listData?.pages.flatMap((page) => page?.items ?? []) ?? [], [listData]);
  const total = useMemo(() => listData?.pages[0]?.total ?? 0, [listData]);

  const { data: stats, isLoading: isStatsLoading } = useAdminTagStats();
  const { data: categories, isLoading: isCategoriesLoading } = useAdminTagCategories();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<AdminTagSummary | null>(null);
  const [isDeletingTag, setIsDeletingTag] = useState<AdminTagSummary | null>(null);

  const createMutation = useCreateAdminTag();
  const updateMutation = useUpdateAdminTag();
  const deleteMutation = useDeleteAdminTag();
  const exportMutation = useExportAdminTags();

  const handleSearchChange = useCallback(
    (value: string) => {
      setFilters({ q: value });
    },
    [setFilters]
  );

  const handleFilterChange = useCallback(
    (categoryId?: string) => {
      setFilters({ categoryId });
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
    setEditingTag(null);
    setIsFormOpen(true);
  }, []);

  const handleEdit = useCallback((tag: AdminTagSummary) => {
    setEditingTag(tag);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback((tag: AdminTagSummary) => {
    setIsDeletingTag(tag);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!isDeletingTag) return;
    try {
      await deleteMutation.mutateAsync(isDeletingTag.id);
      setIsDeletingTag(null);
    } catch {
      // Toast handled by mutation
    }
  }, [deleteMutation, isDeletingTag]);

  const handleExport = useCallback(async () => {
    try {
      const csv = await exportMutation.mutateAsync("csv");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("hidden", "");
      a.setAttribute("href", url);
      a.setAttribute("download", `tags_export_${new Date().toISOString()}.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success("Tags exported successfully");
    } catch {
      toast.error("Failed to export tags");
    }
  }, [exportMutation]);

  const handleFormSuccess = useCallback(() => {
    setIsFormOpen(false);
    setEditingTag(null);
  }, []);

  const handleSortChange = useCallback(
    (sort: string) => {
      setFilters({ sort });
    },
    [setFilters]
  );

  const sortOptions = [
    { label: "Most Popular", value: "-usageCount" },
    { label: "Least Popular", value: "usageCount" },
    { label: "Newest First", value: "-createdAt" },
    { label: "Oldest First", value: "createdAt" },
    { label: "Name (A-Z)", value: "name" },
    { label: "Name (Z-A)", value: "-name" },
  ];

  return {
    tags,
    total,
    stats,
    categories,
    filterStore: { categoryId, q, page, pageSize, sort },
    isLoading: isListLoading || isStatsLoading || isCategoriesLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFormOpen,
    editingTag,
    isDeletingTag,
    isActionLoading: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
    isExporting: exportMutation.isPending,
    handleSearchChange,
    handleFilterChange,
    handlePaginationChange,
    handleSortChange,
    sortOptions,
    handleCreate,
    handleEdit,
    handleDelete,
    setIsDeletingTag,
    handleConfirmDelete,
    handleExport,
    handleFormSuccess,
    setIsFormOpen,
  };
};
