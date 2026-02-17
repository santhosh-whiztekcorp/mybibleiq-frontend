"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { inputVariants } from "./input";

const passwordInputVariants = inputVariants;

function PasswordInput({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof passwordInputVariants>) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative w-full">
      <input
        type={showPassword ? "text" : "password"}
        data-slot="password-input"
        data-variant={variant}
        className={cn(passwordInputVariants({ variant }), "pr-10", className)}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff className="size-4 opacity-50" /> : <Eye className="size-4 opacity-50" />}
      </button>
    </div>
  );
}

export { PasswordInput, passwordInputVariants };
