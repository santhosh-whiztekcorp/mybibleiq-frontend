import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Check, X, Trash2, Send } from "lucide-react";
import { formatDateString, isToday } from "@/utils/formatting";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SPIRIT_FOOD_STATUS_LABELS } from "@/resources/admin-spirit-food";
import type { AdminSpiritFoodSummary } from "@/resources/admin-spirit-food";

export const useSpiritFoodDataTableColumns = (
  currentUserId?: string | null,
  onEdit?: (item: AdminSpiritFoodSummary) => void,
  onSubmit?: (item: AdminSpiritFoodSummary) => void,
  onApprove?: (item: AdminSpiritFoodSummary) => void,
  onCancel?: (item: AdminSpiritFoodSummary) => void,
  onRequestDelete?: (item: AdminSpiritFoodSummary) => void,
  onApproveDelete?: (item: AdminSpiritFoodSummary) => void,
  onCancelDelete?: (item: AdminSpiritFoodSummary) => void
): ColumnDef<AdminSpiritFoodSummary>[] => {
  return useMemo(
    () => [
      {
        accessorKey: "verseReference",
        header: "Verse Reference",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex flex-col gap-1">
              <div className="font-medium">{item.verseReference}</div>
            </div>
          );
        },
      },
      {
        accessorKey: "bibleVersion",
        header: "Bible Version",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex flex-col gap-1">
              {item.bibleVersion && <div className="text-xs text-muted-foreground">{item.bibleVersion}</div>}
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const item = row.original;
          const badgeVariant = `status${item.status}` as const;
          return (
            <div className="flex items-center gap-2">
              <Badge variant={badgeVariant} size="sm">
                {SPIRIT_FOOD_STATUS_LABELS[item.status]}
              </Badge>
              {item.scheduledDate && isToday(item.scheduledDate) && (
                <Badge variant="statusToday" size="sm">
                  Today&apos;s Entry
                </Badge>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "scheduledDate",
        header: "Scheduled Date",
        cell: ({ row }) => {
          const item = row.original;
          return item.scheduledDate ? formatDateString(item.scheduledDate) : "-";
        },
      },
      {
        accessorKey: "makerUserName",
        header: "Maker",
        cell: ({ row }) => {
          const item = row.original;
          return item.makerUserName || "-";
        },
      },
      {
        accessorKey: "checkerUserName",
        header: "Checker",
        cell: ({ row }) => {
          const item = row.original;
          return item.checkerUserName || "-";
        },
      },
      {
        accessorKey: "concatenatedText",
        header: "Verse Text",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="max-w-md">
              <p className="text-sm line-clamp-2">&quot;{item.concatenatedText}&quot;</p>
            </div>
          );
        },
      },
      {
        accessorKey: "reflectionText",
        header: "Reflection",
        cell: ({ row }) => {
          const item = row.original;
          return item.reflectionText ? (
            <div className="max-w-md">
              <p className="text-sm line-clamp-2">{item.reflectionText}</p>
            </div>
          ) : (
            "-"
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => {
          const item = row.original;
          return formatDateString(item.createdAt);
        },
      },
      {
        accessorKey: "updatedAt",
        header: "Updated",
        cell: ({ row }) => {
          const item = row.original;
          return formatDateString(item.updatedAt);
        },
      },
      {
        accessorKey: "approvedAt",
        header: "Approved",
        cell: ({ row }) => {
          const item = row.original;
          return item.approvedAt ? formatDateString(item.approvedAt) : "-";
        },
      },
      {
        accessorKey: "deliveredAt",
        header: "Delivered",
        cell: ({ row }) => {
          const item = row.original;
          return item.deliveredAt ? formatDateString(item.deliveredAt) : "-";
        },
      },
      {
        accessorKey: "deletedAt",
        header: "Deleted",
        cell: ({ row }) => {
          const item = row.original;
          return item.deletedAt ? formatDateString(item.deletedAt) : "-";
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const item = row.original;
          const isMaker = currentUserId && item.makerUserId && currentUserId === item.makerUserId;
          const isChecker =
            currentUserId &&
            item.makerUserId &&
            (item.checkerUserId ? currentUserId === item.checkerUserId : currentUserId !== item.makerUserId);

          return (
            <div className="flex items-center gap-2">
              {/* Edit - InProgress only */}
              {item.status === "InProgress" && (
                <Button variant="actionEdit" size="xs" onClick={() => onEdit?.(item)}>
                  <Edit className="h-3 w-3" />
                  <span className="sr-only">Edit</span>
                </Button>
              )}

              {/* Submit - InProgress AND isMaker */}
              {item.status === "InProgress" && isMaker && (
                <Button variant="actionPublish" size="xs" onClick={() => onSubmit?.(item)}>
                  <Send className="h-3 w-3" />
                  <span className="sr-only">Submit</span>
                </Button>
              )}

              {/* Request Delete - InProgress AND isMaker */}
              {item.status === "InProgress" && isMaker && (
                <Button variant="actionDelete" size="xs" onClick={() => onRequestDelete?.(item)}>
                  <Trash2 className="h-3 w-3" />
                  <span className="sr-only">Request Delete</span>
                </Button>
              )}

              {/* Approve - InReview AND isChecker */}
              {item.status === "InReview" && isChecker && (
                <Button variant="actionApprove" size="xs" onClick={() => onApprove?.(item)}>
                  <Check className="h-3 w-3" />
                  <span className="sr-only">Approve</span>
                </Button>
              )}

              {/* Cancel Review - InReview AND isMaker */}
              {item.status === "InReview" && isMaker && (
                <Button variant="actionReject" size="xs" onClick={() => onCancel?.(item)}>
                  <X className="h-3 w-3" />
                  <span className="sr-only">Cancel Review</span>
                </Button>
              )}

              {/* Approve Delete - PendingDelete AND isChecker */}
              {item.status === "PendingDelete" && isChecker && (
                <Button variant="actionApprove" size="xs" onClick={() => onApproveDelete?.(item)}>
                  <Check className="h-3 w-3" />
                  <span className="sr-only">Approve Delete</span>
                </Button>
              )}

              {/* Cancel Delete - PendingDelete AND isChecker */}
              {item.status === "PendingDelete" && isChecker && (
                <Button variant="actionReject" size="xs" onClick={() => onCancelDelete?.(item)}>
                  <X className="h-3 w-3" />
                  <span className="sr-only">Cancel Delete</span>
                </Button>
              )}
            </div>
          );
        },
      },
    ],
    [currentUserId, onEdit, onSubmit, onApprove, onCancel, onRequestDelete, onApproveDelete, onCancelDelete]
  );
};
