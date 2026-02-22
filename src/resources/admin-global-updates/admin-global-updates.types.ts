import { z } from "zod";
import {
  CreateGlobalUpdateRequestSchema,
  GlobalUpdateStatusEnum,
  GlobalUpdateTargetTypeEnum,
  GlobalUpdateTypeEnum,
  UpdateGlobalUpdateRequestSchema,
} from "./admin-global-updates.schemas";

/* ---- Enum Types ---- */
export type GlobalUpdateType = z.infer<typeof GlobalUpdateTypeEnum>;
export type GlobalUpdateStatus = z.infer<typeof GlobalUpdateStatusEnum>;
export type GlobalUpdateTargetType = z.infer<typeof GlobalUpdateTargetTypeEnum>;

/* ---- Data Types ---- */
export type GlobalUpdateSummary = {
  id: string;
  title: string;
  message: string;
  type: GlobalUpdateType;
  status: GlobalUpdateStatus;
  targetType: GlobalUpdateTargetType;
  targetGroupIds?: string[] | null;
  targetUserIds?: string[] | null;
  scheduledAt?: string | null;
  deliveredAt?: string | null;
  createdAt: string;
  updatedAt: string;
  readCount?: number;
};

export type GlobalUpdateDetail = GlobalUpdateSummary & {
  createdBy: string;
  updatedBy?: string | null;
};

/* ---- Response Types ---- */
export type GlobalUpdateListResponse = {
  items: GlobalUpdateSummary[];
  total: number;
  page: number;
  pageSize: number;
};

export type GlobalUpdateStatsResponse = {
  totalUpdates: number;
  sentThisMonth: number;
  scheduled: number;
  avgReadRate: number;
};

export type CreateGlobalUpdateResponse = {
  update: GlobalUpdateDetail;
};

export type UpdateGlobalUpdateResponse = {
  update: GlobalUpdateDetail;
};

export type DeliverGlobalUpdateResponse = {
  globalUpdateId: string;
  jobIds: string[];
  totalBatches: number;
  targetUserCount: number;
};

/* ---- Input Types ---- */
export type GlobalUpdateListInput = {
  page?: number;
  pageSize?: number;
  search?: string;
  type?: GlobalUpdateType;
  status?: GlobalUpdateStatus;
};

export type CreateGlobalUpdateInput = z.infer<typeof CreateGlobalUpdateRequestSchema>;
export type UpdateGlobalUpdateInput = z.infer<typeof UpdateGlobalUpdateRequestSchema>;

/* ---- Filter Store Types ---- */
export type GlobalUpdateFilterActions = {
  setFilters: (filters: Partial<GlobalUpdateListInput>) => void;
  resetFilters: () => void;
};

export type GlobalUpdateFilterStore = Omit<GlobalUpdateListInput, "page" | "pageSize"> &
  Required<Pick<GlobalUpdateListInput, "page" | "pageSize">> &
  GlobalUpdateFilterActions;
