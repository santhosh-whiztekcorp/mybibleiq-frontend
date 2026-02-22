import type { GlobalUpdateDetail } from "@/resources/admin-global-updates/admin-global-updates.types";

export type GlobalUpdatePreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  updateData?: GlobalUpdateDetail | null;
};
