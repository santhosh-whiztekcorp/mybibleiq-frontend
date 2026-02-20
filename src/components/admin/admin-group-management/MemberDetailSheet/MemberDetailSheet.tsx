"use client";

import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CrownIcon, UserSwitchIcon, PersonOutlineIcon, PersonMinusIcon, CircleSlashIcon } from "@/assets";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import { type MemberDetailSheetProps } from "./MemberDetailSheet.types";
import { ADMIN_GROUP_MEMBER_ROLE_LABELS } from "@/resources/admin-group-management";
import { useAuthStore } from "@/resources/auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

type ConfirmState = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  variant: "default" | "destructive" | "actionDelete";
  actionFn: () => void;
};

export const MemberDetailSheet: React.FC<MemberDetailSheetProps> = ({
  member,
  isOpen,
  onOpenChange,
  onBan,
  onRemove,
  onChangeRole,
  isActionLoading,
}) => {
  const currentUser = useAuthStore((state) => state.user);

  const [confirmState, setConfirmState] = React.useState<ConfirmState>({
    isOpen: false,
    title: "",
    description: "",
    confirmLabel: "Confirm",
    variant: "default",
    actionFn: () => {},
  });

  const handleConfirmAction = (
    title: string,
    description: string,
    confirmLabel: string,
    variant: ConfirmState["variant"],
    actionFn: () => void
  ) => {
    setConfirmState({
      isOpen: true,
      title,
      description,
      confirmLabel,
      variant,
      actionFn,
    });
  };

  if (!member) return null;

  const { id, name, username, avatarUrl, role, status, myBibleIQ, assignmentsCompleted, joinedAt } = member;
  const isSelf = currentUser?.id === id;

  const initials = username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const getRoleStyle = () => {
    switch (role) {
      case "leader":
        return "bg-amber-100 text-amber-800";
      case "co_leader":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getStatusStyle = () => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800";
      case "banned":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="sm:max-w-[500px] flex flex-col w-full p-0">
        <SheetHeader className="p-6 pb-2 border-b border-gray-100">
          <SheetTitle>Member Details</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 overflow-y-auto w-full">
          <div className="p-6 flex flex-col gap-8">
            {/* Profile Overview Card */}
            <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <Avatar className="h-20 w-20 mb-4 border border-[#E5E7EB] font-bold">
                <AvatarImage src={avatarUrl || ""} alt={name} />
                <AvatarFallback className="bg-[#F3F3F3] text-[#8B8B8B] text-[32px]">{initials}</AvatarFallback>
              </Avatar>

              <h3 className="text-xl font-bold text-slate-900 mb-1">{name}</h3>
              <p className="text-sm font-medium text-slate-500 mb-4">@{username}</p>

              <div className="flex items-center gap-2 mb-6">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getRoleStyle()}`}>
                  {ADMIN_GROUP_MEMBER_ROLE_LABELS[role]}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusStyle()}`}>
                  {status}
                </span>
              </div>

              <div className="flex items-center w-full justify-around pt-6 border-t border-slate-200">
                <div className="flex flex-col items-center flex-1">
                  <span className="text-xl font-bold text-blue-600 mb-1">{myBibleIQ || 0}</span>
                  <span className="text-xs font-medium text-slate-500">MyBibleIQ</span>
                </div>
                <div className="w-px h-10 bg-slate-200 mx-2" />
                <div className="flex flex-col items-center flex-1">
                  <span className="text-xl font-bold text-emerald-600 mb-1">{assignmentsCompleted || 0}</span>
                  <span className="text-xs font-medium text-slate-500">Assignments</span>
                </div>
                <div className="w-px h-10 bg-slate-200 mx-2" />
                <div className="flex flex-col items-center flex-1">
                  <span className="text-sm font-bold text-slate-700 mb-1 mt-1">
                    {format(new Date(joinedAt), "MMM yyyy")}
                  </span>
                  <span className="text-xs font-medium text-slate-500">Joined</span>
                </div>
              </div>
            </div>

            {/* Actions Panel */}
            {!isSelf && status === "active" && (
              <div className="flex flex-col gap-6">
                {isActionLoading ? (
                  <div className="flex items-center justify-center py-10">
                    <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                  </div>
                ) : (
                  <>
                    <div className="flex flex-col gap-3">
                      <h4 className="text-sm font-bold text-slate-900 px-1">Role Management</h4>

                      {role === "leader" && (
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="outline"
                            className="w-full justify-center h-12 bg-white hover:bg-slate-50 font-semibold gap-2.5"
                            onClick={() =>
                              handleConfirmAction(
                                "Demote to Co-Leader",
                                `Are you sure you want to demote ${name} to Co-Leader? They will lose some administrative privileges.`,
                                "Demote to Co-Leader",
                                "default",
                                () => {
                                  onChangeRole(id, "co_leader");
                                  setConfirmState((prev) => ({ ...prev, isOpen: false }));
                                }
                              )
                            }
                          >
                            <UserSwitchIcon className="h-5 w-5  text-[#111827]" />
                            Demote to Co-Leader
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-center h-12 bg-white hover:bg-slate-50 font-semibold gap-2.5"
                            onClick={() =>
                              handleConfirmAction(
                                "Demote to Member",
                                `Are you sure you want to demote ${name} to Member? They will no longer have any administrative privileges.`,
                                "Demote to Member",
                                "default",
                                () => {
                                  onChangeRole(id, "member");
                                  setConfirmState((prev) => ({ ...prev, isOpen: false }));
                                }
                              )
                            }
                          >
                            <PersonOutlineIcon className="h-5 w-5  text-[#111827]" />
                            Demote to Member
                          </Button>
                        </div>
                      )}

                      {role === "member" && (
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="outline"
                            className="w-full justify-center h-12 bg-white hover:bg-slate-50 font-semibold gap-2.5"
                            onClick={() =>
                              handleConfirmAction(
                                "Promote to Co-Leader",
                                `Are you sure you want to promote ${name} to Co-Leader? They will gain administrative privileges over the group.`,
                                "Promote to Co-Leader",
                                "default",
                                () => {
                                  onChangeRole(id, "co_leader");
                                  setConfirmState((prev) => ({ ...prev, isOpen: false }));
                                }
                              )
                            }
                          >
                            <UserSwitchIcon className="h-5 w-5  text-[#111827]" />
                            Promote to Co-Leader
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-center h-12 bg-[#FFF7E0] hover:bg-[#FEF3C7] border-[#EFCC68] text-[#F59E0B] font-bold gap-2.5"
                            onClick={() =>
                              handleConfirmAction(
                                "Promote to Leader",
                                `Are you sure you want to make ${name} the Leader? They will gain full administrative control over the group.`,
                                "Make Leader",
                                "default",
                                () => {
                                  onChangeRole(id, "leader");
                                  setConfirmState((prev) => ({ ...prev, isOpen: false }));
                                }
                              )
                            }
                          >
                            <CrownIcon className="h-5 w-5 fill-[#F59E0B] text-[#F59E0B]" />
                            Make Leader
                          </Button>
                        </div>
                      )}

                      {role === "co_leader" && (
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="outline"
                            className="w-full justify-center h-12 bg-[#FFF7E0] hover:bg-[#FEF3C7] border-[#EFCC68] text-[#F59E0B] font-bold gap-2.5"
                            onClick={() =>
                              handleConfirmAction(
                                "Promote to Leader",
                                `Are you sure you want to make ${name} the Leader? They will gain full administrative control over the group.`,
                                "Make Leader",
                                "default",
                                () => {
                                  onChangeRole(id, "leader");
                                  setConfirmState((prev) => ({ ...prev, isOpen: false }));
                                }
                              )
                            }
                          >
                            <CrownIcon className="h-5 w-5 fill-[#F59E0B] text-[#F59E0B]" />
                            Make Leader
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-center h-12 bg-white hover:bg-slate-50 font-semibold gap-2.5"
                            onClick={() =>
                              handleConfirmAction(
                                "Demote to Member",
                                `Are you sure you want to demote ${name} to Member? They will no longer have any administrative privileges.`,
                                "Demote to Member",
                                "default",
                                () => {
                                  onChangeRole(id, "member");
                                  setConfirmState((prev) => ({ ...prev, isOpen: false }));
                                }
                              )
                            }
                          >
                            <PersonOutlineIcon className="h-5 w-5  text-[#111827]" />
                            Demote to Member
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-3">
                      <h4 className="text-sm font-bold text-slate-900 px-1">Danger Zone</h4>
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          className="w-full justify-center h-12 bg-red-50 hover:bg-red-100 border-red-200 text-red-700 font-bold gap-2.5"
                          onClick={() =>
                            handleConfirmAction(
                              "Remove Member",
                              `Are you sure you want to remove ${name} from this group? They will lose access to all group content and assignments.`,
                              "Remove Member",
                              "actionDelete",
                              () => {
                                onRemove(id);
                                setConfirmState((prev) => ({ ...prev, isOpen: false }));
                              }
                            )
                          }
                        >
                          <PersonMinusIcon className="h-5 w-5 text-[#EF4444]" />
                          Remove from Group
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-center h-12 bg-red-50 hover:bg-red-100 border-red-200 text-red-700 font-bold gap-2.5"
                          onClick={() =>
                            handleConfirmAction(
                              "Ban Member",
                              `Are you sure you want to ban ${name}? Banning a member removes them from the group completely and prevents them from rejoining.`,
                              "Ban Member",
                              "actionDelete",
                              () => {
                                onBan(id);
                                setConfirmState((prev) => ({ ...prev, isOpen: false }));
                              }
                            )
                          }
                        >
                          <CircleSlashIcon className="h-5 w-5 fill-current text-[#EF4444]" />
                          Ban Member
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>

      <Dialog open={confirmState.isOpen} onOpenChange={(isOpen) => setConfirmState((prev) => ({ ...prev, isOpen }))}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{confirmState.title}</DialogTitle>
            <DialogDescription>{confirmState.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="actionCancel"
              onClick={() => setConfirmState((prev) => ({ ...prev, isOpen: false }))}
              disabled={isActionLoading}
            >
              Cancel
            </Button>
            <Button
              variant={confirmState.variant === "actionDelete" ? "actionDelete" : "actionPublish"}
              onClick={confirmState.actionFn}
              disabled={isActionLoading}
            >
              {isActionLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {confirmState.confirmLabel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Sheet>
  );
};
