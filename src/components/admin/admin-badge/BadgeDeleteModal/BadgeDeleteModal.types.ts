export type BadgeDeleteModalProps = {
  badgeId?: string | null;
  badgeName?: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};
