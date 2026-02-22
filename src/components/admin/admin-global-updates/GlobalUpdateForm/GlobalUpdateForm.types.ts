import { CreateGlobalUpdateInput } from "@/resources/admin-global-updates/admin-global-updates.types";
import { UseFormReturn } from "react-hook-form";

export type GlobalUpdateFormProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isEdit?: boolean;
  id?: string;
};

export type GlobalUpdateFormHookProps = GlobalUpdateFormProps;

export type GlobalUpdateFormHookReturn = {
  form: UseFormReturn<CreateGlobalUpdateInput>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isMutationLoading: boolean;
  isEditMode: boolean;
  isOpen: boolean;
  handleOpenChange: (open: boolean) => void;
};
