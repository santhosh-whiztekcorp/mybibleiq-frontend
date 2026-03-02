import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { queryClient } from "@/config/queryClient";
import {
  getTodaysSpiritFood,
  getSavedVerses,
  getSpiritFoodDetail,
  getRecentMessages,
  saveVerse,
  removeSavedVerse,
  getDeliveryPreferences,
  updateDeliveryPreferences,
} from "./user-spirit-food.api";
import { userSpiritFoodQueryKeys } from "./user-spirit-food.constants";
import { defaultUpdateDeliveryPreferencesFormValues } from "./user-spirit-food.data";
import { UpdateDeliveryPreferencesRequestSchema } from "./user-spirit-food.schemas";
import type {
  TodaysSpiritFoodInput,
  SavedVersesInput,
  RecentMessagesInput,
  UpdateDeliveryPreferencesInput,
} from "./user-spirit-food.types";

/* ---- Form Hooks ---- */
export const useUpdateDeliveryPreferencesForm = () =>
  useForm<UpdateDeliveryPreferencesInput>({
    resolver: zodResolver(UpdateDeliveryPreferencesRequestSchema),
    defaultValues: defaultUpdateDeliveryPreferencesFormValues,
    mode: "onChange",
  });

/* ---- Query Hooks ---- */
export const useTodaysSpiritFood = (input: TodaysSpiritFoodInput, enabled = true) =>
  useQuery({
    queryKey: userSpiritFoodQueryKeys.todays(input.tz),
    queryFn: () => getTodaysSpiritFood(input),
    enabled: enabled && !!input.tz,
    retry: false,
  });

export const useSavedVerses = (input: SavedVersesInput, enabled = true) =>
  useQuery({
    queryKey: userSpiritFoodQueryKeys.saved(input.cursor, input.limit),
    queryFn: () => getSavedVerses(input),
    enabled,
  });

export const useSpiritFoodDetail = (id: string, enabled = true) =>
  useQuery({
    queryKey: userSpiritFoodQueryKeys.detail(id),
    queryFn: () => getSpiritFoodDetail(id),
    enabled: enabled && !!id,
  });

export const useRecentMessages = (input: RecentMessagesInput, enabled = true) =>
  useQuery({
    queryKey: userSpiritFoodQueryKeys.recentMessages(input.limit),
    queryFn: () => getRecentMessages(input),
    enabled,
  });

export const useDeliveryPreferences = (enabled = true) =>
  useQuery({
    queryKey: userSpiritFoodQueryKeys.deliveryPreferences(),
    queryFn: () => getDeliveryPreferences(),
    enabled,
  });

/* ---- Mutation Hooks ---- */
export const useSaveVerse = () =>
  useMutation({
    mutationFn: (id: string) => saveVerse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userSpiritFoodQueryKeys.all });
    },
  });

export const useRemoveSavedVerse = () =>
  useMutation({
    mutationFn: (id: string) => removeSavedVerse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userSpiritFoodQueryKeys.all });
    },
  });

export const useUpdateDeliveryPreferences = () =>
  useMutation({
    mutationFn: (input: UpdateDeliveryPreferencesInput) => updateDeliveryPreferences(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userSpiritFoodQueryKeys.all });
    },
  });
