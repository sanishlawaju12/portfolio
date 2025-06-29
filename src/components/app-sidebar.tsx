"use client";

import * as React from "react";
import { GalleryVerticalEnd, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "DASHBOARD",
      logo: GalleryVerticalEnd,
      plan: "",
    },
  ],
  navMain: [
    {
      title: "Blog",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard/blogs",
        },
        {
          title: "All Blogs",
          url: "/dashboard/blogs/all-blogs",
        },
        {
          title: "Blog Category",
          url: "/dashboard/blogs/blog-category",
        },
        {
          title: "Blog Tags",
          url: "/dashboard/blogs/blog-tags",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
