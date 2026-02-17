"use client";

import React from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";

import type { SafeIconProps } from "./SafeIcon.types";

/**
 * Safely renders an icon whether it's a React component, a Lucide icon,
 * or a static image object (SVG/PNG).
 */
export function SafeIcon({ icon: Icon, className, width = 18, height = 18, ...props }: SafeIconProps) {
  if (!Icon) return null;

  // 1. If it's a function or a valid React component type
  if (
    typeof Icon === "function" ||
    (typeof Icon === "object" && Icon !== null && "$$typeof" in (Icon as unknown as Record<string, unknown>))
  ) {
    const Component = Icon as React.ElementType;
    return <Component className={className} width={width} height={height} {...props} />;
  }

  // 2. If it's a static image object (Next.js StaticImageData)
  if (typeof Icon === "object" && ("src" in Icon || typeof Icon === "string")) {
    return <Image src={Icon as StaticImageData} alt="icon" width={width} height={height} className={className} />;
  }

  // Fallback
  return null;
}
