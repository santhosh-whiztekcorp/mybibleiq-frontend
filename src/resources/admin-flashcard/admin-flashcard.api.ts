import { apiClient } from "@/config/apiClient";
import { endpoints } from "@/constants/endpoints";
import { ApiResponseEnvelope } from "@/types/resource";
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
  const response = await apiClient.get<ApiResponseEnvelope<AdminFlashcardListResponse>>(
    endpoints.flashcardAdmin.getAll,
    { params: input }
  );

  // Handle both wrapped and unwrapped responses
  if (response && "data" in response && response.data) {
    return response.data;
  }

  // If response is already the list response (not wrapped)
  if (response && "items" in response) {
    return response as unknown as AdminFlashcardListResponse;
  }

  throw new Error("Unexpected API response structure");
};

/* ---- Get Flashcard Detail ---- */
export const getAdminFlashcardDetail = async (id: string): Promise<AdminFlashcardDetail> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminFlashcardDetail>>(endpoints.flashcardAdmin.getById(id));

  // Handle both wrapped and unwrapped responses
  if (response && "data" in response && response.data) {
    return response.data;
  }

  // If response is already the detail (not wrapped)
  if (response && "id" in response) {
    return response as unknown as AdminFlashcardDetail;
  }

  throw new Error("Unexpected API response structure");
};

/* ---- Create Flashcard ---- */
export const createAdminFlashcard = async (input: CreateAdminFlashcardInput): Promise<AdminFlashcardDetail> => {
  const response = await apiClient.post<ApiResponseEnvelope<AdminFlashcardDetail>>(
    endpoints.flashcardAdmin.create,
    input
  );
  return response.data;
};

/* ---- Update Flashcard ---- */
export const updateAdminFlashcard = async (
  id: string,
  input: UpdateAdminFlashcardInput
): Promise<AdminFlashcardDetail> => {
  const response = await apiClient.put<ApiResponseEnvelope<AdminFlashcardDetail>>(
    endpoints.flashcardAdmin.updateById(id),
    input
  );
  return response.data;
};

/* ---- Update Flashcard Status ---- */
export const updateAdminFlashcardStatus = async (
  id: string,
  input: UpdateAdminFlashcardStatusInput
): Promise<UpdateAdminFlashcardStatusResponse> => {
  const response = await apiClient.patch<ApiResponseEnvelope<UpdateAdminFlashcardStatusResponse>>(
    endpoints.flashcardAdmin.updateStatusById(id),
    input
  );
  return response.data;
};

/* ---- Delete Flashcard ---- */
export const deleteAdminFlashcard = async (id: string): Promise<void> => {
  await apiClient.delete(endpoints.flashcardAdmin.deleteById(id));
};

/* ---- Get Flashcard Status Stats ---- */
export const getAdminFlashcardStatusStats = async (): Promise<AdminFlashcardStatusStatsResponse> => {
  /* ---- API returns data directly, not wrapped in envelope ---- */
  const response = await apiClient.get<AdminFlashcardStatusStatsResponse>(endpoints.flashcardAdmin.getStatsStatus);
  return response;
};
