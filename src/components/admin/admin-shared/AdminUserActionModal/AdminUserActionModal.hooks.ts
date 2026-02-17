import { useEffect, useMemo } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { AdminUserActionModalProps } from "./AdminUserActionModal.types";
import { getActionConfig } from "./AdminUserActionModal.utils";

const suspendSchema = z.object({
  reason: z.string().min(1, "Reason is required"),
  suspendUntil: z.date().optional(),
});

const deleteSchema = z.object({
  reason: z.string().optional(),
  deleteData: z.boolean().optional(),
});

export type AdminUserActionFormValues = {
  reason: string;
  suspendUntil?: Date;
  deleteData?: boolean;
};

export const useAdminUserActionModal = (props: AdminUserActionModalProps) => {
  const { open, action, onConfirm, onOpenChange } = props;
  const config = getActionConfig(action);

  const minSuspendDate = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return tomorrow;
  }, []);

  const formSchema = useMemo(() => {
    if (action === "suspend") return suspendSchema;
    return deleteSchema;
  }, [action]);

  const form = useForm<AdminUserActionFormValues>({
    resolver: zodResolver(formSchema) as Resolver<AdminUserActionFormValues>,
    defaultValues: {
      reason: "",
      deleteData: action === "delete" ? false : undefined,
      suspendUntil: undefined,
    },
  });

  useEffect(() => {
    if (!open) {
      form.reset({
        reason: "",
        deleteData: action === "delete" ? false : undefined,
        suspendUntil: undefined,
      });
    }
  }, [open, form, action]);

  const handleSubmit = form.handleSubmit((values) => {
    if (action === "suspend") {
      const suspendUntil = values.suspendUntil?.toISOString();
      onConfirm(values.reason, undefined, suspendUntil);
    } else {
      onConfirm(values.reason || "", values.deleteData);
    }
    onOpenChange(false);
  });

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  return { form, config, handleSubmit, handleCancel, minSuspendDate };
};
