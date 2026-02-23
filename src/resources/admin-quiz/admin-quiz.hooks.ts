import { zodResolver } from "@hookform/resolvers/zod";
import { useInfiniteQuery, useMutation, useQuery, InfiniteData } from "@tanstack/react-query";
import { create } from "zustand";
import { useForm } from "react-hook-form";
import Toast from "@/lib/toast";
import { queryClient } from "@/config/queryClient";
import { getErrorMessage } from "@/utils/error";
import {
  createAdminQuiz,
  deleteAdminQuiz,
  getAdminQuizDetail,
  getAdminQuizList,
  getAdminQuizStatusStats,
  updateAdminQuiz,
  updateAdminQuizStatus,
} from "./admin-quiz.api";
import { adminQuizQueryKeys } from "./admin-quiz.constants";
import { defaultAdminQuizFilters, defaultCreateQuizFormValues } from "./admin-quiz.data";
import {
  CreateAdminQuizRequestSchema,
  UpdateAdminQuizRequestSchema,
  UpdateAdminQuizStatusSchema,
} from "./admin-quiz.schemas";
import type {
  CreateAdminQuizInput,
  UpdateAdminQuizInput,
  UpdateAdminQuizStatusInput,
  AdminQuizListInput,
  AdminQuizFilterStore,
  AdminQuizListResponse,
  AdminQuizSummary,
  AdminQuizDetail,
} from "./admin-quiz.types";

/* ---- Form Hooks ---- */
export const useCreateAdminQuizForm = () =>
  useForm<CreateAdminQuizInput>({
    resolver: zodResolver(CreateAdminQuizRequestSchema),
    defaultValues: defaultCreateQuizFormValues,
    mode: "onChange",
  });

export const useUpdateAdminQuizForm = (initialValues?: CreateAdminQuizInput) =>
  useForm<UpdateAdminQuizInput>({
    resolver: zodResolver(UpdateAdminQuizRequestSchema),
    defaultValues: initialValues ?? defaultCreateQuizFormValues,
    mode: "onChange",
  });

export const useUpdateAdminQuizStatusForm = () =>
  useForm<UpdateAdminQuizStatusInput>({
    resolver: zodResolver(UpdateAdminQuizStatusSchema),
    mode: "onChange",
  });

/* ---- Mutation Hooks ---- */
export const useCreateAdminQuiz = () =>
  useMutation({
    mutationFn: (input: CreateAdminQuizInput) => createAdminQuiz(input),
    onSuccess: (data) => {
      /* ---- Prepend to first page of all list variants ---- */
      queryClient.setQueriesData<InfiniteData<AdminQuizListResponse>>(
        { queryKey: adminQuizQueryKeys.lists() },
        (oldData) => {
          if (!oldData) return oldData;
          const newItem: AdminQuizSummary = {
            id: data.id,
            title: data.title,
            description: data.description,
            status: data.status,
            difficulty: data.difficulty,
            totalQuestions: data.totalQuestions,
            totalPoints: data.totalPoints,
            tags: data.tags,
            publishAt: data.publishAt,
            publishedAt: data.publishedAt,
            completionBadgeId: data.completionBadgeId,
            isSwordDrillEnabled: data.isSwordDrillEnabled,
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
      queryClient.invalidateQueries({ queryKey: adminQuizQueryKeys.stats() });
      Toast.show({
        type: "success",
        text1: "Quiz created successfully",
        text2: "The quiz has been created",
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to create quiz",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useUpdateAdminQuiz = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateAdminQuizInput }) => updateAdminQuiz(id, input),
    onSuccess: (data, { id }) => {
      /* ---- Update item in all list pages ---- */
      queryClient.setQueriesData<InfiniteData<AdminQuizListResponse>>(
        { queryKey: adminQuizQueryKeys.lists() },
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
                      title: data.title,
                      description: data.description,
                      difficulty: data.difficulty,
                      tags: data.tags,
                      totalQuestions: data.totalQuestions,
                      totalPoints: data.totalPoints,
                      isSwordDrillEnabled: data.isSwordDrillEnabled,
                      updatedAt: data.updatedAt,
                    }
                  : item
              ),
            })),
          };
        }
      );
      /* ---- Update detail cache ---- */
      queryClient.setQueryData<AdminQuizDetail>(adminQuizQueryKeys.detail(id), data);
      Toast.show({
        type: "success",
        text1: "Quiz updated successfully",
        text2: "The quiz has been updated",
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to update quiz",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useUpdateAdminQuizStatus = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateAdminQuizStatusInput }) => updateAdminQuizStatus(id, input),
    onSuccess: (data, { id, input }) => {
      if (input.action === "Clone") {
        /* ---- Clone creates a new quiz — invalidate list so it appears ---- */
        queryClient.invalidateQueries({ queryKey: adminQuizQueryKeys.lists() });
        queryClient.invalidateQueries({ queryKey: adminQuizQueryKeys.stats() });
        Toast.show({
          type: "success",
          text1: "Quiz cloned successfully",
          text2: "A draft copy of the quiz has been created",
        });
      } else {
        /* ---- Schedule / Unschedule / Publish / Archive: update existing item's status ---- */
        queryClient.setQueriesData<InfiniteData<AdminQuizListResponse>>(
          { queryKey: adminQuizQueryKeys.lists() },
          (oldData) => {
            if (!oldData) return oldData;
            return {
              ...oldData,
              pages: oldData.pages.map((page) => ({
                ...page,
                items: page.items.map((item) =>
                  item.id === id ? { ...item, status: data.status, publishAt: data.publishAt } : item
                ),
              })),
            };
          }
        );
        /* ---- Update detail cache ---- */
        queryClient.setQueryData<AdminQuizDetail>(adminQuizQueryKeys.detail(id), (oldData) => {
          if (!oldData) return oldData;
          return { ...oldData, status: data.status, publishAt: data.publishAt };
        });
        queryClient.invalidateQueries({ queryKey: adminQuizQueryKeys.stats() });
        Toast.show({
          type: "success",
          text1: "Quiz status updated successfully",
          text2: "The quiz status has been updated",
        });
      }
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to update quiz status",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useDeleteAdminQuiz = () =>
  useMutation({
    mutationFn: (id: string) => deleteAdminQuiz(id),
    onSuccess: (_, id) => {
      /* ---- Remove item from all list pages ---- */
      queryClient.setQueriesData<InfiniteData<AdminQuizListResponse>>(
        { queryKey: adminQuizQueryKeys.lists() },
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
      queryClient.removeQueries({ queryKey: adminQuizQueryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: adminQuizQueryKeys.stats() });
      Toast.show({
        type: "success",
        text1: "Quiz deleted successfully",
        text2: "The quiz has been deleted",
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to delete quiz",
        text2: errorMessage || "Please try again later",
      });
    },
  });

/* ---- Query Hooks ---- */
export const useAdminQuizList = (filters: Omit<AdminQuizListInput, "page">) =>
  useInfiniteQuery({
    queryKey: adminQuizQueryKeys.list({ ...filters, page: 1, pageSize: filters.pageSize ?? 20 }),
    queryFn: ({ pageParam = 1 }) =>
      getAdminQuizList({
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

export const useAdminQuizDetail = (id: string, enabled = true) =>
  useQuery({
    queryKey: adminQuizQueryKeys.detail(id),
    queryFn: () => getAdminQuizDetail(id),
    enabled: enabled && !!id,
  });

export const useAdminQuizStatusStats = () =>
  useQuery({
    queryKey: [...adminQuizQueryKeys.stats(), "status"],
    queryFn: () => getAdminQuizStatusStats(),
  });

/* ---- Filter Store ---- */
export const useAdminQuizFilterStore = create<AdminQuizFilterStore>((set) => ({
  /* ---- State ---- */
  ...defaultAdminQuizFilters,

  /* ---- Actions ---- */
  setFilters: (filters) => {
    set((state) => {
      const updates: Partial<AdminQuizFilterStore> = {};
      const filterKeys = Object.keys(filters);
      const filterFields = ["status", "difficulty", "tags", "q"] as const;
      const hasFilterChanges = filterKeys.some((key) => filterFields.includes(key as (typeof filterFields)[number]));

      if (hasFilterChanges && !("page" in filters)) {
        updates.page = 1;
      }

      Object.entries(filters).forEach(([key, value]) => {
        const filterKey = key as keyof AdminQuizFilterStore;
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
    set(defaultAdminQuizFilters);
  },
}));
