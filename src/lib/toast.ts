import { toast } from "sonner";

export type ToastOptions = {
  type: "success" | "error" | "info" | "warning";
  text1: string;
  text2?: string;
};

const Toast = {
  show: (options: ToastOptions) => {
    const { type, text1, text2 } = options;
    const description = text2 ? text2 : undefined;

    switch (type) {
      case "success":
        toast.success(text1, {
          description,
        });
        break;
      case "error":
        toast.error(text1, {
          description,
        });
        break;
      case "info":
        toast.info(text1, {
          description,
        });
        break;
      case "warning":
        toast.warning(text1, {
          description,
        });
        break;
      default:
        toast(text1, {
          description,
        });
    }
  },
};

export default Toast;
