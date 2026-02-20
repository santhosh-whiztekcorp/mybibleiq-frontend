import { useState, useCallback } from "react";
import {
  useGetAdminGroupManagementDetail,
  useBanAdminGroup,
  useUnbanAdminGroup,
  useDeleteAdminGroup,
  useWarnGroupLeader,
  useBanAdminGroupForm,
  useUnbanAdminGroupForm,
  useWarnGroupLeaderForm,
} from "@/resources/admin-group-management";
import { useGroupDetailPage } from "../GroupDetailPage.hooks";
import { useRouter } from "next/navigation";
import { ADMIN_ROUTES } from "@/constants/routes/admin.routes";
import { type UseGroupModerateViewReturn } from "./GroupModerateView.types";

export const useGroupModerateView = (): UseGroupModerateViewReturn => {
  const router = useRouter();
  const { groupId } = useGroupDetailPage();
  const { data: group, isLoading } = useGetAdminGroupManagementDetail(groupId);

  const [showBanModal, setShowBanModal] = useState(false);
  const [showUnbanModal, setShowUnbanModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showWarnModal, setShowWarnModal] = useState(false);

  const banMutation = useBanAdminGroup();
  const unbanMutation = useUnbanAdminGroup();
  const deleteMutation = useDeleteAdminGroup();
  const warnLeaderMutation = useWarnGroupLeader();

  const isBanned = group?.status === "banned";

  // Forms
  const banForm = useBanAdminGroupForm({ reason: "" });
  const unbanForm = useUnbanAdminGroupForm({ message: "" });
  const warnForm = useWarnGroupLeaderForm({ message: "", notificationType: "email" });

  const handleBan = banForm.handleSubmit((data) => {
    banMutation.mutate(
      { groupId, input: data },
      {
        onSuccess: () => {
          setShowBanModal(false);
          banForm.reset();
        },
      }
    );
  });

  const handleUnban = unbanForm.handleSubmit((data) => {
    unbanMutation.mutate(
      { groupId, input: data },
      {
        onSuccess: () => {
          setShowUnbanModal(false);
          unbanForm.reset();
        },
      }
    );
  });

  const handleDelete = useCallback(() => {
    deleteMutation.mutate(
      { groupId },
      {
        onSuccess: () => {
          setShowDeleteModal(false);
          router.push(ADMIN_ROUTES.GROUP_MANAGER);
        },
      }
    );
  }, [groupId, deleteMutation, router]);

  const handleWarnLeader = warnForm.handleSubmit((data) => {
    warnLeaderMutation.mutate(
      {
        groupId,
        input: { ...data, notificationType: "email" },
      },
      {
        onSuccess: () => {
          setShowWarnModal(false);
          warnForm.reset();
        },
      }
    );
  });

  return {
    group,
    isLoading,
    isBanned,
    // Modals
    showBanModal,
    setShowBanModal,
    showUnbanModal,
    setShowUnbanModal,
    showDeleteModal,
    setShowDeleteModal,
    showWarnModal,
    setShowWarnModal,
    // Forms
    banForm,
    unbanForm,
    warnForm,
    // Handlers
    handleBan,
    handleUnban,
    handleDelete,
    handleWarnLeader,
    // Loading states
    isMutationLoading:
      banMutation.isPending || unbanMutation.isPending || deleteMutation.isPending || warnLeaderMutation.isPending,
  };
};
