import { apiClient } from "@/config/apiClient";
import { endpoints } from "@/constants/endpoints";
import { ApiResponseEnvelope } from "@/types/resource";
import { unwrapApiResponse } from "@/utils/network";
import { USE_MOCK_DATA } from "./admin-role-management.constants";
import { MOCK_ROLES, MOCK_USER_ROLES } from "./admin-role-management.data";
import {
  AdminRolesListInput,
  AdminRolesListResponse,
  AdminUserRolesListInput,
  AdminUserRolesListResponse,
  AssignUserRoleInput,
  AssignUserRoleResponse,
  RevokeUserRoleInput,
  RevokeUserRoleResponse,
} from "./admin-role-management.types";

/* ---- Mock API Functions ---- */
const mockDelay = (ms: number = 500): Promise<void> => new Promise<void>((resolve) => setTimeout(() => resolve(), ms));

/* ---- Get Roles List ---- */
export const getAdminRolesList = async (input: AdminRolesListInput): Promise<AdminRolesListResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    let filtered = [...MOCK_ROLES];
    if (input.search) {
      const search = input.search.toLowerCase();
      filtered = filtered.filter(
        (r) => r.name.toLowerCase().includes(search) || r.description.toLowerCase().includes(search)
      );
    }
    if (input.isActive !== undefined) {
      filtered = filtered.filter((r) => r.isActive === input.isActive);
    }

    const page = input.page || 1;
    const limit = input.limit || 20;
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      items: filtered.slice(start, end),
      total: filtered.length,
      page,
      limit,
    };
  }

  const response = await apiClient.get<ApiResponseEnvelope<AdminRolesListResponse>>(
    endpoints.entitlementAdmin.roles.getAll,
    {
      params: input,
    }
  );
  return unwrapApiResponse(response);
};

/* ---- Get User Roles List ---- */
export const getAdminUserRolesList = async (input: AdminUserRolesListInput): Promise<AdminUserRolesListResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    let filtered = [...MOCK_USER_ROLES];
    if (input.userId) {
      filtered = filtered.filter((ur) => ur.userId === input.userId);
    }
    if (input.roleId) {
      filtered = filtered.filter((ur) => ur.roleId === input.roleId);
    }
    if (input.isActive !== undefined) {
      filtered = filtered.filter((ur) => ur.isActive === input.isActive);
    }
    return filtered;
  }

  const response = await apiClient.get<ApiResponseEnvelope<AdminUserRolesListResponse>>(
    endpoints.entitlementAdmin.userRoles.getAll,
    {
      params: input,
    }
  );
  return unwrapApiResponse(response);
};

/* ---- Assign User Role ---- */
export const assignAdminUserRole = async (input: AssignUserRoleInput): Promise<AssignUserRoleResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    const role = MOCK_ROLES.find((r) => r.id === input.roleId);
    const newUserRole = {
      id: Math.random().toString(36).substr(2, 9),
      userId: input.userId,
      roleId: input.roleId,
      roleName: role?.name || "unknown",
      isActive: input.isActive,
      assignedBy: "admin",
      expiresAt: input.expiresAt || null,
    };
    MOCK_USER_ROLES.push(newUserRole);
    return newUserRole;
  }

  const response = await apiClient.post<ApiResponseEnvelope<AssignUserRoleResponse>>(
    endpoints.entitlementAdmin.userRoles.create,
    input
  );
  return unwrapApiResponse(response);
};

/* ---- Revoke User Role ---- */
export const revokeAdminUserRole = async (input: RevokeUserRoleInput): Promise<RevokeUserRoleResponse> => {
  if (USE_MOCK_DATA) {
    await mockDelay();
    const index = MOCK_USER_ROLES.findIndex((ur) => ur.userId === input.userId && ur.roleId === input.roleId);
    if (index !== -1) {
      MOCK_USER_ROLES.splice(index, 1);
    }
    return {
      success: true,
      message: "User role revoked successfully",
    };
  }

  const response = await apiClient.delete<RevokeUserRoleResponse>(endpoints.entitlementAdmin.userRoles.delete, {
    data: input,
  });
  return response;
};
