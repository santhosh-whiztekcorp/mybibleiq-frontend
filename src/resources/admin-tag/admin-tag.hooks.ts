import { zodResolver } from "@hookform/resolvers/zod";
import { useInfiniteQuery, useMutation, useQuery, InfiniteData } from "@tanstack/react-query";
import { create } from "zustand";
import { useForm } from "react-hook-form";
import Toast from "@/lib/toast";
import { queryClient } from "@/config/queryClient";
import { getErrorMessage } from "@/utils/error";
import {
  createAdminTag,
  updateAdminTag,
  deleteAdminTag,
  getAdminTagList,
  getAdminTagDetail,
  getAdminTagStats,
  createAdminTagCategory,
  updateAdminTagCategory,
  deleteAdminTagCategory,
  getAdminTagCategories,
  exportAdminTags,
} from "./admin-tag.api";
import { adminTagQueryKeys } from "./admin-tag.constants";
import { defaultAdminTagFilters, defaultCreateTagFormValues } from "./admin-tag.data";
import type {
  CreateAdminTagInput,
  UpdateAdminTagInput,
  CreateCategoryInput,
  UpdateCategoryInput,
  AdminTagListInput,
  AdminTagFilterStore,
  AdminTagListResponse,
  AdminTagSummary,
  AdminTagDetail,
  AdminTagCategory,
} from "./admin-tag.types";
import {
  CreateAdminTagRequestSchema,
  CreateCategoryRequestSchema,
  UpdateAdminTagRequestSchema,
  UpdateCategoryRequestSchema,
} from "./admin-tag.schemas";

/* ---- Mutation Hooks ---- */
export const useCreateAdminTag = () =>
  useMutation({
    mutationFn: (input: CreateAdminTagInput) => createAdminTag(input),
    onSuccess: (data) => {
      /* ---- Prepend to first page of all tag list variants ---- */
      queryClient.setQueriesData<InfiniteData<AdminTagListResponse>>(
        { queryKey: adminTagQueryKeys.lists() },
        (oldData) => {
          if (!oldData) return oldData;
          const newItem: AdminTagSummary = {
            id: data.id,
            name: data.name,
            categoryId: data.categoryId,
            categoryName: data.categoryName,
            categoryColor: data.categoryColor,
            description: data.description,
            usageCount: data.usageCount,
            createdAt: data.createdAt,
            createdBy: data.createdBy,
          };
          return {
            ...oldData,
            pages: oldData.pages.map((page, i) =>
              i === 0 ? { ...page, items: [newItem, ...page.items], total: page.total + 1 } : page
            ),
          };
        }
      );
      queryClient.invalidateQueries({ queryKey: adminTagQueryKeys.stats() });
      Toast.show({ type: "success", text1: "Tag created successfully" });
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: "Failed to create tag", text2: getErrorMessage(error) });
    },
  });

export const useUpdateAdminTag = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateAdminTagInput }) => updateAdminTag(id, input),
    onSuccess: (data, { id }) => {
      /* ---- Update item in all list pages ---- */
      queryClient.setQueriesData<InfiniteData<AdminTagListResponse>>(
        { queryKey: adminTagQueryKeys.lists() },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              items: page.items.map((item) =>
                item.id === id
                  ? {
                      ...item,
                      name: data.name,
                      categoryId: data.categoryId,
                      categoryName: data.categoryName,
                      categoryColor: data.categoryColor,
                      description: data.description,
                    }
                  : item
              ),
            })),
          };
        }
      );
      /* ---- Update detail cache ---- */
      queryClient.setQueryData<AdminTagDetail>(adminTagQueryKeys.detail(id), data);
      Toast.show({ type: "success", text1: "Tag updated successfully" });
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: "Failed to update tag", text2: getErrorMessage(error) });
    },
  });

export const useDeleteAdminTag = () =>
  useMutation({
    mutationFn: (id: string) => deleteAdminTag(id),
    onSuccess: (_, id) => {
      /* ---- Remove item from all list pages ---- */
      queryClient.setQueriesData<InfiniteData<AdminTagListResponse>>(
        { queryKey: adminTagQueryKeys.lists() },
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
      queryClient.removeQueries({ queryKey: adminTagQueryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: adminTagQueryKeys.stats() });
      Toast.show({ type: "success", text1: "Tag deleted successfully" });
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: "Failed to delete tag", text2: getErrorMessage(error) });
    },
  });

export const useCreateAdminTagCategory = () =>
  useMutation({
    mutationFn: (input: CreateCategoryInput) => createAdminTagCategory(input),
    onSuccess: (data) => {
      /* ---- Append to the categories list ---- */
      queryClient.setQueryData<AdminTagCategory[]>(adminTagQueryKeys.categories(), (oldData) => {
        if (!oldData) return [data];
        return [...oldData, data];
      });
      queryClient.invalidateQueries({ queryKey: adminTagQueryKeys.stats() });
      Toast.show({ type: "success", text1: "Category created successfully" });
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: "Failed to create category", text2: getErrorMessage(error) });
    },
  });

export const useUpdateAdminTagCategory = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateCategoryInput }) => updateAdminTagCategory(id, input),
    onSuccess: (data, { id }) => {
      /* ---- Update the category in the categories list ---- */
      queryClient.setQueryData<AdminTagCategory[]>(adminTagQueryKeys.categories(), (oldData) => {
        if (!oldData) return oldData;
        return oldData.map((cat) => (cat.id === id ? data : cat));
      });
      /* ---- Update category name/color in all tag list items that belong to this category ---- */
      queryClient.setQueriesData<InfiniteData<AdminTagListResponse>>(
        { queryKey: adminTagQueryKeys.lists() },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              items: page.items.map((item) =>
                item.categoryId === id ? { ...item, categoryName: data.name, categoryColor: data.color } : item
              ),
            })),
          };
        }
      );
      Toast.show({ type: "success", text1: "Category updated successfully" });
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: "Failed to update category", text2: getErrorMessage(error) });
    },
  });

export const useDeleteAdminTagCategory = () =>
  useMutation({
    mutationFn: (id: string) => deleteAdminTagCategory(id),
    onSuccess: (_, id) => {
      /* ---- Remove from categories list ---- */
      queryClient.setQueryData<AdminTagCategory[]>(adminTagQueryKeys.categories(), (oldData) => {
        if (!oldData) return oldData;
        return oldData.filter((cat) => cat.id !== id);
      });
      /* ---- Invalidate tag lists since tags under this category may be affected ---- */
      queryClient.invalidateQueries({ queryKey: adminTagQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: adminTagQueryKeys.stats() });
      Toast.show({ type: "success", text1: "Category deleted successfully" });
    },
    onError: (error) => {
      Toast.show({ type: "error", text1: "Failed to delete category", text2: getErrorMessage(error) });
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
    set(defaultAdminTagFilters);
  },
}));

/* ---- Export Mutation ---- */
export const useExportAdminTags = () =>
  useMutation({
    mutationFn: (format: "csv" = "csv") => exportAdminTags(format),
  });

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
