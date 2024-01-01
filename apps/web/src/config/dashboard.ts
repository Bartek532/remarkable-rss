import { Hourglass, Newspaper, RefreshCw, Tablet } from "lucide-react";

export const DASHBOARD_NAVIGATION = [
  { name: "Home", href: "/dashboard", segment: null },
  {
    name: "Feeds",
    href: "/dashboard/feeds",
    segment: "feeds",
  },
  {
    name: "Device",
    href: "/dashboard/device",
    segment: "device",
  },
  {
    name: "Syncs",
    href: "/dashboard/syncs",
    segment: "syncs",
  },
];

export const DASHBOARD_SECONDARY_NAVIGATION = [
  { name: "Settings", href: "/dashboard/settings" },
  {
    name: "Profile",
    href: "/dashboard/settings/profile",
  },
];

export const DASHBOARD_CARDS = [
  {
    title: "Your feeds",
    href: "/dashboard/feeds",
    icon: Newspaper,
    link: "View feeds",
  },
  {
    title: "Your device",
    href: "/dashboard/device",
    icon: Tablet,
    link: "View details",
  },
  {
    title: "Total syncs",
    href: "/dashboard/syncs",
    icon: RefreshCw,
    link: "View syncs",
  },
  {
    title: "Saved time",
    href: "/dashboard/syncs",
    icon: Hourglass,
    link: "View syncs",
  },
];

export enum PAGINATION_TYPE {
  OFFSET = "OFFSET",
  CURSOR = "CURSOR",
}

export const FEEDS_PAGINATION_DEFAULT_PER_PAGE = 5;
