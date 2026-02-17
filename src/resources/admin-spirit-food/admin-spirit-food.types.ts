import { z } from "zod";
import {
  AdminSpiritFoodStatusEnum,
  CreateAdminSpiritFoodRequestSchema,
  UpdateAdminSpiritFoodRequestSchema,
  SubmitAdminSpiritFoodRequestSchema,
  ApproveAdminSpiritFoodRequestSchema,
  CancelAdminSpiritFoodRequestSchema,
  RequestDeleteAdminSpiritFoodRequestSchema,
  ApproveDeleteAdminSpiritFoodRequestSchema,
  CancelDeleteAdminSpiritFoodRequestSchema,
  ForceDeleteAdminSpiritFoodRequestSchema,
  ImportPreviewAdminSpiritFoodRequestSchema,
  ImportCommitAdminSpiritFoodRequestSchema,
  ImportReportAdminSpiritFoodRequestSchema,
} from "./admin-spirit-food.schemas";

/* ---- Enum Types ---- */
export type AdminSpiritFoodStatus = z.infer<typeof AdminSpiritFoodStatusEnum>;

/* ---- Spirit Food Entry Types ---- */
export type AdminSpiritFoodSummary = {
  id: string;
  revisionId: number;
  status: AdminSpiritFoodStatus;
  scheduledDate: string;
  verseReference: string;
  bibleVersion: string;
  concatenatedText: string;
  reflectionText: string | null;
  makerUserId: string | null;
  checkerUserId: string | null;
  makerUserName?: string | null;
  checkerUserName?: string | null;
  approvalComment: string | null;
  approvedAt: string | null;
  canceledAt: string | null;
  deliveredAt: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AdminSpiritFoodDetail = AdminSpiritFoodSummary;

/* ---- Response Types ---- */
export type AdminSpiritFoodStatsResponse = {
  status: AdminSpiritFoodStatus;
  count: number;
}[];

export type AdminSpiritFoodListResponse = {
  items: AdminSpiritFoodSummary[];
  total: number;
  page: number;
  pageSize: number;
};

export type AdminSpiritFoodResponse = AdminSpiritFoodDetail;
export type CreateAdminSpiritFoodResponse = AdminSpiritFoodDetail;
export type UpdateAdminSpiritFoodResponse = AdminSpiritFoodDetail;
export type SubmitAdminSpiritFoodResponse = AdminSpiritFoodDetail;
export type ApproveAdminSpiritFoodResponse = AdminSpiritFoodDetail;
export type CancelAdminSpiritFoodResponse = AdminSpiritFoodDetail;
export type RequestDeleteAdminSpiritFoodResponse = AdminSpiritFoodDetail;
export type ApproveDeleteAdminSpiritFoodResponse = AdminSpiritFoodDetail;
export type CancelDeleteAdminSpiritFoodResponse = AdminSpiritFoodDetail;

export type ForceDeleteAdminSpiritFoodResponse = {
  success: boolean;
  message: string;
};

/* ---- Import Response Types ---- */
export type ImportPreviewAdminSpiritFoodResponse = {
  uploadId: string;
  total: number;
  valid: number;
  invalid: number;
};

export type ImportCommitAdminSpiritFoodResponse = {
  uploadId: string;
  total: number;
  success: number;
  failed: number;
};

export type ImportReportRow = {
  rowNumber: number;
  valid: boolean;
  errors: string[];
  data: {
    scheduledDate: string;
    verseReference: string;
    bibleVersion: string;
    verseText: string;
    reflectionText: string;
  };
};

export type ImportReportAdminSpiritFoodResponse = {
  uploadId: string;
  total: number;
  valid: number;
  invalid: number;
  rows: ImportReportRow[];
};

/* ---- Input Types ---- */
export type AdminSpiritFoodListInput = {
  status?: AdminSpiritFoodStatus;
  q?: string;
  page?: number;
  pageSize?: number;
  scheduledFrom?: string;
  scheduledTo?: string;
  scheduledOnly?: boolean;
  sort?: string;
};

export type CreateAdminSpiritFoodInput = z.infer<typeof CreateAdminSpiritFoodRequestSchema>;
export type UpdateAdminSpiritFoodInput = z.infer<typeof UpdateAdminSpiritFoodRequestSchema>;
export type SubmitAdminSpiritFoodInput = z.infer<typeof SubmitAdminSpiritFoodRequestSchema>;
export type ApproveAdminSpiritFoodInput = z.infer<typeof ApproveAdminSpiritFoodRequestSchema>;
export type CancelAdminSpiritFoodInput = z.infer<typeof CancelAdminSpiritFoodRequestSchema>;
export type RequestDeleteAdminSpiritFoodInput = z.infer<typeof RequestDeleteAdminSpiritFoodRequestSchema>;
export type ApproveDeleteAdminSpiritFoodInput = z.infer<typeof ApproveDeleteAdminSpiritFoodRequestSchema>;
export type CancelDeleteAdminSpiritFoodInput = z.infer<typeof CancelDeleteAdminSpiritFoodRequestSchema>;
export type ForceDeleteAdminSpiritFoodInput = z.infer<typeof ForceDeleteAdminSpiritFoodRequestSchema>;
export type ImportPreviewAdminSpiritFoodInput = z.infer<typeof ImportPreviewAdminSpiritFoodRequestSchema>;
export type ImportCommitAdminSpiritFoodInput = z.infer<typeof ImportCommitAdminSpiritFoodRequestSchema>;
export type ImportReportAdminSpiritFoodInput = z.infer<typeof ImportReportAdminSpiritFoodRequestSchema>;

/* ---- Filter Store Types ---- */
export type AdminSpiritFoodFilterActions = {
  setFilters: (filters: Partial<AdminSpiritFoodListInput>) => void;
  resetFilters: () => void;
};

export type AdminSpiritFoodFilterStore = Omit<AdminSpiritFoodListInput, "page" | "pageSize" | "sort"> &
  Required<Pick<AdminSpiritFoodListInput, "page" | "pageSize" | "sort">> &
  AdminSpiritFoodFilterActions;
