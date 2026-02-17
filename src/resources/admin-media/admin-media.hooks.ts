import { zodResolver } from "@hookform/resolvers/zod";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminMediaQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Media created successfully",
          text2: "The media has been created",
        });
      }, 300);
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminMediaQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Media updated successfully",
          text2: "The media has been updated",
        });
      }, 300);
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminMediaQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Media status updated successfully",
          text2: "The media status has been updated",
        });
      }, 300);
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminMediaQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Media deleted successfully",
          text2: "The media has been deleted",
        });
      }, 300);
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
