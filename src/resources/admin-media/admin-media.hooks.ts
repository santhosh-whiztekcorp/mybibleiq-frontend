import { zodResolver } from "@hookform/resolvers/zod";
import { useInfiniteQuery, useMutation, useQuery, InfiniteData } from "@tanstack/react-query";
import { create } from "zustand";
import { useForm } from "react-hook-form";
import Toast from "@/lib/toast";
import { queryClient } from "@/config/queryClient";
import { getErrorMessage } from "@/utils/error";
import {
  createAdminMedia,
  deleteAdminMedia,
  getAdminMediaDetail,
  getAdminMediaList,
  getAdminMediaTypeStats,
  updateAdminMedia,
  updateAdminMediaStatus,
} from "./admin-media.api";
import { adminMediaQueryKeys } from "./admin-media.constants";
import { defaultAdminMediaFilters, defaultCreateMediaFormValues } from "./admin-media.data";
import {
  CreateAdminMediaRequestSchema,
  UpdateAdminMediaRequestSchema,
  UpdateAdminMediaStatusSchema,
} from "./admin-media.schemas";
import type {
  CreateAdminMediaInput,
  CreateAdminMediaFormInput,
  UpdateAdminMediaInput,
  UpdateAdminMediaFormInput,
  UpdateAdminMediaStatusInput,
  AdminMediaListInput,
  AdminMediaFilterStore,
  AdminMediaListResponse,
  AdminMediaSummary,
  AdminMediaDetail,
} from "./admin-media.types";

/* ---- Form Hooks ---- */
export const useCreateAdminMediaForm = () =>
  useForm<CreateAdminMediaFormInput>({
    resolver: zodResolver(CreateAdminMediaRequestSchema),
    defaultValues: defaultCreateMediaFormValues,
    mode: "onChange",
  });

export const useUpdateAdminMediaForm = (initialValues?: UpdateAdminMediaFormInput) =>
  useForm<UpdateAdminMediaFormInput>({
    resolver: zodResolver(UpdateAdminMediaRequestSchema),
    defaultValues: initialValues ?? defaultCreateMediaFormValues,
    mode: "onChange",
  });

export const useUpdateAdminMediaStatusForm = () =>
  useForm<UpdateAdminMediaStatusInput>({
    resolver: zodResolver(UpdateAdminMediaStatusSchema),
    mode: "onChange",
  });

/* ---- Mutation Hooks ---- */
export const useCreateAdminMedia = () =>
  useMutation({
    mutationFn: (input: CreateAdminMediaInput) => createAdminMedia(input),
    onSuccess: (data) => {
      /* ---- Prepend to first page of all list variants ---- */
      queryClient.setQueriesData<InfiniteData<AdminMediaListResponse>>(
        { queryKey: adminMediaQueryKeys.lists() },
        (oldData) => {
          if (!oldData) return oldData;
          const newItem: AdminMediaSummary = {
            id: data.id,
            status: data.status,
            title: data.title,
            type: data.type,
            url: data.url,
            caption: data.caption,
            sizeBytes: data.sizeBytes,
            duration: data.duration,
            tags: data.tags,
            publishedAt: data.publishedAt,
            archivedAt: data.archivedAt,
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
      queryClient.invalidateQueries({ queryKey: adminMediaQueryKeys.stats() });
      Toast.show({
        type: "success",
        text1: "Media created successfully",
        text2: "The media has been created",
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to create media",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useUpdateAdminMedia = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateAdminMediaInput }) => updateAdminMedia(id, input),
    onSuccess: (data, { id }) => {
      /* ---- Update item in all list variants for instant feedback ---- */
      queryClient.setQueriesData<InfiniteData<AdminMediaListResponse>>(
        { queryKey: adminMediaQueryKeys.lists() },
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
                      title: data.title,
                      url: data.url
                        ? `${data.url}${data.url.includes("?") ? "&" : "?"}v=${new Date(data.updatedAt).getTime()}`
                        : data.url,
                      type: data.type,
                      caption: data.caption,
                      sizeBytes: data.sizeBytes,
                      duration: data.duration,
                      tags: data.tags,
                      status: data.status,
                      updatedAt: data.updatedAt,
                    }
                  : item
              ),
            })),
          };
        }
      );

      /* ---- Invalidate to ensure consistency with backend ---- */
      queryClient.invalidateQueries({ queryKey: adminMediaQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: adminMediaQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: adminMediaQueryKeys.stats() });

      /* ---- Update detail cache ---- */
      const versionedData = {
        ...data,
        url: data.url
          ? `${data.url}${data.url.includes("?") ? "&" : "?"}v=${new Date(data.updatedAt).getTime()}`
          : data.url,
      };
      queryClient.setQueryData<AdminMediaDetail>(adminMediaQueryKeys.detail(id), versionedData);

      Toast.show({
        type: "success",
        text1: "Media updated successfully",
        text2: "The media has been updated",
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to update media",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useUpdateAdminMediaStatus = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateAdminMediaStatusInput }) =>
      updateAdminMediaStatus(id, input),
    onSuccess: (data, { id, input }) => {
      if (input.action === "Clone") {
        /* ---- Clone creates a new media item — invalidate list so it appears ---- */
        queryClient.invalidateQueries({ queryKey: adminMediaQueryKeys.lists() });
        queryClient.invalidateQueries({ queryKey: adminMediaQueryKeys.stats() });
        Toast.show({
          type: "success",
          text1: "Media cloned successfully",
          text2: "A draft copy of the media has been created",
        });
      } else {
        /* ---- Publish / Archive: update existing item's status in all list pages ---- */
        queryClient.setQueriesData<InfiniteData<AdminMediaListResponse>>(
          { queryKey: adminMediaQueryKeys.lists() },
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
        queryClient.setQueryData<AdminMediaDetail>(adminMediaQueryKeys.detail(id), (oldData) => {
          if (!oldData) return oldData;
          return { ...oldData, status: data.status };
        });
        queryClient.invalidateQueries({ queryKey: adminMediaQueryKeys.stats() });
        Toast.show({
          type: "success",
          text1: "Media status updated successfully",
          text2: "The media status has been updated",
        });
      }
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to update media status",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useDeleteAdminMedia = () =>
  useMutation({
    mutationFn: (id: string) => deleteAdminMedia(id),
    onSuccess: (_, id) => {
      /* ---- Remove item from all list pages ---- */
      queryClient.setQueriesData<InfiniteData<AdminMediaListResponse>>(
        { queryKey: adminMediaQueryKeys.lists() },
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
      queryClient.removeQueries({ queryKey: adminMediaQueryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: adminMediaQueryKeys.stats() });
      Toast.show({
        type: "success",
        text1: "Media deleted successfully",
        text2: "The media has been deleted",
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to delete media",
        text2: errorMessage || "Please try again later",
      });
    },
  });

/* ---- Query Hooks ---- */
export const useAdminMediaList = (filters: Omit<AdminMediaListInput, "page">) =>
  useInfiniteQuery({
    queryKey: adminMediaQueryKeys.list({ ...filters, page: 1, pageSize: filters.pageSize ?? 20 }),
    queryFn: ({ pageParam = 1 }) =>
      getAdminMediaList({
        ...filters,
        page: pageParam,
        pageSize: filters.pageSize ?? 20,
        sort: filters.sort ?? "-createdAt",
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage.total / (filters.pageSize ?? 20));
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
  });

export const useAdminMediaDetail = (id: string, enabled = true) =>
  useQuery({
    queryKey: adminMediaQueryKeys.detail(id),
    queryFn: () => getAdminMediaDetail(id),
    enabled: enabled && !!id,
  });

export const useAdminMediaTypeStats = () =>
  useQuery({
    queryKey: adminMediaQueryKeys.stats(),
    queryFn: () => getAdminMediaTypeStats(),
  });

/* ---- Filter Store ---- */
export const useAdminMediaFilterStore = create<AdminMediaFilterStore>((set) => ({
  /* ---- State ---- */
  ...defaultAdminMediaFilters,

  /* ---- Actions ---- */
  setFilters: (filters) => {
    set((state) => {
      const updates: Partial<AdminMediaFilterStore> = {};
      const filterKeys = Object.keys(filters);
      const filterFields = ["status", "type", "tags", "q"] as const;
      const hasFilterChanges = filterKeys.some((key) => filterFields.includes(key as (typeof filterFields)[number]));

      if (hasFilterChanges && !("page" in filters)) {
        updates.page = 1;
      }

      Object.entries(filters).forEach(([key, value]) => {
        const filterKey = key as keyof AdminMediaFilterStore;
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
    set(defaultAdminMediaFilters);
  },
}));
