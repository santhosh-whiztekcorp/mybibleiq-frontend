import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2, Send, Archive, Copy } from "lucide-react";
import { formatDateString } from "@/utils/formatting";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AdminFlashcardGroupSummary } from "@/resources/admin-flashcard-group/admin-flashcard-group.types";
import { FLASHCARD_GROUP_STATUS_LABELS } from "@/resources/admin-flashcard-group";

export const useFlashcardGroupDataTableColumns = (
  onEdit?: (item: AdminFlashcardGroupSummary) => void,
  onDelete?: (item: AdminFlashcardGroupSummary) => void,
  onPublish?: (groupId: string) => void,
  onArchive?: (groupId: string) => void,
  onClone?: (item: AdminFlashcardGroupSummary) => void
): ColumnDef<AdminFlashcardGroupSummary>[] => {
  return useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
          return <div className="font-medium text-[#202020]">{row.original.name}</div>;
        },
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
          const description = row.original.description;
          return description ? (
            <div className="text-sm text-[#656A73] max-w-[300px] truncate">{description}</div>
          ) : (
            <div className="text-sm text-[#B4B4B4] italic">—</div>
          );
        },
      },
      {
        accessorKey: "flashcardCount",
        header: "Cards",
        cell: ({ row }) => {
          return <div className="font-medium">{row.original.flashcardCount}</div>;
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <Badge variant={`status${status}`} size="sm">
              {FLASHCARD_GROUP_STATUS_LABELS[status]}
            </Badge>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Created",
        cell: ({ row }) => {
          return <span className="text-[#656A73]">{formatDateString(row.original.createdAt)}</span>;
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-center gap-1">
              {/* Status-based actions */}
              {item.status === "Draft" && (
                <>
                  <Button variant="actionEdit" size="xs" onClick={() => onEdit?.(item)}>
                    <Edit className="h-3 w-3" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="actionPublish" size="xs" onClick={() => onPublish?.(item.id)}>
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
                  <Button variant="actionArchive" size="xs" onClick={() => onArchive?.(item.id)}>
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
