import * as React from "react";
import {
  BookUserIcon,
  GalleryVerticalEnd,
  GaugeIcon,
  MapIcon,
} from "lucide-react";

import { NavMain } from "~/components/nav-main";
import { NavUser } from "~/components/nav-user";
import { NavGuest } from "~/components/nav-guest";
import { TeamSwitcher } from "~/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";
import type { User } from "@prisma/client";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    // {
    //   name: "Starter",
    //   logo: GalleryVerticalEnd,
    //   plan: "Enterprise",
    // },
  ],
  navMain: [
    {
      title: "Paths",
      url: "#",
      icon: MapIcon,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: BookUserIcon,
      isActive: true,
      items: [
        {
          title: "Profile",
          url: "/profile",
        },
      ],
    },
  ],
};

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user?: User }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        {user ? (
          <>
            <NavMain items={data.navMain} />
          </>
        ) : (
          <NavGuest />
        )}
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}
