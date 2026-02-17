import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { formatDateString } from "@/utils/formatting";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { AdminTagSummary } from "@/resources/admin-tag";

export const useTagDataTableColumns = (
  onEdit?: (item: AdminTagSummary) => void,
  onDelete?: (item: AdminTagSummary) => void
): ColumnDef<AdminTagSummary>[] => {
  return useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Tag Name",
        cell: ({ row }) => {
          const item = row.original;
          return <div className="font-medium">{item.name}</div>;
        },
      },
      {
        accessorKey: "categoryName",
        header: "Category",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <Badge
              style={{
                backgroundColor: item.categoryColor,
                color: "#1F2937", // Dark gray for readability on light backgrounds
                border: "none",
              }}
              size="sm"
            >
              {item.categoryName}
            </Badge>
          );
        },
      },
      {
        accessorKey: "usageCount",
        header: "Usage",
        cell: ({ row }) => {
          const item = row.original;
          return <div className="font-medium">{item.usageCount}</div>;
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
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-center gap-2">
              <Button variant="actionEdit" size="xs" onClick={() => onEdit?.(item)}>
                <Edit className="h-3 w-3" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button variant="actionDelete" size="xs" onClick={() => onDelete?.(item)}>
                <Trash2 className="h-3 w-3" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          );
        },
      },
    ],
    [onEdit, onDelete]
  );
};
