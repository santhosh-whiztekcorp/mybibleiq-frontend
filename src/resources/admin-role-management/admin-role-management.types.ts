import z from "zod";
import {
  AdminRolesListInputSchema,
  AdminUserRolesListInputSchema,
  AssignUserRoleInputSchema,
  RevokeUserRoleInputSchema,
} from "./admin-role-management.schemas";

/* ---- Role Types ---- */
export type Role = {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
};

export type UserRole = {
  id: string;
  userId: string;
  roleId: string;
  roleName: string;
  isActive: boolean;
  assignedBy: string;
  expiresAt: string | null;
};

/* ---- Input Types (Inferred from Schemas) ---- */
export type AdminRolesListInput = z.infer<typeof AdminRolesListInputSchema>;
export type AdminUserRolesListInput = z.infer<typeof AdminUserRolesListInputSchema>;
export type AssignUserRoleInput = z.infer<typeof AssignUserRoleInputSchema>;
export type RevokeUserRoleInput = z.infer<typeof RevokeUserRoleInputSchema>;

/* ---- Response Types ---- */
export type AdminRolesListResponse = {
  items: Role[];
  total: number;
  page: number;
  limit: number;
};
export type AdminUserRolesListResponse = UserRole[];
export type AssignUserRoleResponse = UserRole;
export type RevokeUserRoleResponse = {
  success: boolean;
  message: string;
};

/* ---- Filter & Store Types ---- */
export type AdminRolesFilterActions = {
  setFilters: (filters: Partial<AdminRolesListInput>) => void;
  resetFilters: () => void;
};

export type AdminRolesFilterStore = Required<Pick<AdminRolesListInput, "page" | "limit">> &
  Omit<AdminRolesListInput, "page" | "limit"> &
  AdminRolesFilterActions;

export type AdminUserRolesFilterActions = {
  setFilters: (filters: Partial<AdminUserRolesListInput>) => void;
  resetFilters: () => void;
};

export type AdminUserRolesFilterStore = Required<Pick<AdminUserRolesListInput, "page" | "limit">> &
  Omit<AdminUserRolesListInput, "page" | "limit"> &
  AdminUserRolesFilterActions;
