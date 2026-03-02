import { z } from "zod";

/* ---- Admin Roles List Input Schema ---- */
export const AdminRolesListInputSchema = z.object({
  page: z.number().min(1).optional(),
  limit: z.number().min(1).optional(),
  isActive: z.boolean().optional(),
  search: z.string().optional(),
});

/* ---- Admin User Roles List Input Schema ---- */
export const AdminUserRolesListInputSchema = z.object({
  userId: z.string().uuid().optional(),
  roleId: z.string().uuid().optional(),
  isActive: z.boolean().optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).optional(),
});

/* ---- Assign User Role Input Schema ---- */
export const AssignUserRoleInputSchema = z.object({
  userId: z.string().uuid("User ID must be a valid UUID"),
  roleId: z.string().uuid("Role ID must be a valid UUID"),
  isActive: z.boolean(),
  expiresAt: z.string().datetime().optional().nullable(),
});

/* ---- Revoke User Role Input Schema ---- */
export const RevokeUserRoleInputSchema = z.object({
  userId: z.string().uuid("User ID must be a valid UUID"),
  roleId: z.string().uuid("Role ID must be a valid UUID"),
});
