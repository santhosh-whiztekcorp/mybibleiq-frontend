import { AdminMediaStatusEnum, MediaTypeEnum, MediaStatusActionEnum } from "./admin-media.schemas";
import type { AdminMediaStatus, MediaType, MediaStatusAction, AdminMediaListInput } from "./admin-media.types";

/* ---- Media Status Options ---- */
export const MEDIA_STATUS_OPTIONS = AdminMediaStatusEnum.options;
export const MEDIA_STATUS_LABELS: Record<AdminMediaStatus, string> = {
  Draft: "Draft",
  Published: "Published",
  Archived: "Archived",
};

/* ---- Media Type Options ---- */
export const MEDIA_TYPE_OPTIONS = MediaTypeEnum.options;
export const MEDIA_TYPE_LABELS: Record<MediaType, string> = {
  IMAGE: "Image",
  AUDIO: "Audio",
  VIDEO: "Video",
};

/* ---- Media Status Actions ---- */
export const MEDIA_STATUS_ACTIONS = MediaStatusActionEnum.options;
export const MEDIA_STATUS_ACTION_LABELS: Record<MediaStatusAction, string> = {
  Publish: "Publish",
  Clone: "Clone",
  Archive: "Archive",
};

/* ---- Query Keys ---- */
export const adminMediaQueryKeys = {
  all: ["admin-media"] as const,
  lists: () => [...adminMediaQueryKeys.all, "list"] as const,
  list: (filters: AdminMediaListInput) => [...adminMediaQueryKeys.lists(), filters] as const,
  details: () => [...adminMediaQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...adminMediaQueryKeys.details(), id] as const,
  stats: () => [...adminMediaQueryKeys.all, "stats"] as const,
};
