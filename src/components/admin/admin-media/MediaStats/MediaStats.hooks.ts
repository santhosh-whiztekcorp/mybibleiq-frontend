import { AdminMediaTypeStatsResponse } from "@/resources/admin-media/admin-media.types";
import { ImageIcon, Headphones, Video } from "lucide-react";

export const useMediaStats = (stats?: AdminMediaTypeStatsResponse) => {
  const items = stats
    ? stats.map((stat) => {
        const className = "bg-[#F9FAFB] border-[#D8D8D8]";
        let Icon = ImageIcon;
        let iconColor = "text-[#656A73]";

        switch (stat.type) {
          case "IMAGE":
            Icon = ImageIcon;
            iconColor = "text-[#FF6900]";
            break;
          case "AUDIO":
            Icon = Headphones;
            iconColor = "text-[#990FFA]";
            break;
          case "VIDEO":
            Icon = Video;
            iconColor = "text-[#3A84DF]";
            break;
        }

        return {
          label: (stat.type || "").charAt(0) + (stat.type || "").slice(1).toLowerCase(),
          value: stat.count,
          className,
          Icon,
          iconColor,
        };
      })
    : [];

  return { items };
};
