import clsx from "clsx";
import { Tooltip } from "@nextui-org/react";

import SidebarItems from "./sidebar-items";

import { siteConfig } from "@/config/site";
import { Icon } from "@/components/icons";

interface SidebarNavigationsProps {
  isOpen?: boolean;
  isVertical?: boolean;
}

export default function SidebarNavigations({
  isOpen = false,
  isVertical = false,
}: SidebarNavigationsProps) {
  const menus = siteConfig.sideMenuItems;

  return (
    <div className="w-full overflow-x-hidden overflow-y-auto py-4 md:mb-16 md:py-0">
      {menus?.map((item) => {
        if (isOpen) {
          return (
            <SidebarItems
              href={item.href}
              id={item.label}
              isOpen={isOpen}
              isVertical={isVertical}
              item={item}
              key={item.href}
              placement="bottom"
              title={
                <div className={clsx("flex items-center gap-4")}>
                  {item?.icon && (
                    <Icon className="size-5 text-inherit" icon={item?.icon} />
                  )}
                  <span
                    className={clsx(
                      !isOpen ? "md:invisible group-hover:md:visible" : "",
                    )}
                  >
                    {item.label}
                  </span>
                </div>
              }
            />
          );
        }

        return (
          <Tooltip
            content={<div className="text-xs">{item.label}</div>}
            key={item.href}
            placement="right"
            radius="sm"
            showArrow={true}
          >
            <SidebarItems
              href={item.href}
              id={item.label}
              isOpen={isOpen}
              isVertical={isVertical}
              item={item}
              placement="bottom"
              title={
                <div className={clsx("flex items-center gap-4")}>
                  {item?.icon && (
                    <Icon className="size-5 text-inherit" icon={item?.icon} />
                  )}
                  <span
                    className={clsx(
                      !isOpen ? "md:invisible group-hover:md:visible" : "",
                    )}
                  >
                    {item.label}
                  </span>
                </div>
              }
            />
          </Tooltip>
        );
      })}
    </div>
  );
}
