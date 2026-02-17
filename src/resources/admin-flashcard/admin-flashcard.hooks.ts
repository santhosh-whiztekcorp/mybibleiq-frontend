import { zodResolver } from "@hookform/resolvers/zod";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import Toast from "@/lib/toast";
import { queryClient } from "@/config/queryClient";
import { getErrorMessage } from "@/utils/error";
import {
  createAdminFlashcard,
  deleteAdminFlashcard,
  getAdminFlashcardDetail,
  getAdminFlashcardList,
  getAdminFlashcardStatusStats,
  updateAdminFlashcard,
  updateAdminFlashcardStatus,
} from "./admin-flashcard.api";
import { adminFlashcardQueryKeys } from "./admin-flashcard.constants";
import { defaultAdminFlashcardFilters, defaultCreateFlashcardFormValues } from "./admin-flashcard.data";
import {
  CreateAdminFlashcardRequestSchema,
  UpdateAdminFlashcardRequestSchema,
  UpdateAdminFlashcardStatusSchema,
} from "./admin-flashcard.schemas";
import type {
  CreateAdminFlashcardInput,
  UpdateAdminFlashcardInput,
  UpdateAdminFlashcardStatusInput,
  AdminFlashcardListInput,
  AdminFlashcardFilterStore,
} from "./admin-flashcard.types";

/* ---- Form Hooks ---- */
export const useCreateAdminFlashcardForm = () =>
  useForm<CreateAdminFlashcardInput>({
    resolver: zodResolver(CreateAdminFlashcardRequestSchema),
    defaultValues: defaultCreateFlashcardFormValues,
    mode: "onChange",
  });

export const useUpdateAdminFlashcardForm = (initialValues?: CreateAdminFlashcardInput) =>
  useForm<UpdateAdminFlashcardInput>({
    resolver: zodResolver(UpdateAdminFlashcardRequestSchema),
    defaultValues: initialValues ?? defaultCreateFlashcardFormValues,
    mode: "onChange",
  });

export const useUpdateAdminFlashcardStatusForm = () =>
  useForm<UpdateAdminFlashcardStatusInput>({
    resolver: zodResolver(UpdateAdminFlashcardStatusSchema),
    mode: "onChange",
  });

/* ---- Mutation Hooks ---- */
export const useCreateAdminFlashcard = () =>
  useMutation({
    mutationFn: (input: CreateAdminFlashcardInput) => createAdminFlashcard(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminFlashcardQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Flashcard created successfully",
          text2: "The flashcard has been created",
        });
      }, 300);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to create flashcard",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useUpdateAdminFlashcard = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateAdminFlashcardInput }) => updateAdminFlashcard(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminFlashcardQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Flashcard updated successfully",
          text2: "The flashcard has been updated",
        });
      }, 300);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to update flashcard",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useUpdateAdminFlashcardStatus = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateAdminFlashcardStatusInput }) =>
      updateAdminFlashcardStatus(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminFlashcardQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Flashcard status updated successfully",
          text2: "The flashcard status has been updated",
        });
      }, 300);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to update flashcard status",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useDeleteAdminFlashcard = () =>
  useMutation({
    mutationFn: (id: string) => deleteAdminFlashcard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminFlashcardQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Flashcard deleted successfully",
          text2: "The flashcard has been deleted",
        });
      }, 300);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to delete flashcard",
        text2: errorMessage || "Please try again later",
      });
    },
  });

/* ---- Query Hooks ---- */
export const useAdminFlashcardList = (filters: Omit<AdminFlashcardListInput, "page">) => {
  /* ---- Normalize filters for query key (remove undefined values) ---- */
  const normalizedFilters = useMemo(() => {
    const normalized: AdminFlashcardListInput = {
      page: 1,
      pageSize: filters.pageSize ?? 20,
      sort: filters.sort ?? "-createdAt",
    };
    if (filters.status !== undefined) normalized.status = filters.status;
    if (filters.tag !== undefined) normalized.tag = filters.tag;
    if (filters.q !== undefined) normalized.q = filters.q;
    return normalized;
  }, [filters]);

  return useInfiniteQuery({
    queryKey: adminFlashcardQueryKeys.list(normalizedFilters),
    queryFn: ({ pageParam = 1 }) =>
      getAdminFlashcardList({
        ...normalizedFilters,
        page: pageParam,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || !lastPage.total) return undefined;
      const totalPages = Math.ceil(lastPage.total / (normalizedFilters.pageSize ?? 20));
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
  });
};

export const useAdminFlashcardDetail = (id: string, enabled = true) =>
  useQuery({
    queryKey: adminFlashcardQueryKeys.detail(id),
    queryFn: () => getAdminFlashcardDetail(id),
    enabled: enabled && !!id,
  });

export const useAdminFlashcardStatusStats = () =>
  useQuery({
    queryKey: adminFlashcardQueryKeys.statsStatus(),
    queryFn: () => getAdminFlashcardStatusStats(),
  });

/* ---- Filter Store ---- */
export const useAdminFlashcardFilterStore = create<AdminFlashcardFilterStore>((set) => ({
  /* ---- State ---- */
  ...defaultAdminFlashcardFilters,

  /* ---- Actions ---- */
  setFilters: (filters) => {
    set((state) => {
      const updates: Partial<AdminFlashcardFilterStore> = {};
      const filterKeys = Object.keys(filters);
      const filterFields = ["status", "tag", "q"] as const;
      const hasFilterChanges = filterKeys.some((key) => filterFields.includes(key as (typeof filterFields)[number]));

      if (hasFilterChanges && !("page" in filters)) {
        updates.page = 1;
      }

      Object.entries(filters).forEach(([key, value]) => {
        const filterKey = key as keyof AdminFlashcardFilterStore;
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
    set(defaultAdminFlashcardFilters);
  },
}));
