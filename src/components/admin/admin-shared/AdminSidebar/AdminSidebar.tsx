"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { TaskListIcon, BookOpenIcon, TrophyIcon, CircleQuestionIcon, DashboardIcon } from "@/assets";
import { pngIcons } from "@/assets";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { GlobeIcon, LogOut, MessageSquare, UserIcon, Users } from "lucide-react";
import { useLogout } from "@/resources/auth/auth.hooks";
import { cn } from "@/lib/utils";

import { ROUTES } from "@/constants/routes";

const menuItems = [
  {
    title: "Dashboard",
    url: ROUTES.DASHBOARD,
    icon: DashboardIcon,
  },
  {
    title: "Spirit Food Manager",
    url: ROUTES.SPIRIT_FOOD,
    icon: TaskListIcon,
  },
  {
    title: "Quest Manager",
    url: ROUTES.QUEST_MANAGER,
    icon: TrophyIcon,
  },
  {
    title: "Quiz Manager",
    url: ROUTES.QUIZ_MANAGER,
    icon: CircleQuestionIcon,
  },
  {
    title: "Media Manager",
    url: ROUTES.MEDIA_MANAGER,
    icon: BookOpenIcon,
  },
  {
    title: "User Manager",
    url: ROUTES.USER_MANAGER,
    icon: UserIcon,
  },
  {
    title: "Group Manager",
    url: ROUTES.GROUP_MANAGER,
    icon: Users,
  },
  {
    title: "Chatbot Manager",
    url: ROUTES.CHATBOT_MANAGER,
    icon: MessageSquare,
  },
  {
    title: "Global Updates",
    url: ROUTES.GLOBAL_UPDATES,
    icon: GlobeIcon,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { mutate: logout } = useLogout();

  return (
    <Sidebar
      collapsible="icon"
      className="**:data-[sidebar=sidebar]:bg-[#B3E5FC]! **:data-[sidebar=sidebar-inner]:bg-[#B3E5FC]!"
    >
      <SidebarHeader className="bg-[#B3E5FC]! p-0! flex-row! items-center! justify-center! w-full! group-data-[collapsible=icon]:hidden">
        <div className="flex items-center justify-start w-full px-6 pt-5 pb-5">
          <Image
            src={pngIcons.logoColored}
            alt="MyBibleIQ Logo"
            width={80}
            height={56}
            className="h-auto w-[80px] object-contain"
            priority
            quality={95}
          />
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-[#B3E5FC]! overflow-visible!">
        <SidebarGroup className="overflow-visible!">
          <SidebarGroupContent className="overflow-visible!">
            <SidebarMenu className="overflow-visible!">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.url || pathname?.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.url} className="overflow-visible!">
                    <SidebarMenuButton
                      asChild={false}
                      isActive={isActive}
                      tooltip={item.title}
                      onClick={() => router.push(item.url)}
                      className={cn(
                        "rounded-xl! px-4! py-5! font-plus-jakarta-sans text-sm! font-semibold! mb-1! cursor-pointer",
                        "transition-colors! overflow-visible!",
                        "flex items-center justify-start gap-3",
                        "group-data-[collapsible=icon]:!py-3! group-data-[collapsible=icon]:!px-2! group-data-[collapsible=icon]:!justify-center! group-data-[collapsible=icon]:gap-0!",
                        isActive
                          ? "bg-black! text-white! [&_svg]:text-white! hover:bg-black!"
                          : "bg-transparent! text-black! [&_svg]:text-black! hover:bg-transparent!"
                      )}
                    >
                      <div
                        className="flex items-center justify-center shrink-0 overflow-visible"
                        style={{ width: 18, height: 18, minWidth: 18, minHeight: 18 }}
                      >
                        <Icon
                          width={18}
                          height={18}
                          className="shrink-0! block!"
                          style={{
                            display: "block",
                            flexShrink: 0,
                            width: 18,
                            height: 18,
                            minWidth: 18,
                            minHeight: 18,
                            overflow: "visible",
                          }}
                        />
                      </div>
                      <span className="group-data-[collapsible=icon]:hidden whitespace-nowrap">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-[#B3E5FC]! p-4 pb-8!">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => logout()}
              tooltip="Sign Out"
              className={cn(
                "rounded-xl! px-4! py-5! font-plus-jakarta-sans text-sm! font-semibold! cursor-pointer!",
                "transition-colors! overflow-visible!",
                "group-data-[collapsible=icon]:!py-3! group-data-[collapsible=icon]:!px-2! group-data-[collapsible=icon]:!justify-center!",
                "text-red-600! [&_svg]:text-red-600! bg-transparent!",
                "hover:bg-red-50! hover:text-red-700! hover:border-red-700! hover:[&_svg]:text-red-700!"
              )}
            >
              <div
                className="flex items-center justify-center shrink-0 overflow-visible"
                style={{ width: 18, height: 18, minWidth: 18, minHeight: 18 }}
              >
                <LogOut width={18} height={18} className="shrink-0! block!" />
              </div>
              <span className="group-data-[collapsible=icon]:hidden whitespace-nowrap">Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
