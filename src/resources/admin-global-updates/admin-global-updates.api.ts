import { apiClient } from "@/config/apiClient";
import { endpoints } from "@/constants/endpoints";
import { ApiResponseEnvelope } from "@/types/resource";
import { unwrapApiResponse } from "@/utils/network";
import type {
  CreateGlobalUpdateInput,
  GlobalUpdateDetail,
  GlobalUpdateListInput,
  GlobalUpdateListResponse,
  GlobalUpdateStatsResponse,
  UpdateGlobalUpdateInput,
  CreateGlobalUpdateResponse,
  UpdateGlobalUpdateResponse,
  DeliverGlobalUpdateResponse,
} from "./admin-global-updates.types";

/* ---- List Global Updates ---- */
export const getGlobalUpdateList = async (input: GlobalUpdateListInput): Promise<GlobalUpdateListResponse> => {
  const params = { ...input };
  if (!params.search) delete params.search;
  if (!params.type) delete params.type;
  if (!params.status) delete params.status;

  const response = await apiClient.get<ApiResponseEnvelope<GlobalUpdateListResponse> | GlobalUpdateListResponse>(
    endpoints.globalUpdatesAdmin.getAll,
    {
      params,
    }
  );
  return unwrapApiResponse(response);
};

/* ---- Get Global Update Stats ---- */
export const getGlobalUpdateStats = async (): Promise<GlobalUpdateStatsResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<GlobalUpdateStatsResponse> | GlobalUpdateStatsResponse>(
    endpoints.globalUpdatesAdmin.getStats
  );
  return unwrapApiResponse(response);
};

/* ---- Get Global Update Detail ---- */
export const getGlobalUpdateDetail = async (id: string): Promise<GlobalUpdateDetail> => {
  const response = await apiClient.get<
    ApiResponseEnvelope<{ update: GlobalUpdateDetail }> | { update: GlobalUpdateDetail }
  >(endpoints.globalUpdatesAdmin.getById(id));
  const data = unwrapApiResponse<{ update: GlobalUpdateDetail }>(response);
  return data.update;
};

/* ---- Create Global Update ---- */
export const createGlobalUpdate = async (input: CreateGlobalUpdateInput): Promise<GlobalUpdateDetail> => {
  const response = await apiClient.post<ApiResponseEnvelope<CreateGlobalUpdateResponse> | CreateGlobalUpdateResponse>(
    endpoints.globalUpdatesAdmin.create,
    input
  );
  const data = unwrapApiResponse<CreateGlobalUpdateResponse>(response);
  return data.update;
};

/* ---- Update Global Update ---- */
export const updateGlobalUpdate = async (id: string, input: UpdateGlobalUpdateInput): Promise<GlobalUpdateDetail> => {
  const response = await apiClient.put<ApiResponseEnvelope<UpdateGlobalUpdateResponse> | UpdateGlobalUpdateResponse>(
    endpoints.globalUpdatesAdmin.updateById(id),
    input
  );
  const data = unwrapApiResponse<UpdateGlobalUpdateResponse>(response);
  return data.update;
};

/* ---- Delete Global Update ---- */
export const deleteGlobalUpdate = async (id: string): Promise<void> => {
  await apiClient.delete(endpoints.globalUpdatesAdmin.deleteById(id));
};

/* ---- Deliver Global Update ---- */
export const deliverGlobalUpdate = async (id: string): Promise<DeliverGlobalUpdateResponse> => {
  const response = await apiClient.post<ApiResponseEnvelope<DeliverGlobalUpdateResponse> | DeliverGlobalUpdateResponse>(
    endpoints.globalUpdatesAdmin.deliver(id)
  );
  return unwrapApiResponse(response);
};
