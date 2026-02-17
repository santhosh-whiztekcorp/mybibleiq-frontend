"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { BadgeDeleteModalProps } from "./BadgeDeleteModal.types";
import { useBadgeDeleteModal } from "./BadgeDeleteModal.hooks";

export function BadgeDeleteModal(props: BadgeDeleteModalProps) {
  const { badgeId, badgeName, isOpen, onClose } = props;
  const { handleDelete, isDeleting } = useBadgeDeleteModal(props);

  const confirmDelete = () => {
    if (badgeId) {
      handleDelete(badgeId);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the badge
            {badgeName ? <span className="font-semibold text-gray-900"> &quot;{badgeName}&quot; </span> : " "}
            and remove it from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="p-6 pt-2 flex sm:justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose} disabled={isDeleting}>
            Cancel
          </Button>
          <Button type="button" variant="actionDelete" onClick={confirmDelete} disabled={isDeleting}>
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
