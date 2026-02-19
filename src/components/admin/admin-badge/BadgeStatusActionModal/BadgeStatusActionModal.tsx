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
  const { badgeId, badgeName, action, isOpen, onClose } = props;
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
          description: "This badge will become visible on the platform. Users can start earning it immediately.",
          confirmText: "Publish",
          variant: "actionPublish" as const,
        };
      case "Archive":
        return {
          title: "Archive Badge",
          description: `Are you sure you want to archive the badge ${badgeName ? `"${badgeName}"` : ""}? This badge will no longer be attainable. Existing earners will keep it, but it will be hidden from new discovery.`,
          confirmText: "Archive",
          variant: "actionArchive" as const,
        };
      case "Clone":
        return {
          title: "Clone Badge",
          description: `Are you sure you want to clone the badge ${badgeName ? `"${badgeName}"` : ""}? This will create a new draft copy of the badge.`,
          confirmText: "Clone",
          variant: "actionClone" as const,
        };
      default:
        return {
          title: "Confirm Action",
          description: "Are you sure you want to proceed?",
          confirmText: "Confirm",
          variant: "default" as const,
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
          <Button type="button" variant={details.variant} onClick={confirmAction} disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {details.confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
