import { type AdminGroupMemberRole, type AdminGroupActivityEventType } from "@/resources/admin-group-management";
import { format } from "date-fns";
import { User, Book, Megaphone, Shield, Activity, UserMinus } from "lucide-react";
import { ADMIN_GROUP_MEMBER_ROLE_LABELS } from "@/resources/admin-group-management/admin-group-management.constants";
import { type ActivityLogCardProps } from "./ActivityLogCard.types";

export function ActivityLogCard({ entry }: ActivityLogCardProps) {
  const { type, timestamp, actor, metadata } = entry;
  const { title, description } = metadata;

  const getEventConfig = () => {
    const eventType = type as AdminGroupActivityEventType;
    switch (eventType) {
      case "member":
        if (title.toLowerCase().includes("removed") || title.toLowerCase().includes("ban")) {
          return {
            Icon: UserMinus,
            iconClass: "bg-[#FEF1F2] text-[#EF4444]",
            iconColor: "#EF4444",
          };
        }
        return {
          Icon: User,
          iconClass: "bg-[#EEF2FF] text-[#3B82F6]",
          iconColor: "#3B82F6",
        };
      case "assignment":
        return {
          Icon: Book,
          iconClass: "bg-[#F3E8FF] text-[#8B5CF6]",
          iconColor: "#8B5CF6",
        };
      case "announcement":
        return {
          Icon: Megaphone,
          iconClass: "bg-[#FFF1F7] text-[#EC4899]",
          iconColor: "#EC4899",
        };
      case "report":
        return {
          Icon: Shield,
          iconClass: "bg-[#FEF1F2] text-[#EF4444]",
          iconColor: "#EF4444",
        };
      default:
        return {
          Icon: Activity,
          iconClass: "bg-[#F3F4F6] text-[#6B7280]",
          iconColor: "#6B7280",
        };
    }
  };

  const { Icon, iconClass, iconColor } = getEventConfig();

  return (
    <div className="flex gap-4 items-start">
      {/* Icon Section */}
      <div className="flex shrink-0 items-center justify-center mt-0.5">
        <div className={`flex items-center justify-center w-10 h-10 rounded-full ${iconClass}`}>
          <Icon size={20} color={iconColor} strokeWidth={2.5} />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col gap-1 w-full bg-white border border-[#E5E7EB] rounded-xl p-4">
        <div className="flex justify-between items-start gap-4">
          <span className="font-bold text-[#111827] text-sm wrap-break-word flex-1">{title}</span>
          {timestamp && (
            <span className="text-xs text-[#6B7280] shrink-0 text-right">
              {format(new Date(timestamp), "MMM dd, yyyy - hh:mm a")}
            </span>
          )}
        </div>

        <p className="text-sm text-[#4B5563] leading-snug wrap-break-word">{description}</p>

        {actor && (
          <p className="text-xs font-medium text-[#6B7280] mt-1">
            By: {actor.name || "Unknown"}
            {" (" + (ADMIN_GROUP_MEMBER_ROLE_LABELS[actor.role as AdminGroupMemberRole] || actor.role) + ")"}
          </p>
        )}
      </div>
    </div>
  );
}
