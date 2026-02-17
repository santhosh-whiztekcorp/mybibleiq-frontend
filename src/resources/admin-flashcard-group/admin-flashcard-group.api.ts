import { apiClient } from "@/config/apiClient";
import { endpoints } from "@/constants/endpoints";
import { ApiResponseEnvelope } from "@/types/resource";
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
  const response = await apiClient.get<ApiResponseEnvelope<AdminFlashcardGroupListResponse>>(
    endpoints.flashcardGroupAdmin.getAll,
    { params: input }
  );

  // Handle both wrapped and unwrapped responses
  if (response && "data" in response && response.data) {
    return response.data;
  }

  // If response is already the list response (not wrapped)
  if (response && "items" in response) {
    return response as unknown as AdminFlashcardGroupListResponse;
  }

  throw new Error("Unexpected API response structure");
};

/* ---- Get Flashcard Group Detail ---- */
export const getAdminFlashcardGroupDetail = async (id: string): Promise<AdminFlashcardGroupDetail> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminFlashcardGroupDetail>>(
    endpoints.flashcardGroupAdmin.getById(id)
  );

  // Handle both wrapped and unwrapped responses
  if (response && "data" in response && response.data) {
    return response.data;
  }

  // If response is already the detail (not wrapped)
  if (response && "id" in response) {
    return response as unknown as AdminFlashcardGroupDetail;
  }

  throw new Error("Unexpected API response structure");
};

/* ---- Create Flashcard Group ---- */
export const createAdminFlashcardGroup = async (
  input: CreateAdminFlashcardGroupInput
): Promise<AdminFlashcardGroupDetail> => {
  const response = await apiClient.post<ApiResponseEnvelope<AdminFlashcardGroupDetail>>(
    endpoints.flashcardGroupAdmin.create,
    input
  );
  return response.data;
};

/* ---- Update Flashcard Group ---- */
export const updateAdminFlashcardGroup = async (
  id: string,
  input: UpdateAdminFlashcardGroupInput
): Promise<AdminFlashcardGroupDetail> => {
  const response = await apiClient.put<ApiResponseEnvelope<AdminFlashcardGroupDetail>>(
    endpoints.flashcardGroupAdmin.updateById(id),
    input
  );
  return response.data;
};

/* ---- Update Flashcard Group Flashcards ---- */
export const updateAdminFlashcardGroupFlashcards = async (
  id: string,
  input: UpdateAdminFlashcardGroupFlashcardsInput
): Promise<UpdateAdminFlashcardGroupFlashcardsResponse> => {
  const response = await apiClient.put<ApiResponseEnvelope<UpdateAdminFlashcardGroupFlashcardsResponse>>(
    endpoints.flashcardGroupAdmin.updateFlashcardsById(id),
    input
  );
  return response.data;
};

/* ---- Update Flashcard Group Status ---- */
export const updateAdminFlashcardGroupStatus = async (
  id: string,
  input: UpdateAdminFlashcardGroupStatusInput
): Promise<UpdateAdminFlashcardGroupStatusResponse> => {
  const response = await apiClient.patch<ApiResponseEnvelope<UpdateAdminFlashcardGroupStatusResponse>>(
    endpoints.flashcardGroupAdmin.updateStatusById(id),
    input
  );
  return response.data;
};

/* ---- Delete Flashcard Group ---- */
export const deleteAdminFlashcardGroup = async (id: string): Promise<void> => {
  await apiClient.delete(endpoints.flashcardGroupAdmin.deleteById(id));
};

/* ---- Get Flashcard Group Status Stats ---- */
export const getAdminFlashcardGroupStatusStats = async (): Promise<AdminFlashcardGroupStatusStatsResponse> => {
  /* ---- API returns data directly, not wrapped in envelope ---- */
  const response = await apiClient.get<AdminFlashcardGroupStatusStatsResponse>(
    endpoints.flashcardGroupAdmin.getStatsStatus
  );
  return response;
};
