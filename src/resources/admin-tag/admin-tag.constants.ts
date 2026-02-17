import type { AdminTagListInput } from "./admin-tag.types";

/* ---- Query Keys ---- */
export const adminTagQueryKeys = {
  all: ["admin-tags"] as const,
  lists: () => [...adminTagQueryKeys.all, "list"] as const,
  list: (filters: AdminTagListInput) => [...adminTagQueryKeys.lists(), filters] as const,
  details: () => [...adminTagQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...adminTagQueryKeys.details(), id] as const,
  stats: () => [...adminTagQueryKeys.all, "stats"] as const,
  popular: (limit?: number) => [...adminTagQueryKeys.all, "popular", limit] as const,
  recent: (limit?: number) => [...adminTagQueryKeys.all, "recent", limit] as const,
  categories: () => [...adminTagQueryKeys.all, "categories"] as const,
};
