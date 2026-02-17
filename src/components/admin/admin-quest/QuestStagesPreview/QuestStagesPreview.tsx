"use client";

import * as React from "react";
import Image from "next/image";
import type { QuestStagesPreviewProps } from "./QuestStagesPreview.types";

const FALLBACK_WIDTH = 400;

export function QuestStagesPreview({ themeConfig }: QuestStagesPreviewProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth || FALLBACK_WIDTH;
        setHeight(themeConfig.finalHeight(width));
      }
    };

    updateHeight();
    const resizeObserver = new ResizeObserver(updateHeight);
    const el = containerRef.current;
    if (el) resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, [themeConfig]);

  const contentHeight = height || themeConfig.finalHeight(FALLBACK_WIDTH);

  return (
    <div ref={containerRef} className="h-full w-full min-h-[400px] rounded-2xl overflow-hidden">
      <div className="relative w-full" style={{ height: contentHeight, minHeight: contentHeight }}>
        <Image
          src={themeConfig.stagesBackgroundImage}
          alt="Quest stages theme preview"
          width={themeConfig.stagesBackgroundImage.width}
          height={themeConfig.stagesBackgroundImage.height}
          className="w-full object-contain object-top rounded-2xl overflow-hidden"
          style={{ width: "100%", height: contentHeight, objectFit: "contain", objectPosition: "top" }}
        />
      </div>
    </div>
  );
}
