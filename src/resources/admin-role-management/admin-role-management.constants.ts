import type { AdminRolesListInput, AdminUserRolesListInput } from "./admin-role-management.types";

/* ---- Configuration ---- */
export const USE_MOCK_DATA = false;

/* ---- Query Keys ---- */
export const adminRoleManagementQueryKeys = {
  all: ["admin-role-management"] as const,
  roles: () => [...adminRoleManagementQueryKeys.all, "roles"] as const,
  rolesList: (filters: AdminRolesListInput) => [...adminRoleManagementQueryKeys.roles(), "list", filters] as const,
  userRoles: () => [...adminRoleManagementQueryKeys.all, "user-roles"] as const,
  userRolesList: (filters: AdminUserRolesListInput) =>
    [...adminRoleManagementQueryKeys.userRoles(), "list", filters] as const,
};
