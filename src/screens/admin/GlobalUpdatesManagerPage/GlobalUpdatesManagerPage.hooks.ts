"use client";

import {
  useGlobalUpdateList,
  useGlobalUpdateStats,
  useGlobalUpdateFilterStore,
  useGlobalUpdateDetail,
  useDeleteGlobalUpdate,
  useDeliverGlobalUpdate,
} from "@/resources/admin-global-updates";
import type { GlobalUpdateActionHandlers } from "./GlobalUpdatesManagerPage.types";
import type { ConfirmationAction } from "@/components/admin/admin-shared/AdminConfirmationModal/AdminConfirmationModal.types";
import type {
  GlobalUpdateType,
  GlobalUpdateStatus,
  GlobalUpdateDetail,
} from "@/resources/admin-global-updates/admin-global-updates.types";
import React from "react";

export const useGlobalUpdatesManagerPage = () => {
  const filterStore = useGlobalUpdateFilterStore();

  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<string | undefined>();
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const [selectedUpdate, setSelectedUpdate] = React.useState<GlobalUpdateDetail | null>(null);

  /* ---- Confirmation Modal State ---- */
  const [confirmModal, setConfirmModal] = React.useState<{
    isOpen: boolean;
    action: ConfirmationAction;
    id?: string;
    name?: string;
  }>({
    isOpen: false,
    action: "delete",
  });

  const { mutateAsync: deleteUpdate, isPending: isDeleteLoading } = useDeleteGlobalUpdate();
  const { mutateAsync: deliverUpdate, isPending: isDeliverLoading } = useDeliverGlobalUpdate();

  const { data: detailData } = useGlobalUpdateDetail(selectedId || "", !!selectedId && isPreviewOpen); // Added

  React.useEffect(() => {
    if (detailData) {
      setSelectedUpdate(detailData);
    }
  }, [detailData]);

  const {
    data: listData,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGlobalUpdateList({
    search: filterStore.search,
    type: filterStore.type,
    status: filterStore.status,
    pageSize: filterStore.pageSize,
  });

  const { data: stats, isLoading: isStatsLoading } = useGlobalUpdateStats();

  const globalUpdates = listData?.pages.flatMap((page) => page.items) ?? [];
  const total = listData?.pages[0]?.total ?? 0;

  const handleSearchChange = (value: string) => {
    filterStore.setFilters({ search: value || undefined });
  };

  const handleTypeFilterChange = (type: GlobalUpdateType | undefined) => {
    filterStore.setFilters({ type });
  };

  const handleStatusFilterChange = (status: GlobalUpdateStatus | undefined) => {
    filterStore.setFilters({ status });
  };

  const handlePaginationChange = (page: number, pageSize: number) => {
    filterStore.setFilters({ page: page + 1, pageSize });
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const actionHandlers: GlobalUpdateActionHandlers = {
    handleViewUpdate: (id: string) => {
      // Modified
      setSelectedId(id);
      setIsPreviewOpen(true);
    },
    handleEditUpdate: (id: string) => {
      // Modified
      setIsEdit(true);
      setSelectedId(id);
      setIsFormOpen(true);
    },
    handleDeleteUpdate: (id: string, name?: string) => {
      setConfirmModal({
        isOpen: true,
        action: "delete",
        id,
        name: name || "this update",
      });
    },
    handleDeliverUpdate: (id: string, name?: string) => {
      setConfirmModal({
        isOpen: true,
        action: "deliver",
        id,
        name: name || "this update",
      });
    },
    handleCreateUpdate: () => {
      setSelectedId(undefined);
      setIsEdit(false);
      setIsFormOpen(true);
    },
  };

  return {
    globalUpdates,
    total,
    stats,
    isLoading,
    isStatsLoading,
    hasNextPage,
    isFetchingNextPage,
    filterStore,
    handleSearchChange,
    handleTypeFilterChange,
    handleStatusFilterChange,
    handlePaginationChange,
    handleLoadMore,
    ...actionHandlers,
    isFormOpen,
    setIsFormOpen,
    isEdit,
    selectedId,
    isPreviewOpen,
    selectedUpdate,
    setIsPreviewOpen,
    /* ---- Confirmation Modal ---- */
    confirmModal,
    setConfirmModal,
    isDeleteLoading,
    isDeliverLoading,
    handleConfirmAction: async () => {
      if (!confirmModal.id) return;

      try {
        if (confirmModal.action === "delete") {
          await deleteUpdate(confirmModal.id);
        } else if (confirmModal.action === "deliver") {
          await deliverUpdate(confirmModal.id);
        }
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
      } catch (error) {
        // Error is handled by the mutation hook toasts
        console.error("Action failed:", error);
      }
    },
  };
};
