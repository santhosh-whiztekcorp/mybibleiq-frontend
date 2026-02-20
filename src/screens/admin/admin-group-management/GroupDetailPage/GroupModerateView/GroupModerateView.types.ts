import { type AdminGroupDetail } from "@/resources/admin-group-management/admin-group-management.types";
import {
  type useBanAdminGroupForm,
  type useUnbanAdminGroupForm,
  type useWarnGroupLeaderForm,
} from "@/resources/admin-group-management";

export type UseGroupModerateViewReturn = {
  group: AdminGroupDetail | undefined;
  isLoading: boolean;
  isBanned: boolean;
  showBanModal: boolean;
  setShowBanModal: (show: boolean) => void;
  showUnbanModal: boolean;
  setShowUnbanModal: (show: boolean) => void;
  showDeleteModal: boolean;
  setShowDeleteModal: (show: boolean) => void;
  showWarnModal: boolean;
  setShowWarnModal: (show: boolean) => void;
  banForm: ReturnType<typeof useBanAdminGroupForm>;
  unbanForm: ReturnType<typeof useUnbanAdminGroupForm>;
  warnForm: ReturnType<typeof useWarnGroupLeaderForm>;
  handleBan: () => void;
  handleUnban: () => void;
  handleDelete: () => void;
  handleWarnLeader: () => void;
  isMutationLoading: boolean;
};
