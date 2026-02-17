import { zodResolver } from "@hookform/resolvers/zod";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { useForm } from "react-hook-form";
import Toast from "@/lib/toast";
import { queryClient } from "@/config/queryClient";
import { getErrorMessage } from "@/utils/error";
import {
  createAdminTag,
  deleteAdminTag,
  getAdminTagDetail,
  getAdminTagList,
  getAdminTagStats,
  updateAdminTag,
  getAdminTagCategories,
  createAdminTagCategory,
  updateAdminTagCategory,
  deleteAdminTagCategory,
  exportAdminTags,
} from "./admin-tag.api";
import { adminTagQueryKeys } from "./admin-tag.constants";
import { defaultAdminTagFilters, defaultCreateTagFormValues } from "./admin-tag.data";
import {
  CreateAdminTagRequestSchema,
  UpdateAdminTagRequestSchema,
  CreateCategoryRequestSchema,
  UpdateCategoryRequestSchema,
} from "./admin-tag.schemas";
import type {
  CreateAdminTagInput,
  UpdateAdminTagInput,
  CreateCategoryInput,
  UpdateCategoryInput,
  AdminTagListInput,
  AdminTagFilterStore,
} from "./admin-tag.types";

/* ---- Form Hooks ---- */
export const useCreateAdminTagForm = () =>
  useForm<CreateAdminTagInput>({
    resolver: zodResolver(CreateAdminTagRequestSchema),
    defaultValues: defaultCreateTagFormValues,
    mode: "onChange",
  });

export const useUpdateAdminTagForm = (initialValues?: CreateAdminTagInput) =>
  useForm<UpdateAdminTagInput>({
    resolver: zodResolver(UpdateAdminTagRequestSchema),
    defaultValues: initialValues ?? defaultCreateTagFormValues,
    mode: "onChange",
  });

export const useCreateCategoryForm = () =>
  useForm<CreateCategoryInput>({
    resolver: zodResolver(CreateCategoryRequestSchema),
    defaultValues: {
      name: "",
      color: "#B3E4FD",
    },
    mode: "onChange",
  });

export const useUpdateCategoryForm = (initialValues?: CreateCategoryInput) =>
  useForm<UpdateCategoryInput>({
    resolver: zodResolver(UpdateCategoryRequestSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

/* ---- Mutation Hooks ---- */
export const useCreateAdminTag = () =>
  useMutation({
    mutationFn: (input: CreateAdminTagInput) => createAdminTag(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminTagQueryKeys.all });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to create tag",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useUpdateAdminTag = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateAdminTagInput }) => updateAdminTag(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminTagQueryKeys.all });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to update tag",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useDeleteAdminTag = () =>
  useMutation({
    mutationFn: (id: string) => deleteAdminTag(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminTagQueryKeys.all });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to delete tag",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useCreateAdminTagCategory = () =>
  useMutation({
    mutationFn: (input: CreateCategoryInput) => createAdminTagCategory(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminTagQueryKeys.categories() });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to create category",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useUpdateAdminTagCategory = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateCategoryInput }) => updateAdminTagCategory(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminTagQueryKeys.categories() });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to update category",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useDeleteAdminTagCategory = () =>
  useMutation({
    mutationFn: (id: string) => deleteAdminTagCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminTagQueryKeys.categories() });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to delete category",
        text2: errorMessage || "Please try again later",
      });
    },
  });

/* ---- Query Hooks ---- */
export const useAdminTagList = (filters: Omit<AdminTagListInput, "page">) =>
  useInfiniteQuery({
    queryKey: adminTagQueryKeys.list({ ...filters, page: 1, pageSize: filters.pageSize ?? 20 }),
    queryFn: ({ pageParam = 1 }) =>
      getAdminTagList({
        ...filters,
        page: pageParam,
        pageSize: filters.pageSize ?? 20,
        sort: filters.sort ?? "-usageCount",
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

export const useAdminTagDetail = (id: string, enabled = true) =>
  useQuery({
    queryKey: adminTagQueryKeys.detail(id),
    queryFn: () => getAdminTagDetail(id),
    enabled: enabled && !!id,
  });

export const useAdminTagStats = () =>
  useQuery({
    queryKey: adminTagQueryKeys.stats(),
    queryFn: () => getAdminTagStats(),
  });

export const useAdminTagCategories = () =>
  useQuery({
    queryKey: adminTagQueryKeys.categories(),
    queryFn: () => getAdminTagCategories(),
  });

/* ---- Export Hook ---- */
export const useExportAdminTags = () =>
  useMutation({
    mutationFn: (format: "csv" = "csv") => exportAdminTags(format),
  });

/* ---- Filter Store ---- */
export const useAdminTagFilterStore = create<AdminTagFilterStore>((set) => ({
  /* ---- State ---- */
  ...defaultAdminTagFilters,

  /* ---- Actions ---- */
  setFilters: (filters) => {
    set((state) => {
      const updates: Partial<AdminTagFilterStore> = {};
      const filterKeys = Object.keys(filters);
      const filterFields = ["categoryId", "q"] as const;
      const hasFilterChanges = filterKeys.some((key) => filterFields.includes(key as (typeof filterFields)[number]));

      if (hasFilterChanges && !("page" in filters)) {
        updates.page = 1;
      }

      Object.entries(filters).forEach(([key, value]) => {
        const filterKey = key as keyof AdminTagFilterStore;
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
    set(defaultAdminTagFilters);
  },
}));
