import { Role, UserRole, AdminRolesListInput, AdminUserRolesListInput } from "./admin-role-management.types";

export const MOCK_ROLES: Role[] = [
  {
    id: "f7fb47bd-0048-45b0-86cf-282a539a9f7a",
    name: "admin",
    description: "Administrator role with full access to all resources",
    isActive: true,
  },
  {
    id: "3b0cffeb-d661-429b-8a75-5cf402c58459",
    name: "user",
    description: "Basic user role with view access to most resources",
    isActive: true,
  },
  {
    id: "07ac9d2f-3dd7-4da3-b1f2-e51ec293b3ff",
    name: "group:co_leader",
    description: "Co-leader role for groups",
    isActive: true,
  },
  {
    id: "5b6d9d21-659f-46a6-bbf8-d20996c99e0b",
    name: "group:leader",
    description: "Leader role for groups",
    isActive: true,
  },
];

export const MOCK_USER_ROLES: UserRole[] = [
  {
    id: "e33fa99a-0149-4033-bf0e-060ef5f90b4d",
    userId: "23eb818f-0bcb-4313-ba2a-a5e07cb7b200",
    roleId: "f7fb47bd-0048-45b0-86cf-282a539a9f7a",
    roleName: "admin",
    isActive: true,
    assignedBy: "system",
    expiresAt: null,
  },
  {
    id: "2385e044-ab85-4e5c-a170-e2fa43008802",
    userId: "23eb818f-0bcb-4313-ba2a-a5e07cb7b200",
    roleId: "3b0cffeb-d661-429b-8a75-5cf402c58459",
    roleName: "user",
    isActive: true,
    assignedBy: "system",
    expiresAt: null,
  },
];

export const defaultAdminRolesFilters: AdminRolesListInput = {
  page: 1,
  limit: 20,
};

export const defaultAdminUserRolesFilters: AdminUserRolesListInput = {
  page: 1,
  limit: 20,
};
