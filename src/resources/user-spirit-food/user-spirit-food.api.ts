import { apiClient } from "@/config/apiClient";
import { endpoints } from "@/constants/endpoints";
import { ApiResponseEnvelope } from "@/types/resource";
import type {
  TodaysSpiritFoodInput,
  SavedVersesInput,
  RecentMessagesInput,
  UpdateDeliveryPreferencesInput,
  TodaysSpiritFoodResponse,
  SavedVersesResponse,
  SpiritFoodDetailResponse,
  RecentMessageResponse,
  SaveVerseResponse,
  DeliveryPreferencesResponse,
} from "./user-spirit-food.types";

/* ---- Get Today's Spirit Food ---- */
export const getTodaysSpiritFood = async (input: TodaysSpiritFoodInput): Promise<TodaysSpiritFoodResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<TodaysSpiritFoodResponse>>(
    endpoints.spiritFoodUser.getToday,
    { params: input }
  );
  return response.data;
};

/* ---- Get Saved Verses ---- */
export const getSavedVerses = async (input: SavedVersesInput): Promise<SavedVersesResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<SavedVersesResponse>>(endpoints.spiritFoodUser.getSaved, {
    params: input,
  });
  return response.data;
};

/* ---- Get Spirit Food Detail ---- */
export const getSpiritFoodDetail = async (id: string): Promise<SpiritFoodDetailResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<SpiritFoodDetailResponse>>(
    endpoints.spiritFoodUser.getById(id)
  );
  return response.data;
};

/* ---- Get Recent Messages ---- */
export const getRecentMessages = async (input: RecentMessagesInput): Promise<RecentMessageResponse[]> => {
  const response = await apiClient.get<ApiResponseEnvelope<RecentMessageResponse[]>>(
    endpoints.spiritFoodUser.getRecentMessages,
    { params: input }
  );
  return response.data;
};

/* ---- Save Verse ---- */
export const saveVerse = async (id: string): Promise<SaveVerseResponse> => {
  const response = await apiClient.post<ApiResponseEnvelope<SaveVerseResponse>>(
    endpoints.spiritFoodUser.saveVerseById(id)
  );
  return response.data;
};

/* ---- Remove Saved Verse ---- */
export const removeSavedVerse = async (id: string): Promise<void> => {
  await apiClient.delete(endpoints.spiritFoodUser.removeSavedVerseById(id));
};

/* ---- Get Delivery Preferences ---- */
export const getDeliveryPreferences = async (): Promise<DeliveryPreferencesResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<DeliveryPreferencesResponse>>(
    endpoints.spiritFoodUser.getDeliveryPreferences
  );
  return response.data;
};

/* ---- Update Delivery Preferences ---- */
export const updateDeliveryPreferences = async (
  input: UpdateDeliveryPreferencesInput
): Promise<DeliveryPreferencesResponse> => {
  const response = await apiClient.put<ApiResponseEnvelope<DeliveryPreferencesResponse>>(
    endpoints.spiritFoodUser.updateDeliveryPreferences,
    input
  );
  return response.data;
};
