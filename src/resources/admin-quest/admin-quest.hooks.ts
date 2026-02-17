import { zodResolver } from "@hookform/resolvers/zod";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQuestQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Quest created successfully",
          text2: "The quest has been created",
        });
      }, 300);
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQuestQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Quest updated successfully",
          text2: "The quest has been updated",
        });
      }, 300);
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQuestQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Quest status updated successfully",
          text2: "The quest status has been updated",
        });
      }, 300);
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQuestQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Quest deleted successfully",
          text2: "The quest has been deleted",
        });
      }, 300);
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQuestQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Stage created successfully",
          text2: "The stage has been created",
        });
      }, 300);
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQuestQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Stage updated successfully",
          text2: "The stage has been updated",
        });
      }, 300);
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQuestQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Stage deleted successfully",
          text2: "The stage has been deleted",
        });
      }, 300);
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
