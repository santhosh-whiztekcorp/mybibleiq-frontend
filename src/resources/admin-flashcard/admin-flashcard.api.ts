import { apiClient } from "@/config/apiClient";
import { endpoints } from "@/constants/endpoints";
import { ApiResponseEnvelope } from "@/types/resource";
import { unwrapApiResponse } from "@/utils/network";
import type {
  AdminFlashcardListInput,
  AdminFlashcardListResponse,
  AdminFlashcardDetail,
  CreateAdminFlashcardInput,
  UpdateAdminFlashcardInput,
  UpdateAdminFlashcardStatusInput,
  UpdateAdminFlashcardStatusResponse,
  AdminFlashcardStatusStatsResponse,
} from "./admin-flashcard.types";

/* ---- List Flashcards ---- */
export const getAdminFlashcardList = async (input: AdminFlashcardListInput): Promise<AdminFlashcardListResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminFlashcardListResponse> | AdminFlashcardListResponse>(
    endpoints.flashcardAdmin.getAll,
    { params: input }
  );

  return unwrapApiResponse(response);
};

/* ---- Get Flashcard Detail ---- */
export const getAdminFlashcardDetail = async (id: string): Promise<AdminFlashcardDetail> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminFlashcardDetail> | AdminFlashcardDetail>(
    endpoints.flashcardAdmin.getById(id)
  );

  return unwrapApiResponse(response);
};

/* ---- Create Flashcard ---- */
export const createAdminFlashcard = async (input: CreateAdminFlashcardInput): Promise<AdminFlashcardDetail> => {
  const response = await apiClient.post<ApiResponseEnvelope<AdminFlashcardDetail> | AdminFlashcardDetail>(
    endpoints.flashcardAdmin.create,
    input
  );

  return unwrapApiResponse(response);
};

/* ---- Update Flashcard ---- */
export const updateAdminFlashcard = async (
  id: string,
  input: UpdateAdminFlashcardInput
): Promise<AdminFlashcardDetail> => {
  const response = await apiClient.put<ApiResponseEnvelope<AdminFlashcardDetail> | AdminFlashcardDetail>(
    endpoints.flashcardAdmin.updateById(id),
    input
  );

  return unwrapApiResponse(response);
};

/* ---- Update Flashcard Status ---- */
export const updateAdminFlashcardStatus = async (
  id: string,
  input: UpdateAdminFlashcardStatusInput
): Promise<UpdateAdminFlashcardStatusResponse> => {
  const response = await apiClient.patch<
    ApiResponseEnvelope<UpdateAdminFlashcardStatusResponse> | UpdateAdminFlashcardStatusResponse
  >(endpoints.flashcardAdmin.updateStatusById(id), input);

  return unwrapApiResponse(response);
};

/* ---- Delete Flashcard ---- */
export const deleteAdminFlashcard = async (id: string): Promise<void> => {
  await apiClient.delete(endpoints.flashcardAdmin.deleteById(id));
};

/* ---- Get Flashcard Status Stats ---- */
export const getAdminFlashcardStatusStats = async (): Promise<AdminFlashcardStatusStatsResponse> => {
  const response = await apiClient.get<
    ApiResponseEnvelope<AdminFlashcardStatusStatsResponse> | AdminFlashcardStatusStatsResponse
  >(endpoints.flashcardAdmin.getStatsStatus);

  return unwrapApiResponse(response);
};
