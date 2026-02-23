import { zodResolver } from "@hookform/resolvers/zod";
import { useInfiniteQuery, useMutation, useQuery, InfiniteData } from "@tanstack/react-query";
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
  AdminFlashcardGroupListResponse,
  AdminFlashcardGroupSummary,
  AdminFlashcardGroupDetail,
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
    onSuccess: (data) => {
      /* ---- Prepend to first page of all list variants ---- */
      queryClient.setQueriesData<InfiniteData<AdminFlashcardGroupListResponse>>(
        { queryKey: adminFlashcardGroupQueryKeys.lists() },
        (oldData) => {
          if (!oldData) return oldData;
          const newItem: AdminFlashcardGroupSummary = {
            id: data.id,
            name: data.name,
            description: data.description,
            status: data.status,
            tags: data.tags,
            flashcardCount: data.flashcardCount,
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
      queryClient.invalidateQueries({ queryKey: adminFlashcardGroupQueryKeys.statsStatus() });
      Toast.show({
        type: "success",
        text1: "Flashcard group created successfully",
        text2: "The flashcard group has been created",
      });
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
    onSuccess: (data, { id }) => {
      /* ---- Update item in all list pages ---- */
      queryClient.setQueriesData<InfiniteData<AdminFlashcardGroupListResponse>>(
        { queryKey: adminFlashcardGroupQueryKeys.lists() },
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
                      description: data.description,
                      tags: data.tags,
                      updatedAt: data.updatedAt,
                    }
                  : item
              ),
            })),
          };
        }
      );
      /* ---- Update detail cache ---- */
      queryClient.setQueryData<AdminFlashcardGroupDetail>(adminFlashcardGroupQueryKeys.detail(id), data);
      Toast.show({
        type: "success",
        text1: "Flashcard group updated successfully",
        text2: "The flashcard group has been updated",
      });
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
    onSuccess: (data, { id }) => {
      /* ---- Update flashcard count in list + full detail ---- */
      queryClient.setQueriesData<InfiniteData<AdminFlashcardGroupListResponse>>(
        { queryKey: adminFlashcardGroupQueryKeys.lists() },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              items: page.items.map((item) =>
                item.id === id ? { ...item, flashcardCount: data.flashcardCount, updatedAt: data.updatedAt } : item
              ),
            })),
          };
        }
      );
      /* ---- Update detail cache with new flashcard list ---- */
      queryClient.setQueryData<AdminFlashcardGroupDetail>(adminFlashcardGroupQueryKeys.detail(id), (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          flashcards: data.flashcards,
          flashcardCount: data.flashcardCount,
          updatedAt: data.updatedAt,
        };
      });
      Toast.show({
        type: "success",
        text1: "Flashcards updated successfully",
        text2: "The flashcard group flashcards have been updated",
      });
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
    onSuccess: (data, { id, input }) => {
      if (input.action === "CloneFromPublished") {
        /* ---- Clone creates a new group — invalidate list so it appears ---- */
        queryClient.invalidateQueries({ queryKey: adminFlashcardGroupQueryKeys.lists() });
        queryClient.invalidateQueries({ queryKey: adminFlashcardGroupQueryKeys.statsStatus() });
        Toast.show({
          type: "success",
          text1: "Flashcard group cloned successfully",
          text2: "A draft copy of the flashcard group has been created",
        });
      } else {
        /* ---- Publish / Archive / Unarchive: update existing item's status ---- */
        queryClient.setQueriesData<InfiniteData<AdminFlashcardGroupListResponse>>(
          { queryKey: adminFlashcardGroupQueryKeys.lists() },
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
        queryClient.setQueryData<AdminFlashcardGroupDetail>(adminFlashcardGroupQueryKeys.detail(id), (oldData) => {
          if (!oldData) return oldData;
          return { ...oldData, status: data.status };
        });
        queryClient.invalidateQueries({ queryKey: adminFlashcardGroupQueryKeys.statsStatus() });
        Toast.show({
          type: "success",
          text1: "Flashcard group status updated successfully",
          text2: "The flashcard group status has been updated",
        });
      }
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
    onSuccess: (_, id) => {
      /* ---- Remove item from all list pages ---- */
      queryClient.setQueriesData<InfiniteData<AdminFlashcardGroupListResponse>>(
        { queryKey: adminFlashcardGroupQueryKeys.lists() },
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
      queryClient.removeQueries({ queryKey: adminFlashcardGroupQueryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: adminFlashcardGroupQueryKeys.statsStatus() });
      Toast.show({
        type: "success",
        text1: "Flashcard group deleted successfully",
        text2: "The flashcard group has been deleted",
      });
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
