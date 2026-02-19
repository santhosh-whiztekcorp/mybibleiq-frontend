"use client";

import {
  UserActivityUsersByLocation,
  UserActivityRegistrationStats,
  UserActivityTopScorers,
  UserActivityStats,
} from "@/components/admin/admin-dashboard";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function UserActivity() {
  const { open } = useSidebar();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <UserActivityStats />
      </div>

      <div
        className={cn(
          "grid grid-cols-1 gap-4",
          open ? "md:grid-cols-1 lg:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"
        )}
      >
        <UserActivityTopScorers />
        <UserActivityUsersByLocation />
        <UserActivityRegistrationStats />
      </div>
    </div>
  );
}
