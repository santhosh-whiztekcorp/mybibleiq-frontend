import { zodResolver } from "@hookform/resolvers/zod";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { useForm } from "react-hook-form";
import Toast from "@/lib/toast";
import { queryClient } from "@/config/queryClient";
import { getErrorMessage } from "@/utils/error";
import {
  createAdminSpiritFood,
  updateAdminSpiritFood,
  submitAdminSpiritFood,
  createAndSubmitAdminSpiritFood,
  approveAdminSpiritFood,
  cancelAdminSpiritFood,
  requestDeleteAdminSpiritFood,
  approveDeleteAdminSpiritFood,
  cancelDeleteAdminSpiritFood,
  forceDeleteAdminSpiritFood,
  getAdminSpiritFoodDetail,
  getAdminSpiritFoodList,
  getAdminSpiritFoodStats,
  importPreviewAdminSpiritFood,
  importCommitAdminSpiritFood,
  importReportAdminSpiritFood,
} from "./admin-spirit-food.api";
import { adminSpiritFoodQueryKeys } from "./admin-spirit-food.constants";
import { defaultAdminSpiritFoodFilters, defaultCreateSpiritFoodFormValues } from "./admin-spirit-food.data";
import {
  CreateAdminSpiritFoodRequestSchema,
  UpdateAdminSpiritFoodRequestSchema,
  SubmitAdminSpiritFoodRequestSchema,
  ApproveAdminSpiritFoodRequestSchema,
  CancelAdminSpiritFoodRequestSchema,
  RequestDeleteAdminSpiritFoodRequestSchema,
  ApproveDeleteAdminSpiritFoodRequestSchema,
  CancelDeleteAdminSpiritFoodRequestSchema,
  ForceDeleteAdminSpiritFoodRequestSchema,
} from "./admin-spirit-food.schemas";
import type {
  CreateAdminSpiritFoodInput,
  UpdateAdminSpiritFoodInput,
  SubmitAdminSpiritFoodInput,
  ApproveAdminSpiritFoodInput,
  CancelAdminSpiritFoodInput,
  RequestDeleteAdminSpiritFoodInput,
  ApproveDeleteAdminSpiritFoodInput,
  CancelDeleteAdminSpiritFoodInput,
  ForceDeleteAdminSpiritFoodInput,
  AdminSpiritFoodListInput,
  AdminSpiritFoodFilterStore,
  ImportReportAdminSpiritFoodInput,
  ImportPreviewAdminSpiritFoodInput,
  ImportCommitAdminSpiritFoodInput,
} from "./admin-spirit-food.types";

/* ---- Form Hooks ---- */
export const useCreateAdminSpiritFoodForm = () =>
  useForm<CreateAdminSpiritFoodInput>({
    resolver: zodResolver(CreateAdminSpiritFoodRequestSchema),
    defaultValues: defaultCreateSpiritFoodFormValues,
    mode: "onChange",
  });

export const useUpdateAdminSpiritFoodForm = (initialValues?: CreateAdminSpiritFoodInput) =>
  useForm<UpdateAdminSpiritFoodInput>({
    resolver: zodResolver(UpdateAdminSpiritFoodRequestSchema),
    defaultValues: initialValues ?? defaultCreateSpiritFoodFormValues,
    mode: "onChange",
  });

export const useSubmitAdminSpiritFoodForm = () =>
  useForm<SubmitAdminSpiritFoodInput>({
    resolver: zodResolver(SubmitAdminSpiritFoodRequestSchema),
    mode: "onChange",
  });

export const useApproveAdminSpiritFoodForm = () =>
  useForm<ApproveAdminSpiritFoodInput>({
    resolver: zodResolver(ApproveAdminSpiritFoodRequestSchema),
    mode: "onChange",
  });

export const useCancelAdminSpiritFoodForm = () =>
  useForm<CancelAdminSpiritFoodInput>({
    resolver: zodResolver(CancelAdminSpiritFoodRequestSchema),
    mode: "onChange",
  });

export const useRequestDeleteAdminSpiritFoodForm = () =>
  useForm<RequestDeleteAdminSpiritFoodInput>({
    resolver: zodResolver(RequestDeleteAdminSpiritFoodRequestSchema),
    mode: "onChange",
  });

export const useApproveDeleteAdminSpiritFoodForm = () =>
  useForm<ApproveDeleteAdminSpiritFoodInput>({
    resolver: zodResolver(ApproveDeleteAdminSpiritFoodRequestSchema),
    mode: "onChange",
  });

export const useCancelDeleteAdminSpiritFoodForm = () =>
  useForm<CancelDeleteAdminSpiritFoodInput>({
    resolver: zodResolver(CancelDeleteAdminSpiritFoodRequestSchema),
    mode: "onChange",
  });

export const useForceDeleteAdminSpiritFoodForm = () =>
  useForm<ForceDeleteAdminSpiritFoodInput>({
    resolver: zodResolver(ForceDeleteAdminSpiritFoodRequestSchema),
    mode: "onChange",
  });

/* ---- Mutation Hooks ---- */
export const useCreateAdminSpiritFood = () =>
  useMutation({
    mutationFn: (input: CreateAdminSpiritFoodInput) => createAdminSpiritFood(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminSpiritFoodQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Spirit food created successfully",
          text2: "The spirit food has been created",
        });
      }, 300);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to create spirit food",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useUpdateAdminSpiritFood = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateAdminSpiritFoodInput }) => updateAdminSpiritFood(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminSpiritFoodQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Spirit food updated successfully",
          text2: "The spirit food has been updated",
        });
      }, 300);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to update spirit food",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useSubmitAdminSpiritFood = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: SubmitAdminSpiritFoodInput }) => submitAdminSpiritFood(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminSpiritFoodQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Spirit food submitted successfully",
          text2: "The spirit food has been submitted for review",
        });
      }, 300);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to submit spirit food",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useCreateAndSubmitAdminSpiritFood = () =>
  useMutation({
    mutationFn: (input: CreateAdminSpiritFoodInput) => createAndSubmitAdminSpiritFood(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminSpiritFoodQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Spirit food created and submitted successfully",
          text2: "The spirit food has been created and submitted for review",
        });
      }, 300);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to create and submit spirit food",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useApproveAdminSpiritFood = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: ApproveAdminSpiritFoodInput }) =>
      approveAdminSpiritFood(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminSpiritFoodQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Spirit food approved successfully",
          text2: "The spirit food has been approved",
        });
      }, 300);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to approve spirit food",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useCancelAdminSpiritFood = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: CancelAdminSpiritFoodInput }) => cancelAdminSpiritFood(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminSpiritFoodQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Spirit food cancelled successfully",
          text2: "The spirit food has been cancelled",
        });
      }, 300);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to cancel spirit food",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useRequestDeleteAdminSpiritFood = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: RequestDeleteAdminSpiritFoodInput }) =>
      requestDeleteAdminSpiritFood(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminSpiritFoodQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Delete request submitted successfully",
          text2: "The delete request has been submitted for approval",
        });
      }, 300);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to submit delete request",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useApproveDeleteAdminSpiritFood = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: ApproveDeleteAdminSpiritFoodInput }) =>
      approveDeleteAdminSpiritFood(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminSpiritFoodQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Delete request approved successfully",
          text2: "The spirit food has been deleted",
        });
      }, 300);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to approve delete request",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useCancelDeleteAdminSpiritFood = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: CancelDeleteAdminSpiritFoodInput }) =>
      cancelDeleteAdminSpiritFood(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminSpiritFoodQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Delete request cancelled successfully",
          text2: "The delete request has been cancelled",
        });
      }, 300);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to cancel delete request",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useForceDeleteAdminSpiritFood = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: ForceDeleteAdminSpiritFoodInput }) =>
      forceDeleteAdminSpiritFood(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminSpiritFoodQueryKeys.all });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Spirit food deleted successfully",
          text2: "The spirit food has been force deleted",
        });
      }, 300);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to delete spirit food",
        text2: errorMessage || "Please try again later",
      });
    },
  });

/* ---- Query Hooks ---- */
export const useAdminSpiritFoodList = (filters: Omit<AdminSpiritFoodListInput, "page">) =>
  useInfiniteQuery({
    queryKey: adminSpiritFoodQueryKeys.list({ ...filters, page: 1, pageSize: filters.pageSize ?? 20 }),
    queryFn: ({ pageParam = 1 }) =>
      getAdminSpiritFoodList({
        ...filters,
        page: pageParam,
        pageSize: filters.pageSize ?? 20,
        sort: filters.sort ?? "-createdAt",
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || typeof lastPage.total !== "number") {
        return undefined;
      }
      const totalPages = Math.ceil(lastPage.total / (filters.pageSize ?? 20));
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

export const useAdminSpiritFoodDetail = (id: string, enabled = true) =>
  useQuery({
    queryKey: adminSpiritFoodQueryKeys.detail(id),
    queryFn: () => getAdminSpiritFoodDetail(id),
    enabled: enabled && !!id,
  });

export const useAdminSpiritFoodStats = () =>
  useQuery({
    queryKey: [...adminSpiritFoodQueryKeys.stats()],
    queryFn: () => getAdminSpiritFoodStats(),
  });

export const useImportReportAdminSpiritFood = (input: ImportReportAdminSpiritFoodInput) =>
  useQuery({
    queryKey: adminSpiritFoodQueryKeys.importReport(input.uploadId, input.format),
    queryFn: () => importReportAdminSpiritFood(input),
    enabled: !!input.uploadId,
    staleTime: 0, // Always fetch fresh data
    gcTime: 0, // Don't cache
  });

/* ---- Import Mutation Hooks ---- */
export const useUploadAdminSpiritFoodImportPreview = () =>
  useMutation({
    mutationFn: (input: ImportPreviewAdminSpiritFoodInput) => importPreviewAdminSpiritFood(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: adminSpiritFoodQueryKeys.all });
      setTimeout(() => {
        const message =
          data.invalid > 0
            ? `Found ${data.total} rows: ${data.valid} valid, ${data.invalid} invalid.`
            : `Found ${data.total} valid rows ready for import.`;

        Toast.show({
          type: data.invalid > 0 ? "info" : "success",
          text1: "File Validated",
          text2: message,
        });
      }, 300);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to generate import preview",
        text2: errorMessage || "Please try again later",
      });
    },
  });

export const useCommitAdminSpiritFoodImport = () =>
  useMutation({
    mutationFn: (input: ImportCommitAdminSpiritFoodInput) => importCommitAdminSpiritFood(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: adminSpiritFoodQueryKeys.all });
      setTimeout(() => {
        const message =
          data.failed > 0
            ? `${data.success} entries imported successfully, ${data.failed} failed.`
            : `All ${data.success} entries have been imported successfully.`;

        Toast.show({
          type: data.failed > 0 ? "info" : "success",
          text1: "Bulk Import Complete",
          text2: message,
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

/* ---- Filter Store ---- */
export const useAdminSpiritFoodFilterStore = create<AdminSpiritFoodFilterStore>((set) => ({
  /* ---- State ---- */
  ...defaultAdminSpiritFoodFilters,

  /* ---- Actions ---- */
  setFilters: (filters) => {
    set((state) => {
      const updates: Partial<AdminSpiritFoodFilterStore> = {};
      const filterKeys = Object.keys(filters);
      const filterFields = ["status", "q", "scheduledFrom", "scheduledTo", "scheduledOnly"] as const;
      const hasFilterChanges = filterKeys.some((key) => filterFields.includes(key as (typeof filterFields)[number]));

      if (hasFilterChanges && !("page" in filters)) {
        updates.page = 1;
      }

      Object.entries(filters).forEach(([key, value]) => {
        const filterKey = key as keyof AdminSpiritFoodFilterStore;
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
    set(defaultAdminSpiritFoodFilters);
  },
}));
