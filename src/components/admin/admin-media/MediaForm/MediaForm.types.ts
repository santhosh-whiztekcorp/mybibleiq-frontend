import { AdminMediaDetail, AdminMediaSummary } from "@/resources/admin-media/admin-media.types";

export type MediaFormProps = {
  item?: AdminMediaDetail | AdminMediaSummary | null;
  onSuccess?: () => void;
  onClose?: () => void;
};
