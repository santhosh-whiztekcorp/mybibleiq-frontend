"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { icons } from "@/assets";

export function PageLoader() {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const diff = Math.max(2, (100 - prev) / 8);
        return Math.min(prev + diff, 100);
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#A9DFEC] min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-10">
        <Image src={icons.logoColored} alt="Logo" width={197} height={133} className="w-[230px] h-auto" />
        <div className="flex flex-col items-center gap-2">
          <div className="bg-[#202020] rounded-full p-1 h-[16px] w-full max-w-[250px]">
            <div
              className="h-full rounded-full bg-linear-to-r from-[#A9E2FC] to-[#FAE69F] transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-base font-semibold font-plus-jakarta-sans text-center text-[#355A81]">
            Launching MyBibleIQ Admin Portal
          </p>
        </div>
      </div>
    </div>
  );
}
