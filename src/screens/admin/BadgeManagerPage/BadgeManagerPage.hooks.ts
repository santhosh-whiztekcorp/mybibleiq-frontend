import { useState } from "react";
import {
  useAdminBadgeList,
  useAdminBadgeFilterStore,
  useAdminBadgeStatusStats,
  AdminBadgeSummary,
  BadgeStatusAction,
} from "@/resources/admin-badge";
import Toast from "@/lib/toast";

export const useBadgeManagerPage = () => {
  // Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingBadge, setEditingBadge] = useState<AdminBadgeSummary | undefined>(undefined);
  const [deletingBadge, setDeletingBadge] = useState<AdminBadgeSummary | undefined>(undefined);
  const [actionBadge, setActionBadge] = useState<{ id: string; action: BadgeStatusAction } | null>(null);

  // Data Fetching
  const filters = useAdminBadgeFilterStore();
  const { data: badgeData, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useAdminBadgeList(filters);
  const { data: stats, isLoading: isStatsLoading } = useAdminBadgeStatusStats();

  const handleCreate = () => {
    setEditingBadge(undefined);
    setIsCreateModalOpen(true);
  };

  const handleEdit = (badge: AdminBadgeSummary) => {
    setEditingBadge(badge);
    setIsCreateModalOpen(true);
  };

  const handleDelete = (badge: AdminBadgeSummary) => {
    setDeletingBadge(badge);
  };

  const handlePublish = (id: string) => {
    setActionBadge({ id, action: "Publish" });
  };

  const handleArchive = (id: string) => {
    setActionBadge({ id, action: "Archive" });
  };

  const handleClone = async () => {
    Toast.show({ type: "info", text1: "Cloning feature coming soon", text2: "Please recreate manually for now." });
  };

  const handleSearch = (value: string) => {
    filters.setFilters({ q: value });
  };

  const handlePaginationChange = (pagination: { pageIndex: number; pageSize: number }) => {
    filters.setFilters({ page: pagination.pageIndex + 1, pageSize: pagination.pageSize });
  };

  const allBadges = badgeData?.pages.flatMap((page) => page.items) || [];
  const totalBadges = badgeData?.pages[0]?.total || 0;

  return {
    badges: allBadges,
    totalBadges,
    isLoading,
    stats,
    isStatsLoading,
    filters,

    // Modal Interaction
    isCreateModalOpen,
    setIsCreateModalOpen,
    handleCreate,
    handleEdit,

    editingBadge,
    setEditingBadge,

    deletingBadge,
    setDeletingBadge,

    actionBadge,
    setActionBadge,

    handleDelete,
    handlePublish,
    handleArchive,
    handleClone,

    // Search/Pagination
    handleSearch,
    handlePaginationChange,

    // Infinite Scroll (for mobile mostly)
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
