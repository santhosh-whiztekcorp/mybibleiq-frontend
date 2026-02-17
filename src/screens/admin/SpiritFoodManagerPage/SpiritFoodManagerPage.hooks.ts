import { useState, useMemo, useCallback, useEffect } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useAuthStore } from "@/resources/auth/auth.hooks";
import {
  useAdminSpiritFoodList,
  useAdminSpiritFoodFilterStore,
  useSubmitAdminSpiritFood,
  useApproveAdminSpiritFood,
  useCancelAdminSpiritFood,
  useRequestDeleteAdminSpiritFood,
  useApproveDeleteAdminSpiritFood,
  useCancelDeleteAdminSpiritFood,
} from "@/resources/admin-spirit-food";
import type { AdminSpiritFoodSummary } from "@/resources/admin-spirit-food";
import type { ReviewAction } from "./SpiritFoodManagerPage.types";

export const useSpiritFoodManagerPage = () => {
  const filterStore = useAdminSpiritFoodFilterStore();
  const currentUser = useAuthStore((state) => state.user);
  const currentUserId = currentUser?.id || null;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminSpiritFoodSummary | null>(null);
  const [reviewingItem, setReviewingItem] = useState<AdminSpiritFoodSummary | null>(null);
  const [reviewAction, setReviewAction] = useState<ReviewAction>("approve");

  const submitMutation = useSubmitAdminSpiritFood();
  const approveMutation = useApproveAdminSpiritFood();
  const cancelMutation = useCancelAdminSpiritFood();
  const requestDeleteMutation = useRequestDeleteAdminSpiritFood();
  const approveDeleteMutation = useApproveDeleteAdminSpiritFood();
  const cancelDeleteMutation = useCancelDeleteAdminSpiritFood();

  const isReviewLoading =
    submitMutation.isPending ||
    approveMutation.isPending ||
    cancelMutation.isPending ||
    requestDeleteMutation.isPending ||
    approveDeleteMutation.isPending ||
    cancelDeleteMutation.isPending;

  /* ---- Debounced Search ---- */
  const debouncedQ = useDebounce(filterStore.q ?? "", 500);

  /* ---- Memoized Filters ---- */
  const filters = useMemo(
    () => ({
      status: filterStore.status,
      q: debouncedQ || undefined,
      pageSize: filterStore.pageSize,
      sort: filterStore.sort,
    }),
    [filterStore.status, debouncedQ, filterStore.pageSize, filterStore.sort]
  );

  /* ---- List Query ---- */
  const {
    data: listData,
    isLoading: isListLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useAdminSpiritFoodList({
    ...filters,
    pageSize: filterStore.pageSize,
  });

  /* ---- Current Page Data (for desktop pagination) ---- */
  const currentPageData = useMemo(() => {
    if (!listData?.pages) return null;
    const currentPage = listData.pages[filterStore.page - 1];
    return currentPage || null;
  }, [listData, filterStore.page]);

  /* ---- All Loaded Items (for mobile infinite scroll) ---- */
  const allLoadedItems = useMemo(() => {
    if (!listData?.pages) return [];
    return listData.pages.flatMap((page) => {
      if ("items" in page && Array.isArray(page.items)) {
        return page.items;
      }
      return [];
    });
  }, [listData]);

  /* ---- Current Page Items (for desktop table) ---- */
  const spiritFoodEntries = useMemo(() => {
    if (!currentPageData) return [];
    if ("items" in currentPageData && Array.isArray(currentPageData.items)) {
      return currentPageData.items;
    }
    return [];
  }, [currentPageData]);

  /* ---- Total Count ---- */
  const total = currentPageData?.total ?? 0;

  /* ---- Pagination State ---- */
  const pagination = useMemo(
    () => ({
      pageIndex: filterStore.page - 1,
      pageSize: filterStore.pageSize,
    }),
    [filterStore.page, filterStore.pageSize]
  );

  /* ---- Fetch pages as needed ---- */
  useEffect(() => {
    if (listData?.pages && filterStore.page > listData.pages.length && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [filterStore.page, listData?.pages, hasNextPage, isFetchingNextPage, fetchNextPage]);

  /* ---- Handlers ---- */
  const handlePaginationChange = useCallback(
    (newPagination: { pageIndex: number; pageSize: number }) => {
      filterStore.setFilters({ page: newPagination.pageIndex + 1, pageSize: newPagination.pageSize });
    },
    [filterStore]
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      filterStore.setFilters({ q: value || undefined });
    },
    [filterStore]
  );

  const handleFilterChange = useCallback(
    (status: typeof filterStore.status) => {
      filterStore.setFilters({ status });
    },
    [filterStore]
  );

  const handleFormSuccess = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleEdit = useCallback((item: AdminSpiritFoodSummary) => {
    setEditingItem(item);
    setIsFormOpen(true);
  }, []);

  const handleSubmit = useCallback((item: AdminSpiritFoodSummary) => {
    setReviewingItem(item);
    setReviewAction("submit");
  }, []);

  const handleApprove = useCallback((item: AdminSpiritFoodSummary) => {
    setReviewingItem(item);
    setReviewAction("approve");
  }, []);

  const handleCancel = useCallback((item: AdminSpiritFoodSummary) => {
    setReviewingItem(item);
    setReviewAction("cancel");
  }, []);

  const handleRequestDelete = useCallback((item: AdminSpiritFoodSummary) => {
    setReviewingItem(item);
    setReviewAction("request-delete");
  }, []);

  const handleApproveDelete = useCallback((item: AdminSpiritFoodSummary) => {
    setReviewingItem(item);
    setReviewAction("approve-delete");
  }, []);

  const handleCancelDelete = useCallback((item: AdminSpiritFoodSummary) => {
    setReviewingItem(item);
    setReviewAction("cancel-delete");
  }, []);

  const handleConfirmReview = useCallback(
    async (comment: string) => {
      if (!reviewingItem) return;

      try {
        switch (reviewAction) {
          case "submit":
            await submitMutation.mutateAsync({ id: reviewingItem.id, input: { comment } });
            break;
          case "approve":
            await approveMutation.mutateAsync({ id: reviewingItem.id, input: { comment } });
            break;
          case "cancel":
            await cancelMutation.mutateAsync({ id: reviewingItem.id, input: { comment } });
            break;
          case "request-delete":
            await requestDeleteMutation.mutateAsync({ id: reviewingItem.id, input: { comment } });
            break;
          case "approve-delete":
            await approveDeleteMutation.mutateAsync({ id: reviewingItem.id, input: { comment } });
            break;
          case "cancel-delete":
            await cancelDeleteMutation.mutateAsync({ id: reviewingItem.id, input: { comment } });
            break;
        }
        setReviewingItem(null);
      } catch {
        // Error handled by mutation hook Toast
      }
    },
    [
      reviewingItem,
      reviewAction,
      submitMutation,
      approveMutation,
      cancelMutation,
      requestDeleteMutation,
      approveDeleteMutation,
      cancelDeleteMutation,
    ]
  );

  const handleCloseReviewModal = useCallback(() => {
    if (isReviewLoading) return;
    setReviewingItem(null);
  }, [isReviewLoading]);

  const handleCreate = useCallback(() => {
    setEditingItem(null);
    setIsFormOpen(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setIsFormOpen(false);
    setEditingItem(null);
  }, []);

  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false);

  const handleBulkUpload = useCallback(() => {
    setIsBulkUploadOpen(true);
  }, []);

  const handleBulkUploadSuccess = useCallback(() => {
    refetch();
    setIsBulkUploadOpen(false);
  }, [refetch]);

  const handleBulkUploadClose = useCallback((open: boolean) => {
    setIsBulkUploadOpen(open);
  }, []);

  return {
    filterStore,
    currentUserId,
    isFormOpen,
    editingItem,
    reviewingItem,
    reviewAction,
    isReviewLoading,
    handleConfirmReview,
    handleCloseReviewModal,
    isListLoading,
    isFetchingNextPage,
    hasNextPage,
    allLoadedItems,
    spiritFoodEntries,
    total,
    pagination,
    isBulkUploadOpen,
    handlePaginationChange,
    handleSearchChange,
    handleFilterChange,
    handleFormSuccess,
    handleEdit,
    handleSubmit,
    handleApprove,
    handleCancel,
    handleRequestDelete,
    handleApproveDelete,
    handleCancelDelete,
    handleCreate,
    handleCloseForm,
    handleBulkUpload,
    handleBulkUploadSuccess,
    handleBulkUploadClose,
    fetchNextPage,
  };
};
