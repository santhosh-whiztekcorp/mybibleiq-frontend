import { zodResolver } from "@hookform/resolvers/zod";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { useForm } from "react-hook-form";
import type { Resolver } from "react-hook-form";
import Toast from "@/lib/toast";
import { queryClient } from "@/config/queryClient";
import { getErrorMessage } from "@/utils/error";
import {
  createAdminQuestion,
  deleteAdminQuestion,
  getAdminQuestionDetail,
  getAdminQuestionList,
  getAdminQuestionStatusStats,
  getAdminQuestionTypeStats,
  updateAdminQuestion,
  updateAdminQuestionStatus,
  importPreviewAdminQuestion,
  importCommitAdminQuestion,
  importReportAdminQuestion,
} from "./admin-question.api";
import { adminQuestionQueryKeys } from "./admin-question.constants";
import { defaultAdminQuestionFilters, defaultCreateQuestionFormValues } from "./admin-question.data";
import {
  CreateAdminQuestionRequestSchema,
  UpdateAdminQuestionRequestSchema,
  UpdateAdminQuestionStatusSchema,
  stripInactiveTypeConfigs,
} from "./admin-question.schemas";
import type {
  CreateAdminQuestionInput,
  UpdateAdminQuestionInput,
  UpdateAdminQuestionStatusInput,
  AdminQuestionListInput,
  AdminQuestionFilterStore,
  ImportPreviewAdminQuestionInput,
  ImportCommitAdminQuestionInput,
  ImportReportAdminQuestionInput,
} from "./admin-question.types";

const createQuestionResolver = zodResolver(CreateAdminQuestionRequestSchema);
const updateQuestionResolver = zodResolver(UpdateAdminQuestionRequestSchema);

const createQuestionResolverWithPreprocess: Resolver<CreateAdminQuestionInput> = async (values, context, options) => {
  const preprocessed = stripInactiveTypeConfigs(values) as CreateAdminQuestionInput;
  return createQuestionResolver(preprocessed, context, options);
};

const updateQuestionResolverWithPreprocess: Resolver<UpdateAdminQuestionInput> = async (values, context, options) => {
  const preprocessed = stripInactiveTypeConfigs(values) as UpdateAdminQuestionInput;
  return updateQuestionResolver(preprocessed, context, options);
};

/* ---- Form Hooks ---- */
export const useCreateAdminQuestionForm = () =>
  useForm<CreateAdminQuestionInput>({
    resolver: createQuestionResolverWithPreprocess,
    defaultValues: defaultCreateQuestionFormValues,
    mode: "onChange",
  });

export const useUpdateAdminQuestionForm = (initialValues?: CreateAdminQuestionInput) =>
  useForm<UpdateAdminQuestionInput>({
    resolver: updateQuestionResolverWithPreprocess,
    defaultValues: initialValues ?? defaultCreateQuestionFormValues,
    mode: "onChange",
  });

export const useUpdateAdminQuestionStatusForm = () =>
  useForm<UpdateAdminQuestionStatusInput>({
    resolver: zodResolver(UpdateAdminQuestionStatusSchema),
    mode: "onChange",
  });

/* ---- Mutation Hooks ---- */
export const useCreateAdminQuestion = () =>
  useMutation({
    mutationFn: (input: CreateAdminQuestionInput) => createAdminQuestion(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQuestionQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Question created successfully",
          text2: "The question has been created",
        });
      }, 300);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to create question",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useUpdateAdminQuestion = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateAdminQuestionInput }) => updateAdminQuestion(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQuestionQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Question updated successfully",
          text2: "The question has been updated",
        });
      }, 300);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to update question",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useUpdateAdminQuestionStatus = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateAdminQuestionStatusInput }) =>
      updateAdminQuestionStatus(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQuestionQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Question status updated successfully",
          text2: "The question status has been updated",
        });
      }, 300);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to update question status",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useDeleteAdminQuestion = () =>
  useMutation({
    mutationFn: (id: string) => deleteAdminQuestion(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQuestionQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Question deleted successfully",
          text2: "The question has been deleted",
        });
      }, 300);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to delete question",
        text2: errorMessage || "Please try again later",
      });
    },
  });

/* ---- Import Mutation Hooks ---- */
export const useUploadAdminQuestionImportPreview = () =>
  useMutation({
    mutationFn: (input: ImportPreviewAdminQuestionInput) => importPreviewAdminQuestion(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQuestionQueryKeys.all });
    },
  });

export const useCommitAdminQuestionImport = () =>
  useMutation({
    mutationFn: (input: ImportCommitAdminQuestionInput) => importCommitAdminQuestion(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQuestionQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Import completed successfully",
          text2: "The questions have been imported",
        });
      }, 300);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to commit import",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useImportReportAdminQuestion = (input: ImportReportAdminQuestionInput) =>
  useQuery({
    queryKey: adminQuestionQueryKeys.importReport(input.uploadId, input.format),
    queryFn: () => importReportAdminQuestion(input),
    enabled: !!input.uploadId,
    staleTime: 0, // Always fetch fresh data
    gcTime: 0, // Don't cache
  });

/* ---- Query Hooks ---- */
export const useAdminQuestionList = (filters: Omit<AdminQuestionListInput, "page">) =>
  useInfiniteQuery({
    queryKey: adminQuestionQueryKeys.list({ ...filters, page: 1, pageSize: filters.pageSize ?? 20 }),
    queryFn: ({ pageParam = 1 }) =>
      getAdminQuestionList({
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

export const useAdminQuestionDetail = (id: string, enabled = true) =>
  useQuery({
    queryKey: adminQuestionQueryKeys.detail(id),
    queryFn: () => getAdminQuestionDetail(id),
    enabled: enabled && !!id,
  });

export const useAdminQuestionTypeStats = () =>
  useQuery({
    queryKey: [...adminQuestionQueryKeys.stats(), "types"],
    queryFn: () => getAdminQuestionTypeStats(),
  });

export const useAdminQuestionStatusStats = () =>
  useQuery({
    queryKey: [...adminQuestionQueryKeys.stats(), "status"],
    queryFn: () => getAdminQuestionStatusStats(),
  });

/* ---- Filter Store ---- */
export const useAdminQuestionFilterStore = create<AdminQuestionFilterStore>((set) => ({
  /* ---- State ---- */
  ...defaultAdminQuestionFilters,

  /* ---- Actions ---- */
  setFilters: (filters) => {
    set((state) => {
      const updates: Partial<AdminQuestionFilterStore> = {};
      const filterKeys = Object.keys(filters);
      const filterFields = ["status", "type", "tags", "q"] as const;
      const hasFilterChanges = filterKeys.some((key) => filterFields.includes(key as (typeof filterFields)[number]));

      if (hasFilterChanges && !("page" in filters)) {
        updates.page = 1;
      }

      Object.entries(filters).forEach(([key, value]) => {
        const filterKey = key as keyof AdminQuestionFilterStore;
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
    set(defaultAdminQuestionFilters);
  },
}));
