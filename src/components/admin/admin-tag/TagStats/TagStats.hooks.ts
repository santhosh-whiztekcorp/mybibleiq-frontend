import { AdminTagStats as TagStatsType } from "@/resources/admin-tag";

export const useTagStats = (stats?: TagStatsType) => {
  const items = stats
    ? [
        { label: "Tags", value: stats.totalTags },
        { label: "Categories", value: stats.totalCategories },
        { label: "Usage", value: stats.totalUsage },
        { label: "Avg", value: stats.averageUsage.toFixed(1) },
      ]
    : [];

  return { items };
};
