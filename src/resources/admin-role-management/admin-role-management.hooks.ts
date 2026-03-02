import { useQuery, useMutation, UseQueryResult, UseMutationResult, useInfiniteQuery } from "@tanstack/react-query";
import { queryClient } from "@/config/queryClient";
import { getErrorMessage } from "@/utils/error";
import {
  getAdminRolesList,
  getAdminUserRolesList,
  assignAdminUserRole,
  revokeAdminUserRole,
} from "./admin-role-management.api";
import { adminRoleManagementQueryKeys } from "./admin-role-management.constants";
import type {
  AdminRolesListInput,
  AdminUserRolesListInput,
  AssignUserRoleInput,
  RevokeUserRoleInput,
  AdminRolesListResponse,
  AdminUserRolesListResponse,
  AssignUserRoleResponse,
  RevokeUserRoleResponse,
} from "./admin-role-management.types";
import Toast from "@/lib/toast";

/* ---- List Roles ---- */
export const useAdminRolesList = (filters: AdminRolesListInput): UseQueryResult<AdminRolesListResponse> =>
  useQuery({
    queryKey: adminRoleManagementQueryKeys.rolesList(filters),
    queryFn: () => getAdminRolesList(filters),
  });

/* ---- Infinite List Roles ---- */
export const useAdminRolesInfiniteList = (filters: Omit<AdminRolesListInput, "page">) =>
  useInfiniteQuery({
    queryKey: adminRoleManagementQueryKeys.rolesList({ ...filters, page: 1, limit: filters.limit ?? 20 }),
    queryFn: ({ pageParam = 1 }) =>
      getAdminRolesList({
        ...filters,
        page: pageParam,
        limit: filters.limit ?? 20,
      }),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || typeof lastPage.total === "undefined") {
        return undefined;
      }
      const totalPages = Math.ceil(lastPage.total / (filters.limit ?? 20));
      const nextPage = allPages.length + 1;
      return nextPage <= totalPages ? nextPage : undefined;
    },
    initialPageParam: 1,
  });

/* ---- List User Roles ---- */
export const useAdminUserRolesList = (filters: AdminUserRolesListInput): UseQueryResult<AdminUserRolesListResponse> =>
  useQuery({
    queryKey: adminRoleManagementQueryKeys.userRolesList(filters),
    queryFn: () => getAdminUserRolesList(filters),
  });

/* ---- Assign User Role ---- */
export const useAssignAdminUserRole = (): UseMutationResult<AssignUserRoleResponse, Error, AssignUserRoleInput> =>
  useMutation({
    mutationFn: (input: AssignUserRoleInput) => assignAdminUserRole(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminRoleManagementQueryKeys.userRoles() });
      Toast.show({
        type: "success",
        text1: "Role assigned",
        text2: "User role has been assigned successfully",
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to assign role",
        text2: errorMessage || "Please try again later",
      });
    },
  });

/* ---- Revoke User Role ---- */
export const useRevokeAdminUserRole = (): UseMutationResult<RevokeUserRoleResponse, Error, RevokeUserRoleInput> =>
  useMutation({
    mutationFn: (input: RevokeUserRoleInput) => revokeAdminUserRole(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: adminRoleManagementQueryKeys.userRoles() });
      Toast.show({
        type: "success",
        text1: "Role revoked",
        text2: data.message || "User role has been revoked successfully",
      });
    },
    onError: (error) => {
      const errorMessage = getErrorMessage(error);
      Toast.show({
        type: "error",
        text1: "Failed to revoke role",
        text2: errorMessage || "Please try again later",
      });
    },
  });
