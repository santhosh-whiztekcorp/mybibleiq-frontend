import type { BadgeStatusAction } from "@/resources/admin-badge";

export type BadgeStatusActionModalProps = {
  badgeId?: string | null;
  badgeName?: string | null;
  currentStatus?: string;
  action: BadgeStatusAction | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};
