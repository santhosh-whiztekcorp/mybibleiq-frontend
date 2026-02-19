import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2, Send, Archive, Copy, Crown } from "lucide-react";
import { formatDateString } from "@/utils/formatting";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { AdminBadgeSummary } from "@/resources/admin-badge";
import Image from "next/image";

export const useBadgeDataTableColumns = (
  onEdit?: (item: AdminBadgeSummary) => void,
  onDelete?: (item: AdminBadgeSummary) => void,
  onPublish?: (item: AdminBadgeSummary) => void,
  onArchive?: (item: AdminBadgeSummary) => void,
  onClone?: (item: AdminBadgeSummary) => void
): ColumnDef<AdminBadgeSummary>[] => {
  return useMemo(
    () => [
      {
        accessorKey: "iconUrl",
        header: "Icon",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="relative h-10 w-10  bg-white overflow-hidden border rounded-md border-gray-200">
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
          );
        },
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div>
              <div className="font-medium text-gray-900">{item.name}</div>
              <div className="text-xs text-gray-500 truncate max-w-[200px]">{item.description}</div>
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
        cell: ({ row }) => <div className="text-sm">{row.original.category}</div>,
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => {
          const item = row.original;
          return <div className="text-sm text-gray-500 whitespace-nowrap">{formatDateString(item.createdAt)}</div>;
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
