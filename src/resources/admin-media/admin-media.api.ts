import { apiClient } from "@/config/apiClient";
import { endpoints } from "@/constants/endpoints";
import { ApiResponseEnvelope } from "@/types/resource";
import type {
  AdminMediaListInput,
  AdminMediaListResponse,
  AdminMediaDetail,
  CreateAdminMediaInput,
  UpdateAdminMediaInput,
  UpdateAdminMediaStatusInput,
  UpdateAdminMediaStatusResponse,
  AdminMediaTypeStatsResponse,
} from "./admin-media.types";

/* ---- List Media ---- */
export const getAdminMediaList = async (input: AdminMediaListInput): Promise<AdminMediaListResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminMediaListResponse>>(endpoints.mediaAdmin.getAll, {
    params: input,
  });
  return response.data;
};

/* ---- Get Media Detail ---- */
export const getAdminMediaDetail = async (id: string): Promise<AdminMediaDetail> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminMediaDetail>>(endpoints.mediaAdmin.getById(id));
  return response.data;
};

/* ---- Create Media ---- */
export const createAdminMedia = async (input: CreateAdminMediaInput): Promise<AdminMediaDetail> => {
  const formData = new FormData();

  // Append form fields first
  formData.append("title", input.title);
  formData.append("type", input.type);
  formData.append("sizeBytes", String(input.sizeBytes));

  if (input.caption) {
    formData.append("caption", input.caption);
  }

  if (input.duration) {
    formData.append("duration", String(input.duration));
  }

  if (input.tags && input.tags.length > 0) {
    input.tags.forEach((tag) => {
      formData.append("tags", tag);
    });
  }

  // Append file last (as per API requirement)
  if (input.file) {
    if ("file" in input.file && input.file.file) {
      formData.append("file", input.file.file);
    } else if (input.file instanceof Blob) {
      formData.append("file", input.file);
    }
  }

  const response = await apiClient.post<ApiResponseEnvelope<AdminMediaDetail>>(endpoints.mediaAdmin.create, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

/* ---- Update Media ---- */
export const updateAdminMedia = async (id: string, input: UpdateAdminMediaInput): Promise<AdminMediaDetail> => {
  const formData = new FormData();

  // Append form fields first
  formData.append("title", input.title);
  formData.append("type", input.type);
  formData.append("sizeBytes", String(input.sizeBytes));

  if (input.caption) {
    formData.append("caption", input.caption);
  }

  if (input.duration) {
    formData.append("duration", String(input.duration));
  }

  if (input.tags && input.tags.length > 0) {
    input.tags.forEach((tag) => {
      formData.append("tags", tag);
    });
  }

  // Append file only if it's a new file (Blob)
  if (input.file && input.file.uri) {
    const isNewFile = !input.file.uri.startsWith("http://") && !input.file.uri.startsWith("https://");
    if (isNewFile && "file" in input.file && input.file.file) {
      formData.append("file", input.file.file);
    }
  }

  const response = await apiClient.put<ApiResponseEnvelope<AdminMediaDetail>>(
    endpoints.mediaAdmin.updateById(id),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

/* ---- Update Media Status ---- */
export const updateAdminMediaStatus = async (
  id: string,
  input: UpdateAdminMediaStatusInput
): Promise<UpdateAdminMediaStatusResponse> => {
  const response = await apiClient.patch<ApiResponseEnvelope<UpdateAdminMediaStatusResponse>>(
    endpoints.mediaAdmin.updateStatusById(id),
    input
  );
  return response.data;
};

/* ---- Delete Media ---- */
export const deleteAdminMedia = async (id: string): Promise<void> => {
  await apiClient.delete(endpoints.mediaAdmin.deleteById(id));
};

/* ---- Get Media Type Stats ---- */
export const getAdminMediaTypeStats = async (): Promise<AdminMediaTypeStatsResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminMediaTypeStatsResponse>>(endpoints.mediaAdmin.getStats);
  return response.data;
};
