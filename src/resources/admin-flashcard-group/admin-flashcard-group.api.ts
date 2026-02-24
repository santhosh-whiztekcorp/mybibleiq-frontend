import { apiClient } from "@/config/apiClient";
import { endpoints } from "@/constants/endpoints";
import { ApiResponseEnvelope } from "@/types/resource";
import { unwrapApiResponse } from "@/utils/network";
import type {
  AdminFlashcardGroupListInput,
  AdminFlashcardGroupListResponse,
  AdminFlashcardGroupDetail,
  CreateAdminFlashcardGroupInput,
  UpdateAdminFlashcardGroupInput,
  UpdateAdminFlashcardGroupFlashcardsInput,
  UpdateAdminFlashcardGroupStatusInput,
  UpdateAdminFlashcardGroupStatusResponse,
  UpdateAdminFlashcardGroupFlashcardsResponse,
  AdminFlashcardGroupStatusStatsResponse,
} from "./admin-flashcard-group.types";

/* ---- List Flashcard Groups ---- */
export const getAdminFlashcardGroupList = async (
  input: AdminFlashcardGroupListInput
): Promise<AdminFlashcardGroupListResponse> => {
  const response = await apiClient.get<
    ApiResponseEnvelope<AdminFlashcardGroupListResponse> | AdminFlashcardGroupListResponse
  >(endpoints.flashcardGroupAdmin.getAll, { params: input });

  return unwrapApiResponse(response);
};

/* ---- Get Flashcard Group Detail ---- */
export const getAdminFlashcardGroupDetail = async (id: string): Promise<AdminFlashcardGroupDetail> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminFlashcardGroupDetail> | AdminFlashcardGroupDetail>(
    endpoints.flashcardGroupAdmin.getById(id)
  );

  return unwrapApiResponse(response);
};

/* ---- Create Flashcard Group ---- */
export const createAdminFlashcardGroup = async (
  input: CreateAdminFlashcardGroupInput
): Promise<AdminFlashcardGroupDetail> => {
  const response = await apiClient.post<ApiResponseEnvelope<AdminFlashcardGroupDetail> | AdminFlashcardGroupDetail>(
    endpoints.flashcardGroupAdmin.create,
    input
  );

  return unwrapApiResponse(response);
};

/* ---- Update Flashcard Group ---- */
export const updateAdminFlashcardGroup = async (
  id: string,
  input: UpdateAdminFlashcardGroupInput
): Promise<AdminFlashcardGroupDetail> => {
  const response = await apiClient.put<ApiResponseEnvelope<AdminFlashcardGroupDetail> | AdminFlashcardGroupDetail>(
    endpoints.flashcardGroupAdmin.updateById(id),
    input
  );

  return unwrapApiResponse(response);
};

/* ---- Update Flashcard Group Flashcards ---- */
export const updateAdminFlashcardGroupFlashcards = async (
  id: string,
  input: UpdateAdminFlashcardGroupFlashcardsInput
): Promise<UpdateAdminFlashcardGroupFlashcardsResponse> => {
  const response = await apiClient.put<
    ApiResponseEnvelope<UpdateAdminFlashcardGroupFlashcardsResponse> | UpdateAdminFlashcardGroupFlashcardsResponse
  >(endpoints.flashcardGroupAdmin.updateFlashcardsById(id), input);

  return unwrapApiResponse(response);
};

/* ---- Update Flashcard Group Status ---- */
export const updateAdminFlashcardGroupStatus = async (
  id: string,
  input: UpdateAdminFlashcardGroupStatusInput
): Promise<UpdateAdminFlashcardGroupStatusResponse> => {
  const response = await apiClient.patch<
    ApiResponseEnvelope<UpdateAdminFlashcardGroupStatusResponse> | UpdateAdminFlashcardGroupStatusResponse
  >(endpoints.flashcardGroupAdmin.updateStatusById(id), input);

  return unwrapApiResponse(response);
};

/* ---- Delete Flashcard Group ---- */
export const deleteAdminFlashcardGroup = async (id: string): Promise<void> => {
  await apiClient.delete(endpoints.flashcardGroupAdmin.deleteById(id));
};

/* ---- Get Flashcard Group Status Stats ---- */
export const getAdminFlashcardGroupStatusStats = async (): Promise<AdminFlashcardGroupStatusStatsResponse> => {
  const response = await apiClient.get<
    ApiResponseEnvelope<AdminFlashcardGroupStatusStatsResponse> | AdminFlashcardGroupStatusStatsResponse
  >(endpoints.flashcardGroupAdmin.getStatsStatus);

  return unwrapApiResponse(response);
};
