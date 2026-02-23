import { zodResolver } from "@hookform/resolvers/zod";
import { useInfiniteQuery, useMutation, useQuery, InfiniteData } from "@tanstack/react-query";
import { create } from "zustand";
import { useForm } from "react-hook-form";
import Toast from "@/lib/toast";
import { queryClient } from "@/config/queryClient";
import { getErrorMessage } from "@/utils/error";
import {
  createAdminBadge,
  deleteAdminBadge,
  getAdminBadgeDetail,
  getAdminBadgeList,
  getAdminBadgeStatusStats,
  updateAdminBadge,
  updateAdminBadgeStatus,
} from "./admin-badge.api";
import { adminBadgeQueryKeys } from "./admin-badge.constants";
import { defaultAdminBadgeFilters, defaultCreateBadgeFormValues } from "./admin-badge.data";
import {
  CreateAdminBadgeRequestSchema,
  UpdateAdminBadgeRequestSchema,
  UpdateAdminBadgeStatusResetScheam,
} from "./admin-badge.schemas";
import type {
  CreateAdminBadgeInput,
  UpdateAdminBadgeInput,
  UpdateAdminBadgeStatusInput,
  AdminBadgeListInput,
  AdminBadgeFilterStore,
  AdminBadgeListResponse,
  AdminBadgeSummary,
  AdminBadgeDetail,
} from "./admin-badge.types";

/* ---- Form Hooks ---- */
export const useCreateAdminBadgeForm = () =>
  useForm<CreateAdminBadgeInput>({
    resolver: zodResolver(CreateAdminBadgeRequestSchema),
    defaultValues: defaultCreateBadgeFormValues,
    mode: "onChange",
  });

export const useUpdateAdminBadgeForm = (initialValues?: CreateAdminBadgeInput) =>
  useForm<UpdateAdminBadgeInput>({
    resolver: zodResolver(UpdateAdminBadgeRequestSchema),
    defaultValues: initialValues ?? defaultCreateBadgeFormValues,
    mode: "onChange",
  });

export const useUpdateAdminBadgeStatusForm = () =>
  useForm<UpdateAdminBadgeStatusInput>({
    resolver: zodResolver(UpdateAdminBadgeStatusResetScheam),
    mode: "onChange",
  });

/* ---- Mutation Hooks ---- */
export const useCreateAdminBadge = () =>
  useMutation({
    mutationFn: (input: CreateAdminBadgeInput) => createAdminBadge(input),
    onSuccess: (data) => {
      /* ---- Prepend new badge to the first page of every list variant ---- */
      queryClient.setQueriesData<InfiniteData<AdminBadgeListResponse>>(
        { queryKey: adminBadgeQueryKeys.lists() },
        (oldData) => {
          if (!oldData) return oldData;
          const newItem: AdminBadgeSummary = {
            id: data.id,
            name: data.name,
            description: data.description,
            iconUrl: data.iconUrl,
            status: data.status,
            rarity: data.rarity,
            category: data.category,
            assignmentType: data.assignmentType,
            tags: data.tags,
            triggerConfig: data.triggerConfig,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          };
          return {
            ...oldData,
            pages: oldData.pages.map((page, i) =>
              i === 0 ? { ...page, items: [newItem, ...page.items], total: page.total + 1 } : page
            ),
          };
        }
      );
      /* ---- Invalidate stats since count changed ---- */
      queryClient.invalidateQueries({ queryKey: adminBadgeQueryKeys.stats() });
      Toast.show({
        type: "success",
        text1: "Badge created successfully",
        text2: "The badge has been created",
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to create badge",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useUpdateAdminBadge = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateAdminBadgeInput }) => updateAdminBadge(id, input),
    onSuccess: (data, { id }) => {
      /* ---- Update item in all list variants for instant feedback ---- */
      queryClient.setQueriesData<InfiniteData<AdminBadgeListResponse>>(
        { queryKey: adminBadgeQueryKeys.lists() },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              total: page.total,
              items: page.items.map((item) =>
                item.id === id
                  ? {
                      ...item,
                      name: data.name,
                      description: data.description,
                      iconUrl: data.iconUrl
                        ? `${data.iconUrl}${data.iconUrl.includes("?") ? "&" : "?"}v=${new Date(data.updatedAt).getTime()}`
                        : data.iconUrl,
                      rarity: data.rarity,
                      category: data.category,
                      assignmentType: data.assignmentType,
                      tags: data.tags,
                      status: data.status,
                      triggerConfig: data.triggerConfig,
                      updatedAt: data.updatedAt,
                    }
                  : item
              ),
            })),
          };
        }
      );

      /* ---- Invalidate all list variants to ensure data consistency ---- */
      queryClient.invalidateQueries({ queryKey: adminBadgeQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: adminBadgeQueryKeys.stats() });

      /* ---- Update detail cache ---- */
      const versionedData = {
        ...data,
        iconUrl: data.iconUrl
          ? `${data.iconUrl}${data.iconUrl.includes("?") ? "&" : "?"}v=${new Date(data.updatedAt).getTime()}`
          : data.iconUrl,
      };
      queryClient.setQueryData<AdminBadgeDetail>(adminBadgeQueryKeys.detail(id), versionedData);

      Toast.show({
        type: "success",
        text1: "Badge updated successfully",
        text2: "The badge has been updated",
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to update badge",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useUpdateAdminBadgeStatus = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateAdminBadgeStatusInput }) =>
      updateAdminBadgeStatus(id, input),
    onSuccess: (data, { id, input }) => {
      if (input.action === "Clone") {
        /* ---- Clone creates a new badge — invalidate the list so it appears ---- */
        queryClient.invalidateQueries({ queryKey: adminBadgeQueryKeys.lists() });
        queryClient.invalidateQueries({ queryKey: adminBadgeQueryKeys.stats() });
        Toast.show({
          type: "success",
          text1: "Badge cloned successfully",
          text2: "A draft copy of the badge has been created",
        });
      } else {
        /* ---- Publish / Archive: update existing badge's status in all list pages ---- */
        queryClient.setQueriesData<InfiniteData<AdminBadgeListResponse>>(
          { queryKey: adminBadgeQueryKeys.lists() },
          (oldData) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                items: page.items.map((item) => (item.id === id ? { ...item, status: data.status } : item)),
              })),
            };
          }
        );
        /* ---- Update detail cache ---- */
        queryClient.setQueryData<AdminBadgeDetail>(adminBadgeQueryKeys.detail(id), (oldData) => {
          if (!oldData) return oldData;
          return { ...oldData, status: data.status };
        });
        /* ---- Invalidate stats since counts changed ---- */
        queryClient.invalidateQueries({ queryKey: adminBadgeQueryKeys.stats() });
        Toast.show({
          type: "success",
          text1: "Badge status updated successfully",
          text2: "The badge status has been updated",
        });
      }
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to update badge status",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useDeleteAdminBadge = () =>
  useMutation({
    mutationFn: (id: string) => deleteAdminBadge(id),
    onSuccess: (_, id) => {
      /* ---- Remove item from all list pages ---- */
      queryClient.setQueriesData<InfiniteData<AdminBadgeListResponse>>(
        { queryKey: adminBadgeQueryKeys.lists() },
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
      /* ---- Remove detail cache ---- */
      queryClient.removeQueries({ queryKey: adminBadgeQueryKeys.detail(id) });
      /* ---- Invalidate stats since count changed ---- */
      queryClient.invalidateQueries({ queryKey: adminBadgeQueryKeys.stats() });
      Toast.show({
        type: "success",
        text1: "Badge deleted successfully",
        text2: "The badge has been deleted",
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to delete badge",
        text2: errorMessage || "Please try again later",
      });
    },
  });

/* ---- Query Hooks ---- */
export const useAdminBadgeList = (filters: Omit<AdminBadgeListInput, "page">) =>
  useInfiniteQuery({
    queryKey: adminBadgeQueryKeys.list({ ...filters, page: 1, pageSize: filters.pageSize ?? 20 }),
    queryFn: ({ pageParam = 1 }) =>
      getAdminBadgeList({
        ...filters,
        page: pageParam,
        pageSize: filters.pageSize ?? 20,
        sort: filters.sort ?? "-createdAt",
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

export const useAdminBadgeDetail = (id: string, enabled = true) =>
  useQuery({
    queryKey: adminBadgeQueryKeys.detail(id),
    queryFn: () => getAdminBadgeDetail(id),
    enabled: enabled && !!id,
  });

export const useAdminBadgeStatusStats = () =>
  useQuery({
    queryKey: adminBadgeQueryKeys.stats(),
    queryFn: () => getAdminBadgeStatusStats(),
  });

/* ---- Filter Store ---- */
export const useAdminBadgeFilterStore = create<AdminBadgeFilterStore>((set) => ({
  /* ---- State ---- */
  ...defaultAdminBadgeFilters,

  /* ---- Actions ---- */
  setFilters: (filters) => {
    set((state) => {
      const updates: Partial<AdminBadgeFilterStore> = {};
      const filterKeys = Object.keys(filters);
      const filterFields = ["status", "category", "rarity", "assignmentType", "tags", "q"] as const;
      const hasFilterChanges = filterKeys.some((key) => filterFields.includes(key as (typeof filterFields)[number]));

      if (hasFilterChanges && !("page" in filters)) {
        updates.page = 1;
      }

      Object.entries(filters).forEach(([key, value]) => {
        const filterKey = key as keyof AdminBadgeFilterStore;
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
    set(defaultAdminBadgeFilters);
  },
}));
