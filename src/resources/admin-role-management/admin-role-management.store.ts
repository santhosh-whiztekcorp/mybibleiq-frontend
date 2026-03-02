import { create } from "zustand";
import { defaultAdminRolesFilters, defaultAdminUserRolesFilters } from "./admin-role-management.data";
import type { AdminRolesFilterStore, AdminUserRolesFilterStore } from "./admin-role-management.types";

/* ---- Admin Roles Filter Store ---- */
export const useAdminRolesFilterStore = create<AdminRolesFilterStore>((set) => ({
  ...defaultAdminRolesFilters,
  page: defaultAdminRolesFilters.page || 1,
  limit: defaultAdminRolesFilters.limit || 20,
  /* ---- Actions ---- */
  setFilters: (filters) => set((state) => ({ ...state, ...filters })),
  resetFilters: () => set({ ...defaultAdminRolesFilters, page: 1, limit: 20 }),
}));

/* ---- Admin User Roles Filter Store ---- */
export const useAdminUserRolesFilterStore = create<AdminUserRolesFilterStore>((set) => ({
  ...defaultAdminUserRolesFilters,
  page: defaultAdminUserRolesFilters.page || 1,
  limit: defaultAdminUserRolesFilters.limit || 20,
  /* ---- Actions ---- */
  setFilters: (filters) => set((state) => ({ ...state, ...filters })),
  resetFilters: () => set({ ...defaultAdminUserRolesFilters, page: 1, limit: 20 }),
}));
