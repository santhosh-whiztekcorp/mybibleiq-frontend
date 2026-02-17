import { zodResolver } from "@hookform/resolvers/zod";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminBadgeQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Badge created successfully",
          text2: "The badge has been created",
        });
      }, 300);
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminBadgeQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Badge updated successfully",
          text2: "The badge has been updated",
        });
      }, 300);
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminBadgeQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Badge status updated successfully",
          text2: "The badge status has been updated",
        });
      }, 300);
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminBadgeQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Badge deleted successfully",
          text2: "The badge has been deleted",
        });
      }, 300);
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
