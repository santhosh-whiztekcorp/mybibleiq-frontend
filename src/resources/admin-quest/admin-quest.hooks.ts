import { zodResolver } from "@hookform/resolvers/zod";
import { useInfiniteQuery, useMutation, useQuery, InfiniteData } from "@tanstack/react-query";
import { create } from "zustand";
import { useForm } from "react-hook-form";
import Toast from "@/lib/toast";
import { queryClient } from "@/config/queryClient";
import { getErrorMessage } from "@/utils/error";
import {
  createAdminQuest,
  deleteAdminQuest,
  getAdminQuestDetail,
  getAdminQuestList,
  getAdminQuestStatusStats,
  updateAdminQuest,
  updateAdminQuestStatus,
  getAdminQuestStageList,
  createAdminQuestStage,
  getAdminQuestStageDetail,
  updateAdminQuestStage,
  deleteAdminQuestStage,
} from "./admin-quest.api";
import { adminQuestQueryKeys } from "./admin-quest.constants";
import {
  defaultAdminQuestFilters,
  defaultCreateQuestFormValues,
  defaultCreateStageFormValues,
} from "./admin-quest.data";
import {
  CreateAdminQuestRequestSchema,
  UpdateAdminQuestRequestSchema,
  UpdateAdminQuestStatusSchema,
  CreateAdminQuestStageRequestSchema,
  UpdateAdminQuestStageRequestSchema,
} from "./admin-quest.schemas";
import type {
  CreateAdminQuestInput,
  UpdateAdminQuestInput,
  UpdateAdminQuestStatusInput,
  AdminQuestListInput,
  AdminQuestFilterStore,
  AdminQuestStageListInput,
  CreateAdminQuestStageInput,
  UpdateAdminQuestStageInput,
  AdminQuestListResponse,
  AdminQuestSummary,
  AdminQuestDetail,
} from "./admin-quest.types";

/* ---- Form Hooks ---- */
export const useCreateAdminQuestForm = () =>
  useForm<CreateAdminQuestInput>({
    resolver: zodResolver(CreateAdminQuestRequestSchema),
    defaultValues: defaultCreateQuestFormValues,
    mode: "onChange",
  });

export const useUpdateAdminQuestForm = (initialValues?: CreateAdminQuestInput) =>
  useForm<UpdateAdminQuestInput>({
    resolver: zodResolver(UpdateAdminQuestRequestSchema),
    defaultValues: initialValues ?? defaultCreateQuestFormValues,
    mode: "onChange",
  });

export const useUpdateAdminQuestStatusForm = () =>
  useForm<UpdateAdminQuestStatusInput>({
    resolver: zodResolver(UpdateAdminQuestStatusSchema),
    mode: "onChange",
  });

/* ---- Mutation Hooks ---- */
export const useCreateAdminQuest = () =>
  useMutation({
    mutationFn: (input: CreateAdminQuestInput) => createAdminQuest(input),
    onSuccess: (data) => {
      /* ---- Prepend to first page of all list variants ---- */
      queryClient.setQueriesData<InfiniteData<AdminQuestListResponse>>(
        { queryKey: adminQuestQueryKeys.lists() },
        (oldData) => {
          if (!oldData) return oldData;
          const newItem: AdminQuestSummary = {
            id: data.id,
            title: data.title,
            description: data.description,
            status: data.status,
            totalStages: 0,
            tags: data.tags ?? [],
            publishAt: data.publishAt,
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
      queryClient.invalidateQueries({ queryKey: adminQuestQueryKeys.statsStatus() });
      Toast.show({
        type: "success",
        text1: "Quest created successfully",
        text2: "The quest has been created",
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to create quest",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useUpdateAdminQuest = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateAdminQuestInput }) => updateAdminQuest(id, input),
    onSuccess: (data, { id }) => {
      /* ---- Update item in all list pages ---- */
      queryClient.setQueriesData<InfiniteData<AdminQuestListResponse>>(
        { queryKey: adminQuestQueryKeys.lists() },
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
                      tags: data.tags ?? [],
                      updatedAt: data.updatedAt,
                    }
                  : item
              ),
            })),
          };
        }
      );
      /* ---- Update detail cache ---- */
      queryClient.setQueryData<AdminQuestDetail>(adminQuestQueryKeys.detail(id), data);
      Toast.show({
        type: "success",
        text1: "Quest updated successfully",
        text2: "The quest has been updated",
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to update quest",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useUpdateAdminQuestStatus = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateAdminQuestStatusInput }) =>
      updateAdminQuestStatus(id, input),
    onSuccess: (data, { id, input }) => {
      if (input.action === "Clone") {
        /* ---- Clone creates a new quest — invalidate list so it appears ---- */
        queryClient.invalidateQueries({ queryKey: adminQuestQueryKeys.lists() });
        queryClient.invalidateQueries({ queryKey: adminQuestQueryKeys.statsStatus() });
        Toast.show({
          type: "success",
          text1: "Quest cloned successfully",
          text2: "A draft copy of the quest has been created",
        });
      } else {
        /* ---- Publish / Archive / Schedule: update existing item's status ---- */
        queryClient.setQueriesData<InfiniteData<AdminQuestListResponse>>(
          { queryKey: adminQuestQueryKeys.lists() },
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
        queryClient.setQueryData<AdminQuestDetail>(adminQuestQueryKeys.detail(id), (oldData) => {
          if (!oldData) return oldData;
          return { ...oldData, status: data.status };
        });
        queryClient.invalidateQueries({ queryKey: adminQuestQueryKeys.statsStatus() });
        Toast.show({
          type: "success",
          text1: "Quest status updated successfully",
          text2: "The quest status has been updated",
        });
      }
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to update quest status",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useDeleteAdminQuest = () =>
  useMutation({
    mutationFn: (id: string) => deleteAdminQuest(id),
    onSuccess: (_, id) => {
      /* ---- Remove item from all list pages ---- */
      queryClient.setQueriesData<InfiniteData<AdminQuestListResponse>>(
        { queryKey: adminQuestQueryKeys.lists() },
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
      queryClient.removeQueries({ queryKey: adminQuestQueryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: adminQuestQueryKeys.statsStatus() });
      Toast.show({
        type: "success",
        text1: "Quest deleted successfully",
        text2: "The quest has been deleted",
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to delete quest",
        text2: errorMessage || "Please try again later",
      });
    },
  });

/* ---- Query Hooks ---- */
export const useAdminQuestList = (filters: Omit<AdminQuestListInput, "page">) =>
  useInfiniteQuery({
    queryKey: adminQuestQueryKeys.list({ ...filters, page: 1, pageSize: filters.pageSize ?? 20 }),
    queryFn: ({ pageParam = 1 }) =>
      getAdminQuestList({
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

export const useAdminQuestDetail = (id: string, enabled = true) =>
  useQuery({
    queryKey: adminQuestQueryKeys.detail(id),
    queryFn: () => getAdminQuestDetail(id),
    enabled: enabled && !!id,
  });

export const useAdminQuestStatusStats = () =>
  useQuery({
    queryKey: adminQuestQueryKeys.statsStatus(),
    queryFn: () => getAdminQuestStatusStats(),
  });

/* ---- Stage Form Hooks ---- */
export const useCreateAdminQuestStageForm = () =>
  useForm<CreateAdminQuestStageInput>({
    resolver: zodResolver(CreateAdminQuestStageRequestSchema),
    defaultValues: defaultCreateStageFormValues,
    mode: "onChange",
  });

export const useUpdateAdminQuestStageForm = (initialValues?: CreateAdminQuestStageInput) =>
  useForm<UpdateAdminQuestStageInput>({
    resolver: zodResolver(UpdateAdminQuestStageRequestSchema),
    defaultValues: initialValues ?? defaultCreateStageFormValues,
    mode: "onChange",
  });

/* ---- Stage Mutation Hooks ---- */
export const useCreateAdminQuestStage = () =>
  useMutation({
    mutationFn: ({ questId, input }: { questId: string; input: CreateAdminQuestStageInput }) =>
      createAdminQuestStage(questId, input),
    onSuccess: (_, { questId }) => {
      /* ---- Increment stage count in list + invalidate the stage list for this quest ---- */
      queryClient.setQueriesData<InfiniteData<AdminQuestListResponse>>(
        { queryKey: adminQuestQueryKeys.lists() },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              items: page.items.map((item) =>
                item.id === questId ? { ...item, totalStages: item.totalStages + 1 } : item
              ),
            })),
          };
        }
      );
      /* ---- Invalidate the stage list query for this quest ---- */
      queryClient.invalidateQueries({ queryKey: [...adminQuestQueryKeys.detail(questId), "stages"] });
      Toast.show({
        type: "success",
        text1: "Stage created successfully",
        text2: "The stage has been created",
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to create quest stage",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useUpdateAdminQuestStage = () =>
  useMutation({
    mutationFn: ({
      questId,
      stageId,
      input,
    }: {
      questId: string;
      stageId: string;
      input: UpdateAdminQuestStageInput;
    }) => updateAdminQuestStage(questId, stageId, input),
    onSuccess: (data, { questId, stageId }) => {
      /* ---- Invalidate stage list + update detail ---- */
      queryClient.invalidateQueries({ queryKey: [...adminQuestQueryKeys.detail(questId), "stages"] });
      queryClient.setQueryData([...adminQuestQueryKeys.detail(questId), "stages", stageId], data);
      Toast.show({
        type: "success",
        text1: "Stage updated successfully",
        text2: "The stage has been updated",
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to update quest stage",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useDeleteAdminQuestStage = () =>
  useMutation({
    mutationFn: ({ questId, stageId }: { questId: string; stageId: string }) => deleteAdminQuestStage(questId, stageId),
    onSuccess: (_, { questId, stageId }) => {
      /* ---- Decrement stage count in list + invalidate the stage list ---- */
      queryClient.setQueriesData<InfiniteData<AdminQuestListResponse>>(
        { queryKey: adminQuestQueryKeys.lists() },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              items: page.items.map((item) =>
                item.id === questId ? { ...item, totalStages: Math.max(0, item.totalStages - 1) } : item
              ),
            })),
          };
        }
      );
      queryClient.removeQueries({ queryKey: [...adminQuestQueryKeys.detail(questId), "stages", stageId] });
      queryClient.invalidateQueries({ queryKey: [...adminQuestQueryKeys.detail(questId), "stages"] });
      Toast.show({
        type: "success",
        text1: "Stage deleted successfully",
        text2: "The stage has been deleted",
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to delete quest stage",
        text2: errorMessage || "Please try again later",
      });
    },
  });

/* ---- Stage Query Hooks ---- */
export const useAdminQuestStageList = (questId: string, filters: AdminQuestStageListInput, enabled = true) =>
  useQuery({
    queryKey: [...adminQuestQueryKeys.detail(questId), "stages", "list", filters],
    queryFn: () => getAdminQuestStageList(questId, filters),
    enabled: enabled && !!questId,
  });

export const useAdminQuestStageDetail = (questId: string, stageId: string, enabled = true) =>
  useQuery({
    queryKey: [...adminQuestQueryKeys.detail(questId), "stages", stageId],
    queryFn: () => getAdminQuestStageDetail(questId, stageId),
    enabled: enabled && !!questId && !!stageId,
  });

/* ---- Filter Store ---- */
export const useAdminQuestFilterStore = create<AdminQuestFilterStore>((set) => ({
  /* ---- State ---- */
  ...defaultAdminQuestFilters,

  /* ---- Actions ---- */
  setFilters: (filters) => {
    set((state) => {
      const updates: Partial<AdminQuestFilterStore> = {};
      const filterKeys = Object.keys(filters);
      const filterFields = ["status", "tag", "q"] as const;
      const hasFilterChanges = filterKeys.some((key) => filterFields.includes(key as (typeof filterFields)[number]));

      if (hasFilterChanges && !("page" in filters)) {
        updates.page = 1;
      }

      Object.entries(filters).forEach(([key, value]) => {
        const filterKey = key as keyof AdminQuestFilterStore;
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
    set(defaultAdminQuestFilters);
  },
}));
