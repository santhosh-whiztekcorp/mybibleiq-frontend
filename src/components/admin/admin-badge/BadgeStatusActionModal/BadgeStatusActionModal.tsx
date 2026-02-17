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
import { BadgeStatusActionModalProps } from "./BadgeStatusActionModal.types";
import { useBadgeStatusActionModal } from "./BadgeStatusActionModal.hooks";

export function BadgeStatusActionModal(props: BadgeStatusActionModalProps) {
  const { badgeId, action, isOpen, onClose } = props;
  const { handleAction, isPending } = useBadgeStatusActionModal(props);

  const confirmAction = () => {
    if (badgeId && action) {
      handleAction(badgeId, action);
    }
  };

  const getDetails = () => {
    switch (action) {
      case "Publish":
        return {
          title: "Publish Badge",
          description: "This badge will determine visible on the platform. Users can start earning it immediately.",
          confirmText: "Publish",
        };
      case "Archive":
        return {
          title: "Archive Badge",
          description:
            "This badge will no longer be attainable. Existing earners will keep it, but it will be hidden from new discovery.",
          confirmText: "Archive",
        };
      default:
        return {
          title: "Confirm Action",
          description: "Are you sure you want to proceed?",
          confirmText: "Confirm",
        };
    }
  };

  const details = getDetails();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>{details.title}</DialogTitle>
          <DialogDescription>{details.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="p-6 pt-2 flex sm:justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="default" // Using default mostly, or I could use a specific variant if defined
            onClick={confirmAction}
            disabled={isPending}
            className={action === "Archive" ? "bg-orange-600 hover:bg-orange-700" : ""}
          >
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {details.confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
