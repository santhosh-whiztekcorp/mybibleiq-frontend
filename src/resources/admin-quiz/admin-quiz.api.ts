import { apiClient } from "@/config/apiClient";
import { endpoints } from "@/constants/endpoints";
import { ApiResponseEnvelope } from "@/types/resource";
import { unwrapApiResponse } from "@/utils/network";
import type {
  AdminQuizListInput,
  AdminQuizListResponse,
  AdminQuizDetail,
  CreateAdminQuizInput,
  UpdateAdminQuizInput,
  UpdateAdminQuizStatusInput,
  UpdateAdminQuizStatusResponse,
  AdminQuizStatusStatsResponse,
} from "./admin-quiz.types";

/* ---- List Quizzes ---- */
export const getAdminQuizList = async (input: AdminQuizListInput): Promise<AdminQuizListResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminQuizListResponse>>(endpoints.quizzesAdmin.getAll, {
    params: input,
  });
  return unwrapApiResponse(response);
};

/* ---- Get Quiz Detail ---- */
export const getAdminQuizDetail = async (id: string): Promise<AdminQuizDetail> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminQuizDetail>>(endpoints.quizzesAdmin.getById(id));
  return unwrapApiResponse(response);
};

/* ---- Create Quiz ---- */
export const createAdminQuiz = async (input: CreateAdminQuizInput): Promise<AdminQuizDetail> => {
  const response = await apiClient.post<ApiResponseEnvelope<AdminQuizDetail>>(endpoints.quizzesAdmin.create, input);
  return unwrapApiResponse(response);
};

/* ---- Update Quiz ---- */
export const updateAdminQuiz = async (id: string, input: UpdateAdminQuizInput): Promise<AdminQuizDetail> => {
  const response = await apiClient.put<ApiResponseEnvelope<AdminQuizDetail>>(
    endpoints.quizzesAdmin.updateById(id),
    input
  );
  return unwrapApiResponse(response);
};

/* ---- Update Quiz Status ---- */
export const updateAdminQuizStatus = async (
  id: string,
  input: UpdateAdminQuizStatusInput
): Promise<UpdateAdminQuizStatusResponse> => {
  const response = await apiClient.patch<ApiResponseEnvelope<UpdateAdminQuizStatusResponse>>(
    endpoints.quizzesAdmin.updateStatusById(id),
    input
  );
  return unwrapApiResponse(response);
};

/* ---- Delete Quiz ---- */
export const deleteAdminQuiz = async (id: string): Promise<void> => {
  await apiClient.delete(endpoints.quizzesAdmin.deleteById(id));
};

/* ---- Get Quiz Status Stats ---- */
export const getAdminQuizStatusStats = async (): Promise<AdminQuizStatusStatsResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminQuizStatusStatsResponse>>(
    endpoints.quizzesAdmin.getStatsByStatus
  );
  return response.data;
};
