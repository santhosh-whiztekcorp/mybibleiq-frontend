import type { StaticImageData } from "next/image";
import type { ElementType, ComponentPropsWithoutRef } from "react";

export type SafeIconProps = {
  icon: ElementType | StaticImageData | string | null | undefined;
  className?: string;
  width?: number;
  height?: number;
} & ComponentPropsWithoutRef<"svg">;
