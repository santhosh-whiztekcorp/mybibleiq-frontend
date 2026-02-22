import React, { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2, Send, Archive, Copy, Crown } from "lucide-react";
import { formatDateString } from "@/utils/formatting";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { AdminBadgeSummary } from "@/resources/admin-badge";
import Image from "next/image";
import {
  BADGE_TRIGGER_TYPE_LABELS,
  BADGE_METRIC_OPTIONS_BY_TRIGGER,
  BADGE_CONDITION_OPERATOR_LABELS,
} from "@/resources/admin-badge/admin-badge.constants";

export const useBadgeDataTableColumns = (
  onEdit?: (item: AdminBadgeSummary) => void,
  onDelete?: (item: AdminBadgeSummary) => void,
  onPublish?: (item: AdminBadgeSummary) => void,
  onArchive?: (item: AdminBadgeSummary) => void,
  onClone?: (item: AdminBadgeSummary) => void
): ColumnDef<AdminBadgeSummary>[] => {
  const BadgeIconPreview = ({ item }: { item: AdminBadgeSummary }) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <div
          className="relative h-10 w-10  bg-white overflow-hidden border rounded-md border-gray-200 cursor-pointer"
          onClick={() => item.iconUrl && setOpen(true)}
          role="button"
          tabIndex={0}
        >
          {item.iconUrl ? (
            <div className="relative w-full h-full">
              <Image src={item.iconUrl} alt={item.name} fill className="object-contain p-1" unoptimized />
            </div>
          ) : (
            <div className="h-full w-full flex items-center justify-center text-gray-400">
              <Crown className="h-5 w-5" />
            </div>
          )}
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="m-0 sm:max-w-[30vw] rounded-xl shadow-none p-5 pt-10 bg-muted flex items-center justify-center">
            <DialogTitle className="sr-only">{item.name} preview</DialogTitle>
            <div className="relative w-full max-w-[90vw] aspect-square">
              {item.iconUrl && <Image src={item.iconUrl} alt={item.name} fill className="object-contain" unoptimized />}
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  return useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-center gap-3">
              <BadgeIconPreview item={item} />
              <div>
                <div className="font-medium text-gray-900">{item.name}</div>
                <div className="text-xs text-gray-500 truncate max-w-[200px]">{item.description}</div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;

          return (
            <Badge variant={`status${status}`} size="sm">
              {status}
            </Badge>
          );
        },
      },
      {
        accessorKey: "rarity",
        header: "Rarity",
        cell: ({ row }) => {
          const rarity = row.original.rarity;

          return (
            <Badge variant={`rarity${rarity}`} size="sm">
              {rarity}
            </Badge>
          );
        },
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
          <Badge variant={`category${row.original.category}`} size="sm">
            {row.original.category}
          </Badge>
        ),
      },
      {
        accessorKey: "assignmentType",
        header: "Type",
        cell: ({ row }) => (
          <Badge variant={`assignment${row.original.assignmentType}`} size="sm">
            {row.original.assignmentType}
          </Badge>
        ),
      },
      {
        id: "trigger",
        header: "Trigger",
        cell: ({ row }) => {
          const cfg = row.original.triggerConfig;
          if (!cfg) return <div className="text-sm text-gray-400">—</div>;
          return (
            <Badge variant={`trigger${cfg.triggerType}`} size="sm">
              {BADGE_TRIGGER_TYPE_LABELS[cfg.triggerType]}
            </Badge>
          );
        },
      },
      {
        id: "metric",
        header: "Metric",
        cell: ({ row }) => {
          const cfg = row.original.triggerConfig;
          if (!cfg) return <div className="text-sm text-gray-400">—</div>;
          const metricLabel = (BADGE_METRIC_OPTIONS_BY_TRIGGER[cfg.triggerType] || []).find(
            (opt) => opt.value === cfg.metric?.type
          )?.label;
          return (
            <Badge variant={`trigger${cfg.triggerType}`} size="sm">
              {metricLabel || cfg.metric?.type}
            </Badge>
          );
        },
      },
      {
        id: "condition",
        header: "Condition",
        cell: ({ row }) => {
          const cfg = row.original.triggerConfig;
          if (!cfg) return <div className="text-sm text-gray-400">—</div>;
          return (
            <Badge variant="conditionOperator" size="sm">
              {BADGE_CONDITION_OPERATOR_LABELS[cfg.operator]}
            </Badge>
          );
        },
      },
      {
        id: "threshold",
        header: "Threshold",
        cell: ({ row }) => {
          const cfg = row.original.triggerConfig;
          if (!cfg) return <div className="text-sm text-gray-400">—</div>;
          return (
            <Badge variant="tag" size="sm">
              {cfg.threshold}
            </Badge>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => (
          <div className="text-xs text-gray-500 whitespace-nowrap">{formatDateString(row.original.createdAt)}</div>
        ),
      },
      {
        accessorKey: "updatedAt",
        header: "Updated",
        cell: ({ row }) => (
          <div className="text-xs text-gray-500 whitespace-nowrap">{formatDateString(row.original.updatedAt)}</div>
        ),
      },
      {
        id: "publishedAt",
        header: "Published",
        cell: ({ row }) => {
          const val = row.original.publishedAt;
          return val ? (
            <div className="text-xs text-gray-500 whitespace-nowrap">{formatDateString(val)}</div>
          ) : (
            <div className="text-sm text-gray-400">—</div>
          );
        },
      },
      {
        id: "archivedAt",
        header: "Archived",
        cell: ({ row }) => {
          const val = row.original.archivedAt;
          return val ? (
            <div className="text-xs text-gray-500 whitespace-nowrap">{formatDateString(val)}</div>
          ) : (
            <div className="text-sm text-gray-400">—</div>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-center gap-1">
              {item.status === "Draft" && (
                <>
                  <Button variant="actionEdit" size="xs" onClick={() => onEdit?.(item)}>
                    <Edit className="h-3 w-3" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="actionPublish" size="xs" onClick={() => onPublish?.(item)}>
                    <Send className="h-3 w-3" />
                    <span className="sr-only">Publish</span>
                  </Button>
                  <Button variant="actionDelete" size="xs" onClick={() => onDelete?.(item)}>
                    <Trash2 className="h-3 w-3" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </>
              )}
              {item.status === "Published" && (
                <>
                  <Button variant="actionArchive" size="xs" onClick={() => onArchive?.(item)}>
                    <Archive className="h-3 w-3" />
                    <span className="sr-only">Archive</span>
                  </Button>
                  <Button variant="actionClone" size="xs" onClick={() => onClone?.(item)}>
                    <Copy className="h-3 w-3" />
                    <span className="sr-only">Clone</span>
                  </Button>
                </>
              )}
              {item.status === "Archived" && (
                <Button variant="actionClone" size="xs" onClick={() => onClone?.(item)}>
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Clone</span>
                </Button>
              )}
            </div>
          );
        },
      },
    ],
    [onEdit, onDelete, onPublish, onArchive, onClone]
  );
};
