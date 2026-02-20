import { useMemo } from "react";
import { formatDistanceToNow } from "date-fns";
import { formatDate } from "@/utils/formatting";
import {
  ADMIN_GROUP_TYPE_LABELS,
  ADMIN_GROUP_PRIVACY_LABELS,
  ADMIN_GROUP_STATUS_LABELS,
  ADMIN_GROUP_ICON_SET,
  ADMIN_GROUP_STATUS_VARIANTS,
  ADMIN_GROUP_TYPE_TO_BADGE_VARIANT,
} from "@/resources/admin-group-management/admin-group-management.constants";
import type { UseGroupCardProps } from "./GroupCard.types";

export const useGroupCard = ({ item }: UseGroupCardProps) => {
  const formattedData = useMemo(() => {
    return {
      typeLabel: ADMIN_GROUP_TYPE_LABELS[item.type] || item.type,
      typeVariant: (ADMIN_GROUP_TYPE_TO_BADGE_VARIANT[item.type] || "outline") as "secondary", // Cast for simplicity in JSX
      privacyLabel: ADMIN_GROUP_PRIVACY_LABELS[item.privacy] || item.privacy,
      statusLabel: ADMIN_GROUP_STATUS_LABELS[item.status] || item.status,
      statusVariant: (ADMIN_GROUP_STATUS_VARIANTS[item.status] || "outline") as "secondary",
      createdDate: formatDate(new Date(item.createdAt)),
      lastActivity: item.lastActivityAt
        ? `Last activity: ${formatDistanceToNow(new Date(item.lastActivityAt), { addSuffix: true })}`
        : "No activity yet",
      icon: (() => {
        if (!item.iconPath) return null;
        if (item.iconPath.startsWith("http")) return item.iconPath;
        return ADMIN_GROUP_ICON_SET[item.iconPath] || null;
      })(),
      firstLetter: item.name.charAt(0).toUpperCase(),
    };
  }, [item]);

  return { formattedData };
};
