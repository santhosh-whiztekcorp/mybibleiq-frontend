import { apiClient } from "@/config/apiClient";
import { endpoints } from "@/constants/endpoints";
import { ApiResponseEnvelope } from "@/types/resource";
import type {
  AdminSpiritFoodListInput,
  AdminSpiritFoodListResponse,
  AdminSpiritFoodDetail,
  CreateAdminSpiritFoodInput,
  UpdateAdminSpiritFoodInput,
  SubmitAdminSpiritFoodInput,
  ApproveAdminSpiritFoodInput,
  CancelAdminSpiritFoodInput,
  RequestDeleteAdminSpiritFoodInput,
  ApproveDeleteAdminSpiritFoodInput,
  CancelDeleteAdminSpiritFoodInput,
  ForceDeleteAdminSpiritFoodInput,
  ImportPreviewAdminSpiritFoodInput,
  ImportCommitAdminSpiritFoodInput,
  ImportReportAdminSpiritFoodInput,
  AdminSpiritFoodStatsResponse,
  CreateAdminSpiritFoodResponse,
  UpdateAdminSpiritFoodResponse,
  SubmitAdminSpiritFoodResponse,
  ApproveAdminSpiritFoodResponse,
  CancelAdminSpiritFoodResponse,
  RequestDeleteAdminSpiritFoodResponse,
  ApproveDeleteAdminSpiritFoodResponse,
  CancelDeleteAdminSpiritFoodResponse,
  ForceDeleteAdminSpiritFoodResponse,
  ImportPreviewAdminSpiritFoodResponse,
  ImportCommitAdminSpiritFoodResponse,
  ImportReportAdminSpiritFoodResponse,
} from "./admin-spirit-food.types";

/* ---- List Entries ---- */
export const getAdminSpiritFoodList = async (input: AdminSpiritFoodListInput): Promise<AdminSpiritFoodListResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminSpiritFoodListResponse> | AdminSpiritFoodListResponse>(
    endpoints.spiritFoodAdmin.getAll,
    { params: input }
  );

  // Handle both wrapped and direct response formats
  if (response && typeof response === "object" && "data" in response && "success" in response) {
    // Wrapped in envelope: { success: true, data: { items: [...], total: 10, ... } }
    return (response as ApiResponseEnvelope<AdminSpiritFoodListResponse>).data;
  }

  // Direct response: { items: [...], total: 10, page: 1, pageSize: 20 }
  // Check if response has the expected structure
  if (response && typeof response === "object" && "items" in response) {
    return response as AdminSpiritFoodListResponse;
  }

  // Fallback: assume direct response format
  return response as unknown as AdminSpiritFoodListResponse;
};

/* ---- Get Entry Detail ---- */
export const getAdminSpiritFoodDetail = async (id: string): Promise<AdminSpiritFoodDetail> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminSpiritFoodDetail>>(
    endpoints.spiritFoodAdmin.getById(id)
  );
  return response.data;
};

/* ---- Create Entry ---- */
export const createAdminSpiritFood = async (
  input: CreateAdminSpiritFoodInput
): Promise<CreateAdminSpiritFoodResponse> => {
  const response = await apiClient.post<ApiResponseEnvelope<CreateAdminSpiritFoodResponse>>(
    endpoints.spiritFoodAdmin.create,
    input
  );
  return response.data;
};

/* ---- Update Entry ---- */
export const updateAdminSpiritFood = async (
  id: string,
  input: UpdateAdminSpiritFoodInput
): Promise<UpdateAdminSpiritFoodResponse> => {
  const response = await apiClient.put<ApiResponseEnvelope<UpdateAdminSpiritFoodResponse>>(
    endpoints.spiritFoodAdmin.updateById(id),
    input
  );
  return response.data;
};

/* ---- Submit Entry ---- */
export const submitAdminSpiritFood = async (
  id: string,
  input: SubmitAdminSpiritFoodInput
): Promise<SubmitAdminSpiritFoodResponse> => {
  const response = await apiClient.post<ApiResponseEnvelope<SubmitAdminSpiritFoodResponse>>(
    endpoints.spiritFoodAdmin.submitById(id),
    input
  );
  return response.data;
};

/* ---- Create and Submit Entry ---- */
export const createAndSubmitAdminSpiritFood = async (
  input: CreateAdminSpiritFoodInput
): Promise<CreateAdminSpiritFoodResponse> => {
  const response = await apiClient.post<ApiResponseEnvelope<CreateAdminSpiritFoodResponse>>(
    endpoints.spiritFoodAdmin.submitAndCreate,
    input
  );
  return response.data;
};

/* ---- Approve Entry ---- */
export const approveAdminSpiritFood = async (
  id: string,
  input: ApproveAdminSpiritFoodInput
): Promise<ApproveAdminSpiritFoodResponse> => {
  const response = await apiClient.post<ApiResponseEnvelope<ApproveAdminSpiritFoodResponse>>(
    endpoints.spiritFoodAdmin.approveById(id),
    input
  );
  return response.data;
};

/* ---- Cancel Entry ---- */
export const cancelAdminSpiritFood = async (
  id: string,
  input: CancelAdminSpiritFoodInput
): Promise<CancelAdminSpiritFoodResponse> => {
  const response = await apiClient.post<ApiResponseEnvelope<CancelAdminSpiritFoodResponse>>(
    endpoints.spiritFoodAdmin.cancelById(id),
    input
  );
  return response.data;
};

/* ---- Request Delete Entry ---- */
export const requestDeleteAdminSpiritFood = async (
  id: string,
  input: RequestDeleteAdminSpiritFoodInput
): Promise<RequestDeleteAdminSpiritFoodResponse> => {
  const response = await apiClient.post<ApiResponseEnvelope<RequestDeleteAdminSpiritFoodResponse>>(
    endpoints.spiritFoodAdmin.requestDeleteById(id),
    input
  );
  return response.data;
};

/* ---- Approve Delete Entry ---- */
export const approveDeleteAdminSpiritFood = async (
  id: string,
  input: ApproveDeleteAdminSpiritFoodInput
): Promise<ApproveDeleteAdminSpiritFoodResponse> => {
  const response = await apiClient.post<ApiResponseEnvelope<ApproveDeleteAdminSpiritFoodResponse>>(
    endpoints.spiritFoodAdmin.approveDeleteById(id),
    input
  );
  return response.data;
};

/* ---- Cancel Delete Request ---- */
export const cancelDeleteAdminSpiritFood = async (
  id: string,
  input: CancelDeleteAdminSpiritFoodInput
): Promise<CancelDeleteAdminSpiritFoodResponse> => {
  const response = await apiClient.post<ApiResponseEnvelope<CancelDeleteAdminSpiritFoodResponse>>(
    endpoints.spiritFoodAdmin.cancelDeleteById(id),
    input
  );
  return response.data;
};

/* ---- Force Delete Entry ---- */
export const forceDeleteAdminSpiritFood = async (
  id: string,
  input: ForceDeleteAdminSpiritFoodInput
): Promise<ForceDeleteAdminSpiritFoodResponse> => {
  const response = await apiClient.delete<ApiResponseEnvelope<ForceDeleteAdminSpiritFoodResponse>>(
    endpoints.spiritFoodAdmin.forceDeleteById(id),
    { data: input }
  );
  return response.data;
};

/* ---- Get Stats ---- */
export const getAdminSpiritFoodStats = async (): Promise<AdminSpiritFoodStatsResponse> => {
  const response = await apiClient.get<ApiResponseEnvelope<AdminSpiritFoodStatsResponse>>(
    endpoints.spiritFoodAdmin.getStats
  );
  return response.data;
};

/* ---- Import Preview ---- */
export const importPreviewAdminSpiritFood = async (
  input: ImportPreviewAdminSpiritFoodInput
): Promise<ImportPreviewAdminSpiritFoodResponse> => {
  const formData = new FormData();

  // Append CSV file
  // For web: if input.file is a File object, use it directly
  // For React Native: use the uri/name/type format and convert to Blob
  if (input.file instanceof File) {
    formData.append("file", input.file);
  } else if ("uri" in input.file && typeof input.file.uri === "string") {
    // React Native format - convert data URL or blob URL to Blob
    if (input.file.uri.startsWith("data:")) {
      // Data URL format
      const response = await fetch(input.file.uri);
      const blob = await response.blob();
      formData.append("file", blob, input.file.name);
    } else if (input.file.uri.startsWith("blob:")) {
      // Blob URL format (from URL.createObjectURL)
      const response = await fetch(input.file.uri);
      const blob = await response.blob();
      formData.append("file", blob, input.file.name);
    } else {
      // Other URI formats (e.g., file://, http://)
      try {
        const response = await fetch(input.file.uri);
        const blob = await response.blob();
        formData.append("file", blob, input.file.name);
      } catch {
        // Fallback: create a Blob from the object metadata
        // This won't work for actual file content but may be needed for some cases
        const blob = new Blob([], { type: input.file.type });
        formData.append("file", blob, input.file.name);
      }
    }
  } else {
    // Fallback: try to create a Blob from the object
    const blob = new Blob([], { type: input.file.type });
    formData.append("file", blob, input.file.name);
  }

  // Append optional submitAfterUpload
  if (input.submitAfterUpload !== undefined) {
    formData.append("submitAfterUpload", String(input.submitAfterUpload));
  }

  // Backend returns the response directly (not wrapped in envelope)
  const response = await apiClient.post<ImportPreviewAdminSpiritFoodResponse>(
    endpoints.spiritFoodAdmin.getImportPreview,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};

/* ---- Import Commit ---- */
export const importCommitAdminSpiritFood = async (
  input: ImportCommitAdminSpiritFoodInput
): Promise<ImportCommitAdminSpiritFoodResponse> => {
  // Backend returns the response directly (not wrapped in envelope)
  const response = await apiClient.post<ImportCommitAdminSpiritFoodResponse>(
    endpoints.spiritFoodAdmin.commitImport,
    input
  );
  return response;
};

/* ---- Import Report ---- */
export const importReportAdminSpiritFood = async (
  input: ImportReportAdminSpiritFoodInput
): Promise<ImportReportAdminSpiritFoodResponse> => {
  // Backend may return wrapped response with mime and body
  const response = await apiClient.get<ImportReportAdminSpiritFoodResponse | { mime: string; body: string }>(
    endpoints.spiritFoodAdmin.getImportReport,
    { params: input }
  );

  // Handle wrapped response format: { mime: "application/json", body: "json string" }
  if (response && typeof response === "object" && "mime" in response && "body" in response) {
    try {
      const parsedBody = typeof response.body === "string" ? JSON.parse(response.body) : response.body;
      return parsedBody as ImportReportAdminSpiritFoodResponse;
    } catch (error) {
      throw error;
    }
  }

  // Return direct response
  return response as ImportReportAdminSpiritFoodResponse;
};
