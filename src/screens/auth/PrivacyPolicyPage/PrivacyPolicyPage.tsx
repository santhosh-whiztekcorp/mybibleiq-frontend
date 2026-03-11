"use client";

import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { pngIcons } from "@/assets";
import { useGetPrivacyPolicy } from "@/resources/user-settings";
import { ROUTES } from "@/constants/routes";
import { formatDate } from "@/utils/formatting";

export function PrivacyPolicyPage() {
  const { data, isLoading, error } = useGetPrivacyPolicy();

  const displayData = data;
  const showError = !!error;

  return (
    <div className="min-h-screen bg-white font-plus-jakarta-sans">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-5 py-4 flex items-center gap-4">
        <Link href={ROUTES.HOME} className="flex items-center">
          <Image
            src={pngIcons.logoColored}
            alt="MyBibleIQ Logo"
            width={72}
            height={55}
            className="h-auto w-[72px] object-contain"
            priority
            quality={95}
          />
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-5 py-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black" />
            <p className="text-sm text-[#6b7280]">Loading Privacy Policy…</p>
          </div>
        ) : showError ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <p className="text-base text-red-500 font-medium">Failed to load content.</p>
            <p className="text-sm text-[#6b7280]">Please try again later.</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#1f2937] mb-2">{displayData?.title || "Privacy Policy"}</h1>
              {displayData?.lastUpdated && (
                <p className="text-sm text-[#6b7280]">
                  Last Updated: {formatDate(new Date(displayData.lastUpdated), "MMMM D, YYYY")}
                </p>
              )}
            </div>

            <div className="max-w-none text-[#4b5563] leading-relaxed bg-[#f9fafb] rounded-xl p-8 border border-gray-200">
              {displayData?.content ? (
                <ReactMarkdown
                  components={{
                    h3: ({ ...props }) => (
                      <h3 className="text-xl font-extrabold text-[#111827] first:mt-0 mt-7 mb-1 block" {...props} />
                    ),
                    p: ({ ...props }) => <p className="mb-3 leading-7 text-base" {...props} />,
                    ul: ({ ...props }) => (
                      <ul className="list-disc pl-8 mb-5 space-y-2 marker:text-gray-400" {...props} />
                    ),
                    li: ({ ...props }) => <li className="pl-1" {...props} />,
                    strong: ({ ...props }) => <strong className="font-bold text-[#111827]" {...props} />,
                  }}
                >
                  {displayData.content}
                </ReactMarkdown>
              ) : (
                "Content not available."
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
