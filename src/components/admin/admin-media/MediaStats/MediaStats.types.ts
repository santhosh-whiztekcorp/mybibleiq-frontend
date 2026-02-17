import { AdminMediaTypeStatsResponse } from "@/resources/admin-media/admin-media.types";

export type MediaStatsProps = {
  stats?: AdminMediaTypeStatsResponse;
  isLoading?: boolean;
};
