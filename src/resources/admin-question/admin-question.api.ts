import { apiClient } from "@/config/apiClient";
import { endpoints } from "@/constants/endpoints";
import { ApiResponseEnvelope } from "@/types/resource";
import type {
  AdminQuestionListInput,
  AdminQuestionListResponse,
  AdminQuestionDetail,
  CreateAdminQuestionInput,
  UpdateAdminQuestionInput,
  UpdateAdminQuestionStatusInput,
  UpdateAdminQuestionStatusResponse,
  AdminQuestionTypeStatsResponse,
  AdminQuestionStatusStatsResponse,
  ImportPreviewAdminQuestionInput,
  ImportPreviewAdminQuestionResponse,
  ImportCommitAdminQuestionInput,
  ImportCommitAdminQuestionResponse,
  ImportReportAdminQuestionInput,
  ImportReportAdminQuestionResponse,
} from "./admin-question.types";

/* ---- List Questions ---- */
export const getAdminQuestionList = async (input: AdminQuestionListInput): Promise<AdminQuestionListResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminQuestionListResponse>>(
    endpoints.questionsAdmin.getAll,
    { params: input }
  );
  return response.data;
};

/* ---- Get Question Detail ---- */
export const getAdminQuestionDetail = async (id: string): Promise<AdminQuestionDetail> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminQuestionDetail>>(endpoints.questionsAdmin.getById(id));
  return response.data;
};

/* ---- Create Question ---- */
export const createAdminQuestion = async (input: CreateAdminQuestionInput): Promise<AdminQuestionDetail> => {
  const response = await apiClient.post<ApiResponseEnvelope<AdminQuestionDetail>>(
    endpoints.questionsAdmin.create,
    input
  );
  return response.data;
};

/* ---- Update Question ---- */
export const updateAdminQuestion = async (
  id: string,
  input: UpdateAdminQuestionInput
): Promise<AdminQuestionDetail> => {
  const response = await apiClient.put<ApiResponseEnvelope<AdminQuestionDetail>>(
    endpoints.questionsAdmin.updateById(id),
    input
  );
  return response.data;
};

/* ---- Update Question Status ---- */
export const updateAdminQuestionStatus = async (
  id: string,
  input: UpdateAdminQuestionStatusInput
): Promise<UpdateAdminQuestionStatusResponse> => {
  const response = await apiClient.patch<ApiResponseEnvelope<UpdateAdminQuestionStatusResponse>>(
    endpoints.questionsAdmin.updateStatusById(id),
    input
  );
  return response.data;
};

/* ---- Delete Question ---- */
export const deleteAdminQuestion = async (id: string): Promise<void> => {
  await apiClient.delete(endpoints.questionsAdmin.deleteById(id));
};

/* ---- Get Question Type Stats ---- */
export const getAdminQuestionTypeStats = async (): Promise<AdminQuestionTypeStatsResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminQuestionTypeStatsResponse>>(
    endpoints.questionsAdmin.getStats
  );
  return response.data;
};

/* ---- Get Question Status Stats ---- */
export const getAdminQuestionStatusStats = async (): Promise<AdminQuestionStatusStatsResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminQuestionStatusStatsResponse>>(
    endpoints.questionsAdmin.getStatsByStatus
  );
  return response.data;
};

/* ---- Import Preview ---- */
export const importPreviewAdminQuestion = async (
  input: ImportPreviewAdminQuestionInput
): Promise<ImportPreviewAdminQuestionResponse> => {
  const formData = new FormData();

  // Append CSV file
  formData.append("file", input.file);

  // Append optional submitAfterUpload as query parameter
  const params: { submitAfterUpload?: string } = {};
  if (input.submitAfterUpload !== undefined) {
    params.submitAfterUpload = String(input.submitAfterUpload);
  }

  // Backend returns the response directly (not wrapped in envelope)
  const response = await apiClient.post<ImportPreviewAdminQuestionResponse>(
    endpoints.questionsAdmin.importPreview,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params,
    }
  );
  return response;
};

/* ---- Import Commit ---- */
export const importCommitAdminQuestion = async (
  input: ImportCommitAdminQuestionInput
): Promise<ImportCommitAdminQuestionResponse> => {
  // Backend returns the response directly (not wrapped in envelope)
  const response = await apiClient.post<ImportCommitAdminQuestionResponse>(
    endpoints.questionsAdmin.importCommit,
    input
  );
  return response;
};

/* ---- Import Report ---- */
export const importReportAdminQuestion = async (
  input: ImportReportAdminQuestionInput
): Promise<ImportReportAdminQuestionResponse> => {
  // Backend may return wrapped response with mime and body, or direct JSON
  const response = await apiClient.get<ImportReportAdminQuestionResponse | { mime: string; body: string }>(
    endpoints.questionsAdmin.getImportReport,
    { params: input }
  );

  // Handle wrapped response format: { mime: "application/json", body: "json string" }
  if (response && typeof response === "object" && "mime" in response && "body" in response) {
    try {
      const parsedBody = typeof response.body === "string" ? JSON.parse(response.body) : response.body;
      return parsedBody as ImportReportAdminQuestionResponse;
    } catch (error) {
      throw error;
    }
  }

  // Return direct response
  return response as ImportReportAdminQuestionResponse;
};
