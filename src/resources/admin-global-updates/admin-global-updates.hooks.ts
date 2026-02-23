import { zodResolver } from "@hookform/resolvers/zod";
import { useInfiniteQuery, useMutation, useQuery, InfiniteData } from "@tanstack/react-query";
import { create } from "zustand";
import { useForm } from "react-hook-form";
import Toast from "@/lib/toast";
import { queryClient } from "@/config/queryClient";
import { getErrorMessage } from "@/utils/error";
import {
  createGlobalUpdate,
  deleteGlobalUpdate,
  getGlobalUpdateDetail,
  getGlobalUpdateList,
  getGlobalUpdateStats,
  updateGlobalUpdate,
  deliverGlobalUpdate,
} from "./admin-global-updates.api";
import { adminGlobalUpdatesQueryKeys } from "./admin-global-updates.constants";
import { defaultGlobalUpdateFilters, defaultCreateGlobalUpdateFormValues } from "./admin-global-updates.data";
import { CreateGlobalUpdateRequestSchema, UpdateGlobalUpdateRequestSchema } from "./admin-global-updates.schemas";
import type {
  CreateGlobalUpdateInput,
  UpdateGlobalUpdateInput,
  GlobalUpdateListInput,
  GlobalUpdateFilterStore,
  GlobalUpdateListResponse,
  GlobalUpdateDetail,
} from "./admin-global-updates.types";

/* ---- Form Hooks ---- */
export const useCreateGlobalUpdateForm = () =>
  useForm<CreateGlobalUpdateInput>({
    resolver: zodResolver(CreateGlobalUpdateRequestSchema),
    defaultValues: defaultCreateGlobalUpdateFormValues,
    mode: "onChange",
  });

export const useUpdateGlobalUpdateForm = (initialValues?: CreateGlobalUpdateInput) =>
  useForm<UpdateGlobalUpdateInput>({
    resolver: zodResolver(UpdateGlobalUpdateRequestSchema),
    defaultValues: initialValues ?? defaultCreateGlobalUpdateFormValues,
    mode: "onChange",
  });

/* ---- Mutation Hooks ---- */
export const useCreateGlobalUpdate = () =>
  useMutation({
    mutationFn: (input: CreateGlobalUpdateInput) => createGlobalUpdate(input),
    onSuccess: (data) => {
      /* ---- Prepend new item to first page of all list variants ---- */
      queryClient.setQueriesData<InfiniteData<GlobalUpdateListResponse>>(
        { queryKey: adminGlobalUpdatesQueryKeys.lists() },
        (oldData) => {
          if (!oldData) return oldData;
          const newItem = data;
          return {
            ...oldData,
            pages: oldData.pages.map((page, i) =>
              i === 0 ? { ...page, items: [newItem, ...page.items], total: page.total + 1 } : page
            ),
          };
        }
      );
      queryClient.invalidateQueries({ queryKey: adminGlobalUpdatesQueryKeys.stats() });
      Toast.show({
        type: "success",
        text1: "Global update created successfully",
        text2: "The global update has been created",
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to create global update",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useUpdateGlobalUpdate = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateGlobalUpdateInput }) => updateGlobalUpdate(id, input),
    onSuccess: (data, { id }) => {
      /* ---- Update item in all list pages ---- */
      queryClient.setQueriesData<InfiniteData<GlobalUpdateListResponse>>(
        { queryKey: adminGlobalUpdatesQueryKeys.lists() },
        (oldData) => {
          if (!oldData) return oldData;
          const updated = data;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              items: page.items.map((item) => (item.id === id ? { ...item, ...updated } : item)),
            })),
          };
        }
      );
      /* ---- Update detail cache ---- */
      queryClient.setQueryData<GlobalUpdateDetail>(adminGlobalUpdatesQueryKeys.detail(id), data);
      Toast.show({
        type: "success",
        text1: "Global update updated successfully",
        text2: "The global update has been updated",
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to update global update",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useDeleteGlobalUpdate = () =>
  useMutation({
    mutationFn: (id: string) => deleteGlobalUpdate(id),
    onSuccess: (_, id) => {
      /* ---- Remove item from all list pages ---- */
      queryClient.setQueriesData<InfiniteData<GlobalUpdateListResponse>>(
        { queryKey: adminGlobalUpdatesQueryKeys.lists() },
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
      queryClient.removeQueries({ queryKey: adminGlobalUpdatesQueryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: adminGlobalUpdatesQueryKeys.stats() });
      Toast.show({
        type: "success",
        text1: "Global update deleted successfully",
        text2: "The global update has been deleted",
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to delete global update",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useDeliverGlobalUpdate = () =>
  useMutation({
    mutationFn: (id: string) => deliverGlobalUpdate(id),
    onSuccess: (data, variables) => {
      /* ---- Update Lists ---- */
      queryClient.setQueriesData<InfiniteData<GlobalUpdateListResponse>>(
        { queryKey: adminGlobalUpdatesQueryKeys.lists() },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              items: page.items.map((item) =>
                item.id === variables ? { ...item, status: "Delivered", deliveredAt: new Date().toISOString() } : item
              ),
            })),
          };
        }
      );

      /* ---- Update Detail ---- */
      queryClient.setQueryData<GlobalUpdateDetail>(adminGlobalUpdatesQueryKeys.detail(variables), (oldData) => {
        if (!oldData) return oldData;
        return { ...oldData, status: "Delivered", deliveredAt: new Date().toISOString() };
      });

      /* ---- Invalidate Stats ---- */
      queryClient.invalidateQueries({ queryKey: adminGlobalUpdatesQueryKeys.stats() });

      Toast.show({
        type: "success",
        text1: "Global update delivered successfully",
        text2: `Sent to ${data.targetUserCount} users in ${data.totalBatches} batches`,
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to deliver global update",
        text2: errorMessage || "Please try again later",
      });
    },
  });

/* ---- Query Hooks ---- */
export const useGlobalUpdateList = (filters: Omit<GlobalUpdateListInput, "page">) =>
  useInfiniteQuery({
    queryKey: adminGlobalUpdatesQueryKeys.list({ ...filters, page: 1, pageSize: filters.pageSize ?? 20 }),
    queryFn: ({ pageParam = 1 }) =>
      getGlobalUpdateList({
        ...filters,
        page: pageParam,
        pageSize: filters.pageSize ?? 20,
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

export const useGlobalUpdateDetail = (id: string, enabled = true) =>
  useQuery({
    queryKey: adminGlobalUpdatesQueryKeys.detail(id),
    queryFn: () => getGlobalUpdateDetail(id),
    enabled: enabled && !!id,
  });

export const useGlobalUpdateStats = () =>
  useQuery({
    queryKey: adminGlobalUpdatesQueryKeys.stats(),
    queryFn: () => getGlobalUpdateStats(),
  });

/* ---- Filter Store ---- */
export const useGlobalUpdateFilterStore = create<GlobalUpdateFilterStore>((set) => ({
  /* ---- State ---- */
  ...defaultGlobalUpdateFilters,

  /* ---- Actions ---- */
  setFilters: (filters) => {
    set((state) => {
      const updates: Partial<GlobalUpdateFilterStore> = {};
      const filterKeys = Object.keys(filters);
      const filterFields = ["type", "status", "search"] as const;
      const hasFilterChanges = filterKeys.some((key) => filterFields.includes(key as (typeof filterFields)[number]));

      if (hasFilterChanges && !("page" in filters)) {
        updates.page = 1;
      }

      Object.entries(filters).forEach(([key, value]) => {
        const filterKey = key as keyof GlobalUpdateFilterStore;
        if (value === null || (Array.isArray(value) && value.length === 0)) {
          updates[filterKey] = undefined as never;
        } else {
          updates[filterKey] = value as never;
        }
      });
      return { ...state, ...updates };
    });
  },

  resetFilters: () => {
    set(defaultGlobalUpdateFilters);
  },
}));
