/* ---- Tag Types ---- */
export type AdminTagSummary = {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  description: string | null;
  usageCount: number;
  createdAt: string;
  createdBy: string;
};

export type AdminTagDetail = {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  categoryColor: string;
  description: string | null;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
};

/* ---- Category Types ---- */
export type AdminTagCategory = {
  id: string;
  name: string;
  color: string;
  tagCount: number;
};

/* ---- Stats Types ---- */
export type AdminTagStats = {
  totalTags: number;
  totalCategories: number;
  totalUsage: number;
  averageUsage: number;
};

export type PopularTag = {
  rank: number;
  id: string;
  name: string;
  categoryName: string;
  categoryColor: string;
  usageCount: number;
};

export type RecentTag = {
  id: string;
  name: string;
  categoryName: string;
  categoryColor: string;
  createdAt: string;
};

/* ---- Response Types ---- */
export type AdminTagListResponse = {
  items: AdminTagSummary[];
  total: number;
  page: number;
  pageSize: number;
};

/* ---- Input Types ---- */
export type AdminTagListInput = {
  page?: number;
  pageSize?: number;
  sort?: string;
  categoryId?: string;
  q?: string;
};

export type CreateAdminTagInput = {
  name: string;
  categoryId: string;
  description?: string;
};

export type UpdateAdminTagInput = {
  name?: string;
  categoryId?: string;
  description?: string;
};

export type CreateCategoryInput = {
  name: string;
  color: string;
};

export type UpdateCategoryInput = {
  name?: string;
  color?: string;
};

/* ---- Filter Store Types ---- */
export type AdminTagFilterActions = {
  setFilters: (filters: Partial<AdminTagListInput>) => void;
  resetFilters: () => void;
};

export type AdminTagFilterStore = Omit<AdminTagListInput, "page" | "pageSize" | "sort"> &
  Required<Pick<AdminTagListInput, "page" | "pageSize" | "sort">> &
  AdminTagFilterActions;
