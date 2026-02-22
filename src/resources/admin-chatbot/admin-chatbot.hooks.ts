import { zodResolver } from "@hookform/resolvers/zod";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { create } from "zustand";
import { useForm } from "react-hook-form";
import Toast from "@/lib/toast";
import { queryClient } from "@/config/queryClient";
import { getErrorMessage } from "@/utils/error";
import {
  getChatbotConfig,
  updateChatbotConfig,
  getChatbotQuickActions,
  updateChatbotQuickActions,
  getChatbotResponseList,
  createChatbotResponse,
  updateChatbotResponse,
  deleteChatbotResponse,
  getChatbotStats,
  getChatbotTotalConversations,
  getChatbotAvgResponseTime,
  getChatbotMostAskedQuestions,
  getChatbotConversationList,
  getChatbotConversationDetail,
  getChatbotConversationStats,
} from "./admin-chatbot.api";
import { adminChatbotQueryKeys } from "./admin-chatbot.constants";
import {
  defaultUpdateConfigValues,
  defaultCreateResponseValues,
  defaultResponseFilters,
  defaultConversationFilters,
} from "./admin-chatbot.data";
import {
  UpdateChatbotConfigRequestSchema,
  CreateChatbotResponseRequestSchema,
  UpdateChatbotResponseRequestSchema,
  UpdateChatbotQuickActionRequestSchema,
} from "./admin-chatbot.schemas";
import type {
  UpdateChatbotConfigInput,
  UpdateChatbotQuickActionInput,
  CreateChatbotResponseInput,
  UpdateChatbotResponseInput,
  ChatbotResponseListInput,
  ChatbotResponseFilterStore,
  ChatbotConversationListInput,
  ChatbotConversationFilterStore,
} from "./admin-chatbot.types";

/* ---- Config Hooks ---- */
export const useChatbotConfig = () =>
  useQuery({
    queryKey: adminChatbotQueryKeys.config(),
    queryFn: getChatbotConfig,
  });

export const useUpdateChatbotConfigForm = (initialValues?: UpdateChatbotConfigInput) =>
  useForm<UpdateChatbotConfigInput>({
    resolver: zodResolver(UpdateChatbotConfigRequestSchema),
    defaultValues: initialValues ?? defaultUpdateConfigValues,
    mode: "onChange",
  });

export const useUpdateChatbotConfig = () =>
  useMutation({
    mutationFn: (input: UpdateChatbotConfigInput) => updateChatbotConfig(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminChatbotQueryKeys.config() });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Config updated successfully",
          text2: "Chatbot configuration has been saved.",
        });
      }, 300);
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to update config",
        text2: errorMessage || "Please try again later",
      });
    },
  });

/* ---- Quick Action Hooks ---- */
export const useChatbotQuickActionList = (enabledOnly = false) =>
  useQuery({
    queryKey: adminChatbotQueryKeys.quickActions(enabledOnly),
    queryFn: () => getChatbotQuickActions(enabledOnly),
  });

export const useUpdateQuickActionForm = (initialValues: UpdateChatbotQuickActionInput = {}) =>
  useForm<UpdateChatbotQuickActionInput>({
    resolver: zodResolver(UpdateChatbotQuickActionRequestSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

export const useUpdateChatbotQuickActions = () =>
  useMutation({
    mutationFn: (quickActions: { section: string; label: string; enabled: boolean; sortOrder: number }[]) =>
      updateChatbotQuickActions(quickActions),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminChatbotQueryKeys.quickActions(false) });
      queryClient.invalidateQueries({ queryKey: adminChatbotQueryKeys.quickActions(true) });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Quick Action updated",
        });
      }, 300);
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Failed to update quick action",
        text2: getErrorMessage(error),
      });
    },
  });

/* ---- Response (FAQ) Hooks ---- */
export const useChatbotResponseList = (filters: Omit<ChatbotResponseListInput, "page">) =>
  useInfiniteQuery({
    queryKey: adminChatbotQueryKeys.responseList({ ...filters, page: 1, pageSize: filters.pageSize ?? 20 }),
    queryFn: ({ pageParam = 1 }) =>
      getChatbotResponseList({
        ...filters,
        page: pageParam,
        pageSize: filters.pageSize ?? 20,
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

export const useCreateResponseForm = () =>
  useForm<CreateChatbotResponseInput>({
    resolver: zodResolver(CreateChatbotResponseRequestSchema),
    defaultValues: defaultCreateResponseValues,
    mode: "onChange",
  });

export const useUpdateResponseForm = (initialValues: CreateChatbotResponseInput) =>
  useForm<UpdateChatbotResponseInput>({
    resolver: zodResolver(UpdateChatbotResponseRequestSchema),
    defaultValues: initialValues,
    mode: "onChange",
  });

export const useCreateChatbotResponse = () =>
  useMutation({
    mutationFn: (input: CreateChatbotResponseInput) => createChatbotResponse(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminChatbotQueryKeys.responses() });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Response created",
        });
      }, 300);
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Failed to create response",
        text2: getErrorMessage(error),
      });
    },
  });

export const useUpdateChatbotResponse = () =>
  useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateChatbotResponseInput }) => updateChatbotResponse(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminChatbotQueryKeys.responses() });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Response updated",
        });
      }, 300);
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Failed to update response",
        text2: getErrorMessage(error),
      });
    },
  });

export const useDeleteChatbotResponse = () =>
  useMutation({
    mutationFn: (id: string) => deleteChatbotResponse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminChatbotQueryKeys.responses() });
      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Response deleted",
        });
      }, 300);
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Failed to delete response",
        text2: getErrorMessage(error),
      });
    },
  });

export const useChatbotResponseFilterStore = create<ChatbotResponseFilterStore>((set) => ({
  ...defaultResponseFilters,
  setFilters: (filters) =>
    set((state) => {
      const updates: Partial<ChatbotResponseFilterStore> = {};
      const filterKeys = ["category", "q"] as const;
      const isResponseFilterKey = (key: string): key is (typeof filterKeys)[number] =>
        (filterKeys as readonly string[]).includes(key);
      const hasFilterChanges = Object.keys(filters).some(isResponseFilterKey);

      if (hasFilterChanges && !filters.page) {
        updates.page = 1;
      }

      return { ...state, ...filters, ...updates };
    }),
  resetFilters: () => set(defaultResponseFilters),
}));

/* ---- Analytics & Logs Hooks ---- */
export const useChatbotStats = () =>
  useQuery({
    queryKey: adminChatbotQueryKeys.stats(),
    queryFn: getChatbotStats,
  });

export const useChatbotTotalConversations = () =>
  useQuery({
    queryKey: adminChatbotQueryKeys.totalConversations(),
    queryFn: getChatbotTotalConversations,
  });

export const useChatbotAvgResponseTime = () =>
  useQuery({
    queryKey: adminChatbotQueryKeys.avgResponseTime(),
    queryFn: getChatbotAvgResponseTime,
  });

export const useChatbotMostAskedQuestions = () =>
  useQuery({
    queryKey: adminChatbotQueryKeys.mostAskedQuestions(),
    queryFn: getChatbotMostAskedQuestions,
  });

export const useChatbotConversationStats = () =>
  useQuery({
    queryKey: ["admin-chatbot-conversation-stats"],
    queryFn: getChatbotConversationStats,
  });

export const useChatbotConversationList = (filters: Omit<ChatbotConversationListInput, "page">) =>
  useInfiniteQuery({
    queryKey: adminChatbotQueryKeys.conversationList({ ...filters, page: 1, pageSize: filters.pageSize ?? 20 }),
    queryFn: ({ pageParam = 1 }) =>
      getChatbotConversationList({
        ...filters,
        page: pageParam,
        pageSize: filters.pageSize ?? 20,
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

export const useChatbotConversationDetail = (id: string) =>
  useInfiniteQuery({
    queryKey: adminChatbotQueryKeys.conversationDetail(id),
    queryFn: ({ pageParam = 1 }) => getChatbotConversationDetail(id, pageParam as number),
    enabled: !!id,
    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.messages.page;
      const totalPages = Math.ceil(lastPage.messages.total / lastPage.messages.pageSize);
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

export const useChatbotConversationFilterStore = create<ChatbotConversationFilterStore>((set) => ({
  ...defaultConversationFilters,
  setFilters: (filters) =>
    set((state) => {
      const updates: Partial<ChatbotConversationFilterStore> = {};
      const filterKeys = ["status", "userId", "sort"] as const;
      const isConversationFilterKey = (key: string): key is (typeof filterKeys)[number] =>
        (filterKeys as readonly string[]).includes(key);
      const hasFilterChanges = Object.keys(filters).some(isConversationFilterKey);

      if (hasFilterChanges && !filters.page) {
        updates.page = 1;
      }

      return { ...state, ...filters, ...updates };
    }),
  resetFilters: () => set(defaultConversationFilters),
}));
