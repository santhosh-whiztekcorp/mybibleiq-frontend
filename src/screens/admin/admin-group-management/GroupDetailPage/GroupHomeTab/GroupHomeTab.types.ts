import type { LucideIcon } from "lucide-react";
import type { AdminGroupDetail } from "@/resources/admin-group-management/admin-group-management.types";

export type GroupHomeStat = {
  label: string;
  value: string | number;
  icon: LucideIcon;
};

export type GroupHomeQuickAction = {
  id: string;
  label: string;
  icon: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
  bg: string;
};

export type UseGroupHomeTabReturn = {
  group: AdminGroupDetail | undefined;
  isLoading: boolean;
  isError: boolean;
  stats: GroupHomeStat[];
  quickActions: GroupHomeQuickAction[];
  navigateToView: (view: string) => void;
};
