import { apiClient } from "@/config/apiClient";
import { endpoints } from "@/constants/endpoints";
import { ApiResponseEnvelope } from "@/types/resource";
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
  return response.data;
};

/* ---- Get Quest Detail ---- */
export const getAdminQuestDetail = async (id: string): Promise<AdminQuestDetail> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminQuestDetail>>(endpoints.questsAdmin.getById(id));
  return response.data;
};

/* ---- Create Quest ---- */
export const createAdminQuest = async (input: CreateAdminQuestInput): Promise<AdminQuestDetail> => {
  const response = await apiClient.post<ApiResponseEnvelope<AdminQuestDetail>>(endpoints.questsAdmin.create, input);
  return response.data;
};

/* ---- Update Quest ---- */
export const updateAdminQuest = async (id: string, input: UpdateAdminQuestInput): Promise<AdminQuestDetail> => {
  const response = await apiClient.put<ApiResponseEnvelope<AdminQuestDetail>>(
    endpoints.questsAdmin.updateById(id),
    input
  );
  return response.data;
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
  return response.data;
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
  return response.data;
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
  return response.data;
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
  return response.data;
};

/* ---- Get Stage Detail ---- */
export const getAdminQuestStageDetail = async (questId: string, stageId: string): Promise<StageDetail> => {
  const response = await apiClient.get<ApiResponseEnvelope<StageDetail>>(
    endpoints.questsAdmin.stages.getById(questId, stageId)
  );
  return response.data;
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
