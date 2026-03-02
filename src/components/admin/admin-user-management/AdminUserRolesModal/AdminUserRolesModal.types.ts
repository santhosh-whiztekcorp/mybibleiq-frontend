import type { UserRole } from "@/resources/admin-role-management/admin-role-management.types";

export type AdminUserRolesModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
  userRoles: UserRole[];
  isProcessing: boolean;
  onToggleRole: (roleId: string, isAssigned: boolean) => void;
};

export type UseAdminUserRolesModalProps = AdminUserRolesModalProps;
