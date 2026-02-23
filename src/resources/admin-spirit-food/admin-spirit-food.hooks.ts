import { zodResolver } from "@hookform/resolvers/zod";
import { useInfiniteQuery, useMutation, useQuery, InfiniteData } from "@tanstack/react-query";
import { create } from "zustand";
import { useForm } from "react-hook-form";
import Toast from "@/lib/toast";
import { queryClient } from "@/config/queryClient";
import { getErrorMessage } from "@/utils/error";
import {
  createAdminSpiritFood,
  updateAdminSpiritFood,
  submitAdminSpiritFood,
  createAndSubmitAdminSpiritFood,
  approveAdminSpiritFood,
  cancelAdminSpiritFood,
  requestDeleteAdminSpiritFood,
  approveDeleteAdminSpiritFood,
  cancelDeleteAdminSpiritFood,
  forceDeleteAdminSpiritFood,
  getAdminSpiritFoodDetail,
  getAdminSpiritFoodList,
  getAdminSpiritFoodStats,
  importPreviewAdminSpiritFood,
  importCommitAdminSpiritFood,
  importReportAdminSpiritFood,
} from "./admin-spirit-food.api";
import { adminSpiritFoodQueryKeys } from "./admin-spirit-food.constants";
import { defaultAdminSpiritFoodFilters, defaultCreateSpiritFoodFormValues } from "./admin-spirit-food.data";
import {
  CreateAdminSpiritFoodRequestSchema,
  UpdateAdminSpiritFoodRequestSchema,
  SubmitAdminSpiritFoodRequestSchema,
  ApproveAdminSpiritFoodRequestSchema,
  CancelAdminSpiritFoodRequestSchema,
  RequestDeleteAdminSpiritFoodRequestSchema,
  ApproveDeleteAdminSpiritFoodRequestSchema,
  CancelDeleteAdminSpiritFoodRequestSchema,
  ForceDeleteAdminSpiritFoodRequestSchema,
} from "./admin-spirit-food.schemas";
import type {
  CreateAdminSpiritFoodInput,
  UpdateAdminSpiritFoodInput,
  SubmitAdminSpiritFoodInput,
  ApproveAdminSpiritFoodInput,
  CancelAdminSpiritFoodInput,
  RequestDeleteAdminSpiritFoodInput,
  ApproveDeleteAdminSpiritFoodInput,
  CancelDeleteAdminSpiritFoodInput,
  ForceDeleteAdminSpiritFoodInput,
  ImportPreviewAdminSpiritFoodInput,
  ImportCommitAdminSpiritFoodInput,
  ImportReportAdminSpiritFoodInput,
  AdminSpiritFoodListInput,
  AdminSpiritFoodFilterStore,
  AdminSpiritFoodListResponse,
  AdminSpiritFoodDetail,
} from "./admin-spirit-food.types";

/* ---- Helper to update a single item in all list pages ---- */
const updateItemInLists = (id: string, updater: (item: AdminSpiritFoodDetail) => AdminSpiritFoodDetail) => {
  queryClient.setQueriesData<InfiniteData<AdminSpiritFoodListResponse>>(
    { queryKey: adminSpiritFoodQueryKeys.lists() },
    (oldData) => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        pages: oldData.pages.map((page) => ({
          ...page,
          items: page.items.map((item) => (item.id === id ? updater(item) : item)),
        })),
      };
    }
  );
};

/* ---- Form Hooks ---- */
export const useCreateAdminSpiritFoodForm = () =>
  useForm<CreateAdminSpiritFoodInput>({
    resolver: zodResolver(CreateAdminSpiritFoodRequestSchema),
    defaultValues: defaultCreateSpiritFoodFormValues,
    mode: "onChange",
  });

export const useUpdateAdminSpiritFoodForm = (initialValues?: CreateAdminSpiritFoodInput) =>
  useForm<UpdateAdminSpiritFoodInput>({
    resolver: zodResolver(UpdateAdminSpiritFoodRequestSchema),
    defaultValues: initialValues ?? defaultCreateSpiritFoodFormValues,
    mode: "onChange",
  });

export const useSubmitAdminSpiritFoodForm = () =>
  useForm<SubmitAdminSpiritFoodInput>({
    resolver: zodResolver(SubmitAdminSpiritFoodRequestSchema),
    mode: "onChange",
  });

export const useApproveAdminSpiritFoodForm = () =>
  useForm<ApproveAdminSpiritFoodInput>({
    resolver: zodResolver(ApproveAdminSpiritFoodRequestSchema),
    mode: "onChange",
  });

export const useCancelAdminSpiritFoodForm = () =>
  useForm<CancelAdminSpiritFoodInput>({
    resolver: zodResolver(CancelAdminSpiritFoodRequestSchema),
    mode: "onChange",
  });

export const useRequestDeleteAdminSpiritFoodForm = () =>
  useForm<RequestDeleteAdminSpiritFoodInput>({
    resolver: zodResolver(RequestDeleteAdminSpiritFoodRequestSchema),
    mode: "onChange",
  });

export const useApproveDeleteAdminSpiritFoodForm = () =>
  useForm<ApproveDeleteAdminSpiritFoodInput>({
    resolver: zodResolver(ApproveDeleteAdminSpiritFoodRequestSchema),
    mode: "onChange",
  });

export const useCancelDeleteAdminSpiritFoodForm = () =>
  useForm<CancelDeleteAdminSpiritFoodInput>({
    resolver: zodResolver(CancelDeleteAdminSpiritFoodRequestSchema),
    mode: "onChange",
  });

export const useForceDeleteAdminSpiritFoodForm = () =>
  useForm<ForceDeleteAdminSpiritFoodInput>({
    resolver: zodResolver(ForceDeleteAdminSpiritFoodRequestSchema),
    mode: "onChange",
  });

/* ---- Mutation Hooks ---- */
export const useCreateAdminSpiritFood = () =>
  useMutation({
    mutationFn: (input: CreateAdminSpiritFoodInput) => createAdminSpiritFood(input),
    onSuccess: (data) => {
      /* ---- Prepend to first page of all list variants ---- */
      queryClient.setQueriesData<InfiniteData<AdminSpiritFoodListResponse>>(
        { queryKey: adminSpiritFoodQueryKeys.lists() },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page, i) =>
              i === 0 ? { ...page, items: [data, ...page.items], total: page.total + 1 } : page
            ),
          };
        }
      );
      queryClient.invalidateQueries({ queryKey: adminSpiritFoodQueryKeys.stats() });
      Toast.show({ type: "success", text1: "Spirit food created successfully" });
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: "Failed to create spirit food", text2: getErrorMessage(error) });
    },
  });

export const useUpdateAdminSpiritFood = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateAdminSpiritFoodInput }) => updateAdminSpiritFood(id, input),
    onSuccess: (data, { id }) => {
      updateItemInLists(id, () => data);
      queryClient.setQueryData<AdminSpiritFoodDetail>(adminSpiritFoodQueryKeys.detail(id), data);
      Toast.show({ type: "success", text1: "Spirit food updated successfully" });
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: "Failed to update spirit food", text2: getErrorMessage(error) });
    },
  });

export const useSubmitAdminSpiritFood = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: SubmitAdminSpiritFoodInput }) => submitAdminSpiritFood(id, input),
    onSuccess: (data, { id }) => {
      updateItemInLists(id, () => data);
      queryClient.setQueryData<AdminSpiritFoodDetail>(adminSpiritFoodQueryKeys.detail(id), data);
      queryClient.invalidateQueries({ queryKey: adminSpiritFoodQueryKeys.stats() });
      Toast.show({ type: "success", text1: "Spirit food submitted for review" });
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: "Failed to submit spirit food", text2: getErrorMessage(error) });
    },
  });

export const useCreateAndSubmitAdminSpiritFood = () =>
  useMutation({
    mutationFn: (input: CreateAdminSpiritFoodInput) => createAndSubmitAdminSpiritFood(input),
    onSuccess: (data) => {
      queryClient.setQueriesData<InfiniteData<AdminSpiritFoodListResponse>>(
        { queryKey: adminSpiritFoodQueryKeys.lists() },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page, i) =>
              i === 0 ? { ...page, items: [data, ...page.items], total: page.total + 1 } : page
            ),
          };
        }
      );
      queryClient.invalidateQueries({ queryKey: adminSpiritFoodQueryKeys.stats() });
      Toast.show({ type: "success", text1: "Spirit food created and submitted for review" });
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: "Failed to create and submit spirit food", text2: getErrorMessage(error) });
    },
  });

export const useApproveAdminSpiritFood = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: ApproveAdminSpiritFoodInput }) =>
      approveAdminSpiritFood(id, input),
    onSuccess: (data, { id }) => {
      updateItemInLists(id, () => data);
      queryClient.setQueryData<AdminSpiritFoodDetail>(adminSpiritFoodQueryKeys.detail(id), data);
      queryClient.invalidateQueries({ queryKey: adminSpiritFoodQueryKeys.stats() });
      Toast.show({ type: "success", text1: "Spirit food approved successfully" });
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: "Failed to approve spirit food", text2: getErrorMessage(error) });
    },
  });

export const useCancelAdminSpiritFood = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: CancelAdminSpiritFoodInput }) => cancelAdminSpiritFood(id, input),
    onSuccess: (data, { id }) => {
      updateItemInLists(id, () => data);
      queryClient.setQueryData<AdminSpiritFoodDetail>(adminSpiritFoodQueryKeys.detail(id), data);
      queryClient.invalidateQueries({ queryKey: adminSpiritFoodQueryKeys.stats() });
      Toast.show({ type: "success", text1: "Spirit food cancelled successfully" });
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: "Failed to cancel spirit food", text2: getErrorMessage(error) });
    },
  });

export const useRequestDeleteAdminSpiritFood = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: RequestDeleteAdminSpiritFoodInput }) =>
      requestDeleteAdminSpiritFood(id, input),
    onSuccess: (data, { id }) => {
      updateItemInLists(id, () => data);
      queryClient.setQueryData<AdminSpiritFoodDetail>(adminSpiritFoodQueryKeys.detail(id), data);
      queryClient.invalidateQueries({ queryKey: adminSpiritFoodQueryKeys.stats() });
      Toast.show({ type: "success", text1: "Delete request submitted successfully" });
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: "Failed to request delete", text2: getErrorMessage(error) });
    },
  });

export const useApproveDeleteAdminSpiritFood = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: ApproveDeleteAdminSpiritFoodInput }) =>
      approveDeleteAdminSpiritFood(id, input),
    onSuccess: (data, { id }) => {
      updateItemInLists(id, () => data);
      queryClient.setQueryData<AdminSpiritFoodDetail>(adminSpiritFoodQueryKeys.detail(id), data);
      queryClient.invalidateQueries({ queryKey: adminSpiritFoodQueryKeys.stats() });
      Toast.show({ type: "success", text1: "Delete request approved successfully" });
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: "Failed to approve delete request", text2: getErrorMessage(error) });
    },
  });

export const useCancelDeleteAdminSpiritFood = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: CancelDeleteAdminSpiritFoodInput }) =>
      cancelDeleteAdminSpiritFood(id, input),
    onSuccess: (data, { id }) => {
      updateItemInLists(id, () => data);
      queryClient.setQueryData<AdminSpiritFoodDetail>(adminSpiritFoodQueryKeys.detail(id), data);
      queryClient.invalidateQueries({ queryKey: adminSpiritFoodQueryKeys.stats() });
      Toast.show({ type: "success", text1: "Delete request cancelled successfully" });
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: "Failed to cancel delete request", text2: getErrorMessage(error) });
    },
  });

export const useForceDeleteAdminSpiritFood = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: ForceDeleteAdminSpiritFoodInput }) =>
      forceDeleteAdminSpiritFood(id, input),
    onSuccess: (_, { id }) => {
      /* ---- Remove item from all list pages ---- */
      queryClient.setQueriesData<InfiniteData<AdminSpiritFoodListResponse>>(
        { queryKey: adminSpiritFoodQueryKeys.lists() },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              items: page.items.filter((item) => item.id !== id),
              total: page.total - 1,
            })),
          };
        }
      );
      queryClient.removeQueries({ queryKey: adminSpiritFoodQueryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: adminSpiritFoodQueryKeys.stats() });
      Toast.show({ type: "success", text1: "Spirit food deleted successfully" });
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: "Failed to delete spirit food", text2: getErrorMessage(error) });
    },
  });

/* ---- Import Mutation Hooks ---- */
export const useUploadAdminSpiritFoodImportPreview = () =>
  useMutation({
    mutationFn: (input: ImportPreviewAdminSpiritFoodInput) => importPreviewAdminSpiritFood(input),
    onSuccess: () => {
      /* ---- Import preview doesn't change existing data ---- */
    },
  });

export const useCommitAdminSpiritFoodImport = () =>
  useMutation({
    mutationFn: (input: ImportCommitAdminSpiritFoodInput) => importCommitAdminSpiritFood(input),
    onSuccess: () => {
      /* ---- Bulk import: invalidate all lists since we can't predict which pages changed ---- */
      queryClient.invalidateQueries({ queryKey: adminSpiritFoodQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: adminSpiritFoodQueryKeys.stats() });
      Toast.show({ type: "success", text1: "Import completed successfully" });
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: "Failed to commit import", text2: getErrorMessage(error) });
    },
  });

export const useImportReportAdminSpiritFood = (input: ImportReportAdminSpiritFoodInput) =>
  useQuery({
    queryKey: adminSpiritFoodQueryKeys.importReport(input.uploadId),
    queryFn: () => importReportAdminSpiritFood(input),
    enabled: !!input.uploadId,
    staleTime: 0,
    gcTime: 0,
  });

/* ---- Query Hooks ---- */
export const useAdminSpiritFoodList = (filters: Omit<AdminSpiritFoodListInput, "page">) =>
  useInfiniteQuery({
    queryKey: adminSpiritFoodQueryKeys.list({ ...filters, page: 1, pageSize: filters.pageSize ?? 20 }),
    queryFn: ({ pageParam = 1 }) =>
      getAdminSpiritFoodList({
        ...filters,
        page: pageParam,
        pageSize: filters.pageSize ?? 20,
        sort: filters.sort ?? "-scheduledDate",
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || typeof lastPage.total === "undefined") {
        return undefined;
      }
      const totalPages = Math.ceil(lastPage.total / (filters.pageSize ?? 20));
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
  });

export const useAdminSpiritFoodDetail = (id: string, enabled = true) =>
  useQuery({
    queryKey: adminSpiritFoodQueryKeys.detail(id),
    queryFn: () => getAdminSpiritFoodDetail(id),
    enabled: enabled && !!id,
  });

export const useAdminSpiritFoodStats = () =>
  useQuery({
    queryKey: adminSpiritFoodQueryKeys.stats(),
    queryFn: () => getAdminSpiritFoodStats(),
  });

/* ---- Filter Store ---- */
export const useAdminSpiritFoodFilterStore = create<AdminSpiritFoodFilterStore>((set) => ({
  /* ---- State ---- */
  ...defaultAdminSpiritFoodFilters,

  /* ---- Actions ---- */
  setFilters: (filters) => {
    set((state) => {
      const updates: Partial<AdminSpiritFoodFilterStore> = {};
      const filterKeys = Object.keys(filters);
      const filterFields = ["status", "q", "scheduledFrom", "scheduledTo", "scheduledOnly"] as const;
      const hasFilterChanges = filterKeys.some((key) => filterFields.includes(key as (typeof filterFields)[number]));

      if (hasFilterChanges && !("page" in filters)) {
        updates.page = 1;
      }

      Object.entries(filters).forEach(([key, value]) => {
        const filterKey = key as keyof AdminSpiritFoodFilterStore;
        if (value === null) {
          updates[filterKey] = undefined as never;
        } else {
          updates[filterKey] = value as never;
        }
      });
      return { ...state, ...updates };
    });
  },

  resetFilters: () => {
    set(defaultAdminSpiritFoodFilters);
  },
}));
