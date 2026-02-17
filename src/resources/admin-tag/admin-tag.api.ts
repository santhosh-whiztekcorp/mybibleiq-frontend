import { apiClient } from "@/config/apiClient";
import { endpoints } from "@/constants/endpoints";
import { ApiResponseEnvelope } from "@/types/resource";
import type {
  AdminTagListInput,
  AdminTagListResponse,
  AdminTagDetail,
  CreateAdminTagInput,
  UpdateAdminTagInput,
  AdminTagStats,
  AdminTagCategory,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "./admin-tag.types";

/* ---- List Tags ---- */
export const getAdminTagList = async (input: AdminTagListInput): Promise<AdminTagListResponse> => {
  const cleanInput = Object.entries(input).reduce((acc, [key, value]) => {
    if (value !== "" && value !== undefined && value !== null) {
      Object.assign(acc, { [key]: value });
    }
    return acc;
  }, {} as AdminTagListInput);

  const response = await apiClient.get<ApiResponseEnvelope<AdminTagListResponse>>(endpoints.tagsAdmin.getAll, {
    params: cleanInput,
  });
  return response.data;
};

/* ---- Get Tag Detail ---- */
export const getAdminTagDetail = async (id: string): Promise<AdminTagDetail> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminTagDetail>>(endpoints.tagsAdmin.getById(id));
  return response.data;
};

/* ---- Create Tag ---- */
export const createAdminTag = async (input: CreateAdminTagInput): Promise<AdminTagDetail> => {
  const response = await apiClient.post<ApiResponseEnvelope<AdminTagDetail>>(endpoints.tagsAdmin.create, input);
  return response.data;
};

/* ---- Update Tag ---- */
export const updateAdminTag = async (id: string, input: UpdateAdminTagInput): Promise<AdminTagDetail> => {
  const response = await apiClient.put<ApiResponseEnvelope<AdminTagDetail>>(endpoints.tagsAdmin.updateById(id), input);
  return response.data;
};

/* ---- Delete Tag ---- */
export const deleteAdminTag = async (id: string): Promise<void> => {
  await apiClient.delete(endpoints.tagsAdmin.deleteById(id));
};

/* ---- Get Stats ---- */
export const getAdminTagStats = async (): Promise<AdminTagStats> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminTagStats>>(endpoints.tagsAdmin.getStats);
  return response.data;
};

/* ---- Categories ---- */
/* ---- List Categories ---- */
export const getAdminTagCategories = async (): Promise<AdminTagCategory[]> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminTagCategory[]>>(endpoints.tagsAdmin.categories.getAll);
  return response.data;
};

/* ---- Create Category ---- */
export const createAdminTagCategory = async (input: CreateCategoryInput): Promise<AdminTagCategory> => {
  const response = await apiClient.post<ApiResponseEnvelope<AdminTagCategory>>(
    endpoints.tagsAdmin.categories.create,
    input
  );
  return response.data;
};

/* ---- Update Category ---- */
export const updateAdminTagCategory = async (id: string, input: UpdateCategoryInput): Promise<AdminTagCategory> => {
  const response = await apiClient.put<ApiResponseEnvelope<AdminTagCategory>>(
    endpoints.tagsAdmin.categories.updateById(id),
    input
  );
  return response.data;
};

/* ---- Delete Category ---- */
export const deleteAdminTagCategory = async (id: string): Promise<void> => {
  await apiClient.delete(endpoints.tagsAdmin.categories.deleteById(id));
};

/* ---- Export Tags ---- */
export const exportAdminTags = async (format: "csv" = "csv"): Promise<string> => {
  const csvContent = (await apiClient.get<string>(endpoints.tagsAdmin.export(format), {
    responseType: "text",
  })) as string;
  return csvContent;
};
