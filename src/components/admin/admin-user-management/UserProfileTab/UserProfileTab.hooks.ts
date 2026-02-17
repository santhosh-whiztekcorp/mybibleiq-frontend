import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useGetAdminUserManagementProfile,
  useSuspendAdminUserManagement,
  useActivateAdminUserManagement,
  useDeleteAdminUserManagement,
} from "@/resources/admin-user-management";
import { ADMIN_ROUTES } from "@/constants/routes/admin.routes";
import type { UserAction } from "@/components/admin/admin-shared/AdminUserActionModal/AdminUserActionModal.types";
import type { ConfirmationAction } from "@/components/admin/admin-shared/AdminConfirmationModal/AdminConfirmationModal.types";

export const useUserProfileTab = (userId: string) => {
  const router = useRouter();
  const { data: profileData, isLoading, error } = useGetAdminUserManagementProfile(userId);
  const suspendMutation = useSuspendAdminUserManagement();
  const activateMutation = useActivateAdminUserManagement();
  const deleteMutation = useDeleteAdminUserManagement();

  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<UserAction | null>(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmationAction, setConfirmationAction] = useState<ConfirmationAction | null>(null);

  const showSuspendModal = () => {
    setModalAction("suspend");
    setIsActionModalOpen(true);
  };

  const showActivateConfirmation = () => {
    setConfirmationAction("activate");
    setIsConfirmationModalOpen(true);
  };

  const showDeleteModal = () => {
    setModalAction("delete");
    setIsActionModalOpen(true);
  };

  const handleCloseActionModal = () => {
    setIsActionModalOpen(false);
    setModalAction(null);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
    setConfirmationAction(null);
  };

  const handleConfirmAction = (reason: string, deleteData?: boolean, suspendUntil?: string) => {
    if (!userId || !modalAction) return;

    if (modalAction === "suspend") {
      suspendMutation.mutate({
        userId,
        input: { reason, suspendUntil },
      });
    } else if (modalAction === "delete") {
      deleteMutation.mutate(
        {
          userId,
          input: { reason, deleteData: deleteData ?? false },
        },
        {
          onSuccess: () => {
            router.push(ADMIN_ROUTES.USER_MANAGER);
          },
        }
      );
    }

    handleCloseActionModal();
  };

  const handleConfirmActivation = () => {
    if (!userId) return;
    activateMutation.mutate(userId);
    handleCloseConfirmationModal();
  };

  const handleActionModalOpenChange = (open: boolean) => {
    if (!open) {
      handleCloseActionModal();
    } else {
      setIsActionModalOpen(true);
    }
  };

  const handleConfirmationModalOpenChange = (open: boolean) => {
    if (!open) {
      handleCloseConfirmationModal();
    } else {
      setIsConfirmationModalOpen(true);
    }
  };

  return {
    profile: profileData?.profile,
    stats: profileData?.stats,
    isLoading,
    error,
    isActionModalOpen,
    modalAction,
    isConfirmationModalOpen,
    confirmationAction,
    showSuspendModal,
    showActivateConfirmation,
    showDeleteModal,
    handleCloseActionModal,
    handleCloseConfirmationModal,
    handleConfirmAction,
    handleConfirmActivation,
    handleActionModalOpenChange,
    handleConfirmationModalOpenChange,
    isSuspending: suspendMutation.isPending,
    isActivating: activateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
};
