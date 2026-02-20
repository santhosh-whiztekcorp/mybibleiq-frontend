import React from "react";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  ADMIN_GROUP_ASSIGNMENT_STATUS_LABELS,
  ADMIN_GROUP_ASSIGNMENT_STATUS_VARIANTS,
} from "@/resources/admin-group-management/admin-group-management.constants";
import type { AssignmentCardProps } from "./AssignmentCard.types";

export function AssignmentCard({ assignment }: AssignmentCardProps) {
  const statusKey = assignment.status || "not_started";
  const statusLabel = ADMIN_GROUP_ASSIGNMENT_STATUS_LABELS[statusKey] || statusKey;
  const statusVariant = (ADMIN_GROUP_ASSIGNMENT_STATUS_VARIANTS[statusKey] || "tag") as
    | "tag"
    | "statusInProgress"
    | "statusPublished";

  const isQuiz = assignment.type === "Quiz";

  return (
    <div className="bg-white rounded-xl border border-[#EAEAEA] p-4 flex flex-row justify-between items-center hover:border-[#D1D5DB] transition-colors">
      <div className="flex-1 space-y-2 overflow-hidden">
        <h4 className="text-[14px] font-bold text-black line-clamp-1">{assignment.title}</h4>

        <div className="flex flex-wrap gap-2">
          <Badge variant={statusVariant} size="xs">
            {statusLabel}
          </Badge>
          <Badge
            variant={isQuiz ? "typeQuestion" : "typeONE_WORD"}
            size="xs"
            className={isQuiz ? "" : "bg-[#EFF6FF] border-[#5BB2F0] text-[#5BB2F0]"}
          >
            {assignment.type === "Quiz" ? "Quiz" : "Quest"}
          </Badge>
        </div>

        <div className="flex items-center gap-1.5 text-[#6B7280]">
          <Calendar className="h-4 w-4 text-[#9CA3AF]" />
          <span className="text-[12px] font-medium">Due: {format(new Date(assignment.dueDate), "MMM dd, yyyy")}</span>
        </div>

        <p className="text-[12px] font-medium text-[#6B7280]">
          {assignment.progress.completed} of {assignment.progress.total}{" "}
          {assignment.progress.total === 1 ? "member" : "members"} completed ({assignment.progress.percentage}%)
        </p>
      </div>

      {assignment.avgScore !== null && (
        <div className="ml-4 flex flex-col items-end">
          <span className="text-[32px] font-bold text-[#289C2C] leading-none mb-1">{assignment.avgScore}</span>
          <span className="text-[12px] font-medium text-[#6B7280] tracking-wide">IQ</span>
        </div>
      )}
    </div>
  );
}
