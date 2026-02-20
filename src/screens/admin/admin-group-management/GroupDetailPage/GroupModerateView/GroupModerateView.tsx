"use client";

import { AlertTriangle, CircleSlash, Trash2, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextareaController } from "@/components/form-controllers/TextareaController/TextareaController";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FormProvider } from "react-hook-form";
import { useGroupModerateView } from "./GroupModerateView.hooks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function GroupModerateView() {
  const {
    group,
    isLoading,
    isBanned,
    showBanModal,
    setShowBanModal,
    showUnbanModal,
    setShowUnbanModal,
    showDeleteModal,
    setShowDeleteModal,
    showWarnModal,
    setShowWarnModal,
    banForm,
    unbanForm,
    warnForm,
    handleBan,
    handleUnban,
    handleDelete,
    handleWarnLeader,
    isMutationLoading,
  } = useGroupModerateView();

  if (isLoading && !group) {
    return (
      <div className="flex justify-center py-12">
        <CircleSlash className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  const groupName = group?.name || "Group";

  return (
    <div className="space-y-4 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Current Status */}
        <div className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-[#D4D4D4]">
          <span className="text-xs font-semibold text-[#1F2937]">Current Status</span>
          <div
            className={cn(
              "px-2.5 py-0.5 rounded-full flex items-center justify-center",
              isBanned ? "bg-[#FEE2E2]" : "bg-[#D1FAE5]"
            )}
          >
            <span className={cn("text-[12px] font-semibold", isBanned ? "text-[#991B1B]" : "text-[#065F46]")}>
              {isBanned ? "Suspended" : "Active"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Warn Leader Section */}
        <FormProvider {...warnForm}>
          <section className="p-4 bg-[#FFFBEB] rounded-xl border border-[#FDE68A] flex flex-col gap-3">
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="h-[18px] w-[18px] text-[#92400E]" />
              <h3 className="text-sm font-bold text-[#92400E]">Warn Group Leader</h3>
            </div>
            <p className="text-[13px] font-medium text-[#202020] -mt-1.5">
              Send a warning email to the group leader about policy violations
            </p>

            <div className="flex flex-col">
              <Label htmlFor="message" className="text-sm font-semibold mb-1">
                Warning Message
              </Label>
              <TextareaController
                control={warnForm.control}
                name="message"
                placeholder="Enter warning message (will be sent via email...)"
                variant="adminPrimary"
                className="min-h-[100px] bg-white border-[#D4D4D4] text-[12px] font-semibold"
                error={warnForm.formState.errors.message?.message}
              />
            </div>

            <Button
              className="w-full bg-[#FEE371] hover:bg-[#FDD94E] text-black font-semibold h-11 rounded-xl gap-1.5 shadow-none border border-[#FEE371]"
              onClick={() => setShowWarnModal(true)}
              disabled={!warnForm.formState.isValid || isMutationLoading}
            >
              <Mail className="h-4 w-4" />
              Send Warning Email
            </Button>
          </section>
        </FormProvider>

        {/* Suspend/Unsuspend Section */}
        {!isBanned ? (
          <FormProvider {...banForm}>
            <section className="p-4 bg-[#FFF3E6] rounded-xl border border-[#FEC89A] flex flex-col gap-3">
              <div className="flex items-center gap-1.5">
                <CircleSlash className="h-[18px] w-[18px] text-[#C2410C]" />
                <h3 className="text-sm font-bold text-[#C2410C]">Suspend Group</h3>
              </div>
              <p className="text-[13px] font-medium text-[#202020] -mt-1.5">
                Temporarily disable this group (members cannot access content)
              </p>

              <div className="flex flex-col">
                <Label htmlFor="reason" className="text-sm font-semibold mb-1">
                  Suspension Reason
                </Label>
                <TextareaController
                  control={banForm.control}
                  name="reason"
                  placeholder="Enter reason for suspension (will be shown to leader...)"
                  variant="adminPrimary"
                  className="min-h-[100px] bg-white border-[#D4D4D4] text-[12px] font-semibold"
                  error={banForm.formState.errors.reason?.message}
                />
              </div>

              <Button
                className="w-full bg-[#FEA371] hover:bg-[#FD8E4E] text-black font-semibold h-11 rounded-xl gap-1.5 shadow-none border border-[#FEA371]"
                onClick={() => setShowBanModal(true)}
                disabled={!banForm.formState.isValid || isMutationLoading}
              >
                <CircleSlash className="h-4 w-4" />
                Suspend This Group
              </Button>
            </section>
          </FormProvider>
        ) : (
          <FormProvider {...unbanForm}>
            <section className="p-4 bg-[#ECFDF5] rounded-xl border border-[#6EE7B7] flex flex-col gap-3">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-[18px] w-[18px] text-[#047857]" />
                <h3 className="text-sm font-bold text-[#047857]">Unsuspend Group</h3>
              </div>
              <p className="text-[13px] font-medium text-[#202020] -mt-1.5">
                Remove the suspension from this group and restore access to members
              </p>

              <div className="flex flex-col">
                <Label htmlFor="message" className="text-sm font-medium mb-1">
                  Unsuspension Message
                </Label>
                <TextareaController
                  control={unbanForm.control}
                  name="message"
                  placeholder="Enter message explaining why group is being unsuspended..."
                  variant="adminPrimary"
                  className="min-h-[100px] bg-white border-[#D4D4D4] text-[12px] font-semibold"
                  error={unbanForm.formState.errors.message?.message}
                />
              </div>

              <Button
                className="w-full bg-[#34D399] hover:bg-[#10B981] text-black font-semibold h-11 rounded-xl gap-1.5 shadow-none border border-[#34D399]"
                onClick={() => setShowUnbanModal(true)}
                disabled={!unbanForm.formState.isValid || isMutationLoading}
              >
                <CheckCircle2 className="h-4 w-4" />
                Unsuspend This Group
              </Button>
            </section>
          </FormProvider>
        )}

        {/* Delete Group Section */}
        <section className="p-4 bg-[#FEF2F2] rounded-xl border border-[#FECACA] flex flex-col gap-3">
          <div className="flex items-center gap-1.5">
            <Trash2 className="h-[18px] w-[18px] text-[#B91C1C]" />
            <h3 className="text-sm font-bold text-[#B91C1C]">Delete Group Permanently</h3>
          </div>
          <p className="text-[13px] font-medium text-[#7F1D1D] -mt-1.5">
            This will permanently delete all group data and cannot be undone.
          </p>

          <Button
            className="w-full bg-[#E94B3C] hover:bg-[#D43D2F] text-white font-semibold h-11 rounded-xl gap-1.5 shadow-none border border-[#E94B3C]"
            onClick={() => setShowDeleteModal(true)}
            disabled={isMutationLoading}
          >
            <Trash2 className="h-4 w-4" />
            Delete Group Permanently
          </Button>
        </section>
      </div>

      {/* Confirmation Modals */}
      <Dialog open={showWarnModal} onOpenChange={setShowWarnModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Warning Email?</DialogTitle>
            <DialogDescription>This will send a formal notification to the group leader.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowWarnModal(false)} disabled={isMutationLoading}>
              Cancel
            </Button>
            <Button
              className="bg-amber-500 hover:bg-amber-600 font-bold"
              onClick={handleWarnLeader}
              disabled={isMutationLoading}
            >
              {isMutationLoading && <CircleSlash className="mr-2 h-4 w-4 animate-spin" />}
              Send Warning
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showBanModal} onOpenChange={setShowBanModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-orange-600">Confirm Group Suspension</DialogTitle>
            <DialogDescription>
              Are you sure you want to suspend <strong>{groupName}</strong>? Members will lose all access immediately.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowBanModal(false)} disabled={isMutationLoading}>
              Cancel
            </Button>
            <Button
              className="bg-orange-600 hover:bg-orange-700 font-bold"
              onClick={handleBan}
              disabled={isMutationLoading}
            >
              {isMutationLoading && <CircleSlash className="mr-2 h-4 w-4 animate-spin" />}
              Suspend Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showUnbanModal} onOpenChange={setShowUnbanModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-emerald-600">Restore Group Access</DialogTitle>
            <DialogDescription>
              This will reactivate <strong>{groupName}</strong> and restore access to all its members.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowUnbanModal(false)} disabled={isMutationLoading}>
              Cancel
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 font-bold"
              onClick={handleUnban}
              disabled={isMutationLoading}
            >
              {isMutationLoading && <CircleSlash className="mr-2 h-4 w-4 animate-spin" />}
              Unsuspend Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-md border-red-200">
          <DialogHeader>
            <DialogTitle className="text-red-600">PERMANENT DELETION</DialogTitle>
            <DialogDescription>
              You are about to permanently delete <strong>{groupName}</strong>. This action cannot be undone. All data
              will be lost forever.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)} disabled={isMutationLoading}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 font-bold"
              onClick={handleDelete}
              disabled={isMutationLoading}
            >
              {isMutationLoading && <CircleSlash className="mr-2 h-4 w-4 animate-spin" />}
              Delete Permanently
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
