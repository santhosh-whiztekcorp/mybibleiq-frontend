import { zodResolver } from "@hookform/resolvers/zod";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import Toast from "@/lib/toast";
import { queryClient } from "@/config/queryClient";
import { getErrorMessage } from "@/utils/error";
import {
  createAdminFlashcardGroup,
  deleteAdminFlashcardGroup,
  getAdminFlashcardGroupDetail,
  getAdminFlashcardGroupList,
  getAdminFlashcardGroupStatusStats,
  updateAdminFlashcardGroup,
  updateAdminFlashcardGroupFlashcards,
  updateAdminFlashcardGroupStatus,
} from "./admin-flashcard-group.api";
import { adminFlashcardGroupQueryKeys } from "./admin-flashcard-group.constants";
import { defaultAdminFlashcardGroupFilters, defaultCreateFlashcardGroupFormValues } from "./admin-flashcard-group.data";
import {
  CreateAdminFlashcardGroupRequestSchema,
  UpdateAdminFlashcardGroupRequestSchema,
  UpdateAdminFlashcardGroupFlashcardsSchema,
  UpdateAdminFlashcardGroupStatusSchema,
} from "./admin-flashcard-group.schemas";
import type {
  CreateAdminFlashcardGroupInput,
  UpdateAdminFlashcardGroupInput,
  UpdateAdminFlashcardGroupFlashcardsInput,
  UpdateAdminFlashcardGroupStatusInput,
  AdminFlashcardGroupListInput,
  AdminFlashcardGroupFilterStore,
} from "./admin-flashcard-group.types";

/* ---- Form Hooks ---- */
export const useCreateAdminFlashcardGroupForm = () =>
  useForm<CreateAdminFlashcardGroupInput>({
    resolver: zodResolver(CreateAdminFlashcardGroupRequestSchema),
    defaultValues: defaultCreateFlashcardGroupFormValues,
    mode: "onChange",
  });

export const useUpdateAdminFlashcardGroupForm = (initialValues?: CreateAdminFlashcardGroupInput) =>
  useForm<UpdateAdminFlashcardGroupInput>({
    resolver: zodResolver(UpdateAdminFlashcardGroupRequestSchema),
    defaultValues: initialValues ?? defaultCreateFlashcardGroupFormValues,
    mode: "onChange",
  });

export const useUpdateAdminFlashcardGroupFlashcardsForm = () =>
  useForm<UpdateAdminFlashcardGroupFlashcardsInput>({
    resolver: zodResolver(UpdateAdminFlashcardGroupFlashcardsSchema),
    mode: "onChange",
  });

export const useUpdateAdminFlashcardGroupStatusForm = () =>
  useForm<UpdateAdminFlashcardGroupStatusInput>({
    resolver: zodResolver(UpdateAdminFlashcardGroupStatusSchema),
    mode: "onChange",
  });

/* ---- Mutation Hooks ---- */
export const useCreateAdminFlashcardGroup = () =>
  useMutation({
    mutationFn: (input: CreateAdminFlashcardGroupInput) => createAdminFlashcardGroup(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminFlashcardGroupQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Flashcard group created successfully",
          text2: "The flashcard group has been created",
        });
      }, 300);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to create flashcard group",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useUpdateAdminFlashcardGroup = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateAdminFlashcardGroupInput }) =>
      updateAdminFlashcardGroup(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminFlashcardGroupQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Flashcard group updated successfully",
          text2: "The flashcard group has been updated",
        });
      }, 300);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to update flashcard group",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useUpdateAdminFlashcardGroupFlashcards = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateAdminFlashcardGroupFlashcardsInput }) =>
      updateAdminFlashcardGroupFlashcards(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminFlashcardGroupQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Flashcards updated successfully",
          text2: "The flashcard group flashcards have been updated",
        });
      }, 300);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to update flashcard group flashcards",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useUpdateAdminFlashcardGroupStatus = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateAdminFlashcardGroupStatusInput }) =>
      updateAdminFlashcardGroupStatus(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminFlashcardGroupQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Flashcard group status updated successfully",
          text2: "The flashcard group status has been updated",
        });
      }, 300);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to update flashcard group status",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useDeleteAdminFlashcardGroup = () =>
  useMutation({
    mutationFn: (id: string) => deleteAdminFlashcardGroup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminFlashcardGroupQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Flashcard group deleted successfully",
          text2: "The flashcard group has been deleted",
        });
      }, 300);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to delete flashcard group",
        text2: errorMessage || "Please try again later",
      });
    },
  });

/* ---- Query Hooks ---- */
export const useAdminFlashcardGroupList = (filters: Omit<AdminFlashcardGroupListInput, "page">) => {
  /* ---- Normalize filters for query key (remove undefined values) ---- */
  const normalizedFilters = useMemo(() => {
    const normalized: AdminFlashcardGroupListInput = {
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
    queryKey: adminFlashcardGroupQueryKeys.list(normalizedFilters),
    queryFn: ({ pageParam = 1 }) =>
      getAdminFlashcardGroupList({
        ...normalizedFilters,
        page: pageParam,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || typeof lastPage.total === "undefined") {
        return undefined;
      }
      const totalPages = Math.ceil(lastPage.total / (normalizedFilters.pageSize ?? 20));
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
  });
};

export const useAdminFlashcardGroupDetail = (id: string, enabled = true) =>
  useQuery({
    queryKey: adminFlashcardGroupQueryKeys.detail(id),
    queryFn: () => getAdminFlashcardGroupDetail(id),
    enabled: enabled && !!id,
  });

export const useAdminFlashcardGroupStatusStats = () =>
  useQuery({
    queryKey: adminFlashcardGroupQueryKeys.statsStatus(),
    queryFn: () => getAdminFlashcardGroupStatusStats(),
  });

/* ---- Filter Store ---- */
export const useAdminFlashcardGroupFilterStore = create<AdminFlashcardGroupFilterStore>((set) => ({
  /* ---- State ---- */
  ...defaultAdminFlashcardGroupFilters,

  /* ---- Actions ---- */
  setFilters: (filters) => {
    set((state) => {
      const updates: Partial<AdminFlashcardGroupFilterStore> = {};
      const filterKeys = Object.keys(filters);
      const filterFields = ["status", "tag", "q"] as const;
      const hasFilterChanges = filterKeys.some((key) => filterFields.includes(key as (typeof filterFields)[number]));

      if (hasFilterChanges && !("page" in filters)) {
        updates.page = 1;
      }

      Object.entries(filters).forEach(([key, value]) => {
        const filterKey = key as keyof AdminFlashcardGroupFilterStore;
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
    set(defaultAdminFlashcardGroupFilters);
  },
}));
