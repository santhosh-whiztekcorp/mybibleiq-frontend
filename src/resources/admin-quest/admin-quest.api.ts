import { apiClient } from "@/config/apiClient";
import { endpoints } from "@/constants/endpoints";
import { ApiResponseEnvelope } from "@/types/resource";
import { unwrapApiResponse } from "@/utils/network";
import type {
  AdminQuestListInput,
  AdminQuestListResponse,
  AdminQuestDetail,
  CreateAdminQuestInput,
  UpdateAdminQuestInput,
  UpdateAdminQuestStatusInput,
  UpdateAdminQuestStatusResponse,
  AdminQuestStatusStatsResponse,
  AdminQuestStageListInput,
  AdminQuestStageListResponse,
  CreateAdminQuestStageInput,
  UpdateAdminQuestStageInput,
  StageDetail,
  CreateAdminQuestStageResponse,
  UpdateAdminQuestStageResponse,
} from "./admin-quest.types";

/* ---- List Quests ---- */
export const getAdminQuestList = async (input: AdminQuestListInput): Promise<AdminQuestListResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminQuestListResponse>>(endpoints.questsAdmin.getAll, {
    params: input,
  });
  return unwrapApiResponse(response);
};

/* ---- Get Quest Detail ---- */
export const getAdminQuestDetail = async (id: string): Promise<AdminQuestDetail> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminQuestDetail>>(endpoints.questsAdmin.getById(id));
  return unwrapApiResponse(response);
};

/* ---- Create Quest ---- */
export const createAdminQuest = async (input: CreateAdminQuestInput): Promise<AdminQuestDetail> => {
  const response = await apiClient.post<ApiResponseEnvelope<AdminQuestDetail>>(endpoints.questsAdmin.create, input);
  return unwrapApiResponse(response);
};

/* ---- Update Quest ---- */
export const updateAdminQuest = async (id: string, input: UpdateAdminQuestInput): Promise<AdminQuestDetail> => {
  const response = await apiClient.put<ApiResponseEnvelope<AdminQuestDetail>>(
    endpoints.questsAdmin.updateById(id),
    input
  );
  return unwrapApiResponse(response);
};

/* ---- Update Quest Status ---- */
export const updateAdminQuestStatus = async (
  id: string,
  input: UpdateAdminQuestStatusInput
): Promise<UpdateAdminQuestStatusResponse> => {
  const response = await apiClient.patch<ApiResponseEnvelope<UpdateAdminQuestStatusResponse>>(
    endpoints.questsAdmin.updateStatusById(id),
    input
  );
  return unwrapApiResponse(response);
};

/* ---- Delete Quest ---- */
export const deleteAdminQuest = async (id: string): Promise<void> => {
  await apiClient.delete(endpoints.questsAdmin.deleteById(id));
};

/* ---- Get Quest Status Stats ---- */
export const getAdminQuestStatusStats = async (): Promise<AdminQuestStatusStatsResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminQuestStatusStatsResponse>>(
    endpoints.questsAdmin.getStatsByStatus
  );
  return unwrapApiResponse(response);
};

/* ---- Stage Management ---- */

/* ---- List Stages ---- */
export const getAdminQuestStageList = async (
  questId: string,
  input: AdminQuestStageListInput
): Promise<AdminQuestStageListResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminQuestStageListResponse>>(
    endpoints.questsAdmin.stages.getAll(questId),
    {
      params: input,
    }
  );
  return unwrapApiResponse(response);
};

/* ---- Create Stage ---- */
export const createAdminQuestStage = async (
  questId: string,
  input: CreateAdminQuestStageInput
): Promise<CreateAdminQuestStageResponse> => {
  const response = await apiClient.post<ApiResponseEnvelope<CreateAdminQuestStageResponse>>(
    endpoints.questsAdmin.stages.create(questId),
    input
  );
  return unwrapApiResponse(response);
};

/* ---- Get Stage Detail ---- */
export const getAdminQuestStageDetail = async (questId: string, stageId: string): Promise<StageDetail> => {
  const response = await apiClient.get<ApiResponseEnvelope<StageDetail>>(
    endpoints.questsAdmin.stages.getById(questId, stageId)
  );
  return unwrapApiResponse(response);
};

/* ---- Update Stage ---- */
export const updateAdminQuestStage = async (
  questId: string,
  stageId: string,
  input: UpdateAdminQuestStageInput
): Promise<UpdateAdminQuestStageResponse> => {
  const response = await apiClient.put<ApiResponseEnvelope<UpdateAdminQuestStageResponse>>(
    endpoints.questsAdmin.stages.updateById(questId, stageId),
    input
  );
  return response.data;
};

/* ---- Delete Stage ---- */
export const deleteAdminQuestStage = async (questId: string, stageId: string): Promise<void> => {
  await apiClient.delete(endpoints.questsAdmin.stages.deleteById(questId, stageId));
};
