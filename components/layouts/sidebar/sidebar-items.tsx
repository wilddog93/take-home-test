import { Tab, Tabs } from "@nextui-org/react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";

import { Icon } from "@/components/icons";

export interface TabProps {
  label: string;
  href: string;
  icon: IconType;
  children: TabProps[];
}

interface TabsProps {
  item: TabProps;
  isOpen?: boolean;
  ariaLabel?: string;
  placement?: "top" | "bottom" | "start" | "end";
  isVertical?: boolean;
  className?: string;
  [key: string]: any;
}

export default function SideNavItem({
  item,
  isOpen,
  placement = "bottom",
  isVertical = false,
  ...props
}: TabsProps) {
  const pathname = usePathname();

  return (
    <Tabs
      fullWidth
      aria-label="Options"
      classNames={{
        base: "w-full",
        tabList: "w-full relative rounded-none p-0 border-divider px-0",
        cursor:
          "w-1 h-full rounded-sm shadow-inner bg-primary top-0 left-0 transition-all duration-500 ease-in-out group-data-[hover=true]:w-full",
        tab: "px-0 h-12 px-6 justify-start data-[hover-unselected=true]:group-hover:opacity-100",
        tabContent:
          "text-lg md:text-xl group-data-[selected=true]:text-gray-600 group-data-[selected=true]:font-bold group-data-[selected=true]:text-foreground group-data-[selected=true]:text-primary group-data-[hover-unselected=true]:group-hover:font-bold data-[hover-unselected=true]:group-hover:text-primary group-data-[hover-unselected=true]:group-hover:text-primary group-data-[selected=true]:group-hover:text-white",
        panel: "p-0",
      }}
      isVertical={isVertical}
      placement={placement}
      radius="none"
      selectedKey={pathname}
      size="lg"
      variant="underlined"
      {...props}
    >
      <Tab
        href={item.href}
        id={item.label}
        key={item.href}
        title={
          <div className={clsx("flex items-center gap-4")}>
            {item?.icon && (
              <Icon
                className="size-6 md:size-8 text-inherit"
                icon={item?.icon}
              />
            )}
            <span className={clsx(!isOpen ? "md:hidden" : "")}>
              {item.label}
            </span>
          </div>
        }
        titleValue={item.label}
      />
    </Tabs>
  );
}
