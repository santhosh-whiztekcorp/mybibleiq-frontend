import { ElementType } from "react";
import type { SelectOption } from "@/components/form-controllers/SelectController/SelectController.types";
import {
  GlobalUpdateStatusEnum,
  GlobalUpdateTargetTypeEnum,
  GlobalUpdateTypeEnum,
} from "./admin-global-updates.schemas";
import type {
  GlobalUpdateStatus,
  GlobalUpdateTargetType,
  GlobalUpdateType,
  GlobalUpdateListInput,
} from "./admin-global-updates.types";
import { CircleCheckIcon, MegaphoneIcon, ShieldIcon, TrendingUpIcon, TrophyIcon } from "lucide-react";

/* ---- Global Update Type Options ---- */
export const GLOBAL_UPDATE_TYPE_OPTIONS = GlobalUpdateTypeEnum.options;

export const GLOBAL_UPDATE_TYPE_LABELS: Record<GlobalUpdateType, string> = {
  Announcement: "Announcement",
  NewFeature: "New Feature",
  Maintenance: "Maintenance",
  Event: "Event",
  AppUpdate: "App Update",
};

export const GLOBAL_UPDATE_TYPE_ICONS: Record<GlobalUpdateType, ElementType<Record<string, unknown>>> = {
  Announcement: MegaphoneIcon,
  NewFeature: TrophyIcon,
  Maintenance: ShieldIcon,
  Event: TrendingUpIcon,
  AppUpdate: CircleCheckIcon,
};

export const GLOBAL_UPDATE_TYPE_ICON_COLORS: Record<GlobalUpdateType, string> = {
  Announcement: "#2AACE8",
  NewFeature: "#E59238",
  Maintenance: "#CA3500",
  Event: "#8609DB",
  AppUpdate: "#EC4899",
};

export const GLOBAL_UPDATE_TYPE_SELECT_OPTIONS: SelectOption[] = [
  { label: "All Types", value: "" },
  ...GLOBAL_UPDATE_TYPE_OPTIONS.map((type) => ({
    label: GLOBAL_UPDATE_TYPE_LABELS[type],
    value: type,
    icon: GLOBAL_UPDATE_TYPE_ICONS[type],
    iconColor: GLOBAL_UPDATE_TYPE_ICON_COLORS[type],
  })),
];

/* ---- Global Update Status Options ---- */
export const GLOBAL_UPDATE_STATUS_OPTIONS = GlobalUpdateStatusEnum.options;
export const GLOBAL_UPDATE_STATUS_LABELS: Record<GlobalUpdateStatus, string> = {
  Draft: "Draft",
  Scheduled: "Scheduled",
  Delivered: "Delivered",
};
export const GLOBAL_UPDATE_STATUS_SELECT_OPTIONS: SelectOption[] = [
  { label: "All Statuses", value: "" },
  ...GLOBAL_UPDATE_STATUS_OPTIONS.map((status) => ({
    label: GLOBAL_UPDATE_STATUS_LABELS[status],
    value: status,
  })),
];

/* ---- Global Update Target Type Options ---- */
export const GLOBAL_UPDATE_TARGET_TYPE_OPTIONS = GlobalUpdateTargetTypeEnum.options;
export const GLOBAL_UPDATE_TARGET_TYPE_LABELS: Record<GlobalUpdateTargetType, string> = {
  AllUsers: "All Users",
  SpecificUsers: "Specific Users",
  UserGroup: "User Group",
};

export const GLOBAL_UPDATE_TARGET_TYPE_SELECT_OPTIONS: SelectOption[] = GLOBAL_UPDATE_TARGET_TYPE_OPTIONS.map(
  (targetType) => ({
    label: GLOBAL_UPDATE_TARGET_TYPE_LABELS[targetType],
    value: targetType,
  })
);

/* ---- Query Keys ---- */
export const adminGlobalUpdatesQueryKeys = {
  all: ["admin-global-updates"] as const,
  lists: () => [...adminGlobalUpdatesQueryKeys.all, "list"] as const,
  list: (filters: GlobalUpdateListInput) => [...adminGlobalUpdatesQueryKeys.lists(), filters] as const,
  details: () => [...adminGlobalUpdatesQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...adminGlobalUpdatesQueryKeys.details(), id] as const,
  stats: () => [...adminGlobalUpdatesQueryKeys.all, "stats"] as const,
};
