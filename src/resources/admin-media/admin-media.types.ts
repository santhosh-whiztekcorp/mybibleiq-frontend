import { z } from "zod";
import {
  AdminMediaStatusEnum,
  MediaTypeEnum,
  MediaStatusActionEnum,
  CreateAdminMediaRequestSchema,
  UpdateAdminMediaRequestSchema,
  UpdateAdminMediaStatusSchema,
} from "./admin-media.schemas";

/* ---- Enum Types ---- */
export type AdminMediaStatus = z.infer<typeof AdminMediaStatusEnum>;
export type MediaType = z.infer<typeof MediaTypeEnum>;
export type MediaStatusAction = z.infer<typeof MediaStatusActionEnum>;

/* ---- Media Types ---- */
export type AdminMediaSummary = {
  id: string;
  status: AdminMediaStatus;
  title: string;
  type: MediaType;
  url: string;
  caption?: string;
  sizeBytes: number;
  duration?: number;
  tags: string[];
  publishedAt?: string;
  archivedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminMediaDetail = {
  id: string;
  status: AdminMediaStatus;
  title: string;
  type: MediaType;
  url: string;
  caption?: string;
  sizeBytes: number;
  duration?: number;
  tags: string[];
  publishedAt?: string;
  archivedAt?: string;
  createdAt: string;
  updatedAt: string;
};

/* ---- Response Types ---- */
export type AdminMediaTypeStatsResponse = {
  type: MediaType;
  count: number;
}[];

export type AdminMediaListResponse = {
  items: AdminMediaSummary[];
  total: number;
  page: number;
  pageSize: number;
};

export type AdminMediaResponse = AdminMediaDetail;
export type CreateAdminMediaResponse = AdminMediaDetail;
export type UpdateAdminMediaResponse = AdminMediaDetail;

export type UpdateAdminMediaStatusResponse = {
  id: string;
  status: AdminMediaStatus;
};

/* ---- Input Types ---- */
export type AdminMediaListInput = {
  status?: AdminMediaStatus;
  type?: MediaType;
  tags?: string | string[];
  q?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
};

/* ---- Form Input Types (file is optional and not validated by schema) ---- */
export type CreateAdminMediaFormInput = z.infer<typeof CreateAdminMediaRequestSchema> & {
  file?: {
    uri: string;
    name: string;
    type: string;
    size?: number;
    file?: File;
  };
};
export type UpdateAdminMediaFormInput = z.infer<typeof UpdateAdminMediaRequestSchema> & {
  file?: {
    uri: string;
    name: string;
    type: string;
    size?: number;
    file?: File;
  };
};

/* ---- API Input Types (with file for API calls) ---- */
export type CreateAdminMediaInput = CreateAdminMediaFormInput & {
  file: {
    uri: string;
    name: string;
    type: string;
  };
};

export type UpdateAdminMediaInput = UpdateAdminMediaFormInput & {
  file?: {
    uri: string;
    name: string;
    type: string;
  };
};

export type UpdateAdminMediaStatusInput = z.infer<typeof UpdateAdminMediaStatusSchema>;

/* ---- Filter Store Types ---- */
export type AdminMediaFilterActions = {
  setFilters: (filters: Partial<AdminMediaListInput>) => void;
  resetFilters: () => void;
};

export type AdminMediaFilterStore = Omit<AdminMediaListInput, "page" | "pageSize" | "sort"> &
  Required<Pick<AdminMediaListInput, "page" | "pageSize" | "sort">> &
  AdminMediaFilterActions;
