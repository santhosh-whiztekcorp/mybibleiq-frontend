"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { AdminMediaSummary } from "@/resources/admin-media/admin-media.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Send, Archive, Copy, ImageIcon, Music, Video } from "lucide-react";
import { formatDateString } from "@/utils/formatting/formatting";
import Image from "next/image";
import { MEDIA_STATUS_LABELS } from "@/resources/admin-media";

export const useMediaDataTableColumns = (
  onEdit?: (item: AdminMediaSummary) => void,
  onDelete?: (item: AdminMediaSummary) => void,
  onPublish?: (item: AdminMediaSummary) => void,
  onArchive?: (item: AdminMediaSummary) => void,
  onClone?: (item: AdminMediaSummary) => void,
  onPreview?: (item: AdminMediaSummary) => void
) => {
  const columns: ColumnDef<AdminMediaSummary>[] = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Media",
        cell: ({ row }) => {
          const item = row.original;
          const TypeIcon =
            {
              IMAGE: ImageIcon,
              AUDIO: Music,
              VIDEO: Video,
            }[item.type] || ImageIcon;

          return (
            <div className="flex items-center gap-3">
              <div
                onClick={() => onPreview?.(item)}
                className="relative h-12 w-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0 border border-[#E2E8F0] cursor-pointer hover:opacity-80 transition-opacity"
              >
                {item.type === "IMAGE" && item.url ? (
                  <Image src={item.url} alt={item.title} fill className="object-contain" unoptimized />
                ) : (
                  <TypeIcon className="h-6 w-6 text-muted-foreground/40" />
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-[#1a1a1a] truncate">{item.title}</span>
                <span className="text-[11px] text-[#656A73] uppercase font-bold">{item.type}</span>
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
              {MEDIA_STATUS_LABELS[status]}
            </Badge>
          );
        },
      },
      {
        accessorKey: "tags",
        header: "Tags",
        cell: ({ row }) => {
          const tags = row.original.tags || [];
          if (tags.length === 0) return <span className="text-xs text-[#B4B4B4]">-</span>;
          return (
            <div className="flex flex-wrap gap-1 max-w-[200px]">
              {tags.slice(0, 2).map((tag, i) => (
                <Badge
                  key={i}
                  variant="outline"
                  className="text-[10px] px-1.5 py-0 bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]"
                >
                  {tag}
                </Badge>
              ))}
              {tags.length > 2 && <span className="text-[10px] text-[#B4B4B4]">+{tags.length - 2}</span>}
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => (
          <span className="text-xs text-[#656A73]">{formatDateString(row.getValue("createdAt"))}</span>
        ),
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
                    <Pencil className="h-3 w-3" />
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
    [onEdit, onDelete, onPublish, onArchive, onClone, onPreview]
  );

  return columns;
};
