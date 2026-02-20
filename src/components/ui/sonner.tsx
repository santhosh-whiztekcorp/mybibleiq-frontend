"use client";

import { BellIcon } from "lucide-react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group font-fredoka"
      position="top-right"
      toastOptions={{
        classNames: {
          toast: "group toast",
          description: "group-[.toast]:opacity-90",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      icons={{
        success: <BellIcon className="w-7 h-7" />,
        info: <BellIcon className="w-7 h-7" />,
        warning: <BellIcon className="w-7 h-7" />,
        error: <BellIcon className="w-7 h-7" />,
        loading: <BellIcon className="w-7 h-7 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--card)",
          "--normal-text": "var(--card-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
          "--success-bg": "var(--card)",
          "--success-text": "var(--card-foreground)",
          "--success-border": "var(--border)",
          "--error-bg": "var(--card)",
          "--error-text": "var(--destructive)",
          "--error-border": "var(--destructive)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
