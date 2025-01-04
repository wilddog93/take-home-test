import { MdPersonOutline } from "react-icons/md";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Reqres.in API with Next.js",
  description: "Make beautiful websites regardless of your design experience.",
  sideMenuItems: [
    {
      label: "Connected Users",
      href: "/connected-users",
      icon: MdPersonOutline,
      badge: {
        label: "New",
        color: "success",
        variant: "light",
      },
      children: [],
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
