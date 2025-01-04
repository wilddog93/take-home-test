import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Input } from "@nextui-org/input";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { MdClose, MdSearch } from "react-icons/md";
import { Tooltip } from "@nextui-org/react";
import * as motion from "framer-motion/client";

import { ToggleButton } from "../sidebar/toggle";

import { useSidebar } from "@/store/store";
import { Icon } from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { useSearch } from "@/store/search/useSearch";

type NavbarProps = {
  [key: string]: any;
};

export const Navbar: FC<NavbarProps> = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const { setSearch, search } = useSearch();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchInputVariants = {
    open: () => ({
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    }),
    closed: {
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  useEffect(() => {
    setSearch("");
  }, [isSearchOpen]);

  const searchInput = (
    <motion.div
      animate={isSearchOpen ? "open" : "closed"}
      className={clsx(
        "w-full md:max-w-xs md:translate-y-0 md:scale-100 transform transition-all",
        isSearchOpen ? "translate-y-0" : "-translate-y-full scale-0",
      )}
      initial={false}
      variants={searchInputVariants}
    >
      <Input
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        labelPlacement="outside"
        placeholder="Search..."
        radius="sm"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </motion.div>
  );

  return (
    <NextUINavbar
      className={clsx(
        "h-16 dark:bg-foreground-100 md:bg-background",
        isOpen ? "bg-background" : "bg-[#D9D9D9]",
      )}
      maxWidth="full"
      position="sticky"
    >
      <NavbarContent className="basis-full" justify="start">
        <ToggleButton
          className="md:hidden"
          isOpen={isOpen}
          onToggle={toggleSidebar}
        >
          <FaBars
            className={clsx(
              "size-6 font-medium text-inherit transform duration-300 ease-in-out",
            )}
          />
        </ToggleButton>

        <NavbarItem className="w-full">{searchInput}</NavbarItem>

        <NavbarItem className="ml-auto">
          <Tooltip
            showArrow
            content={isSearchOpen ? "Close search" : "Search"}
            trigger="focus"
          >
            <button
              className="md:hidden flex items-center justify-center gap-2 p-1.5 rounded-full text-sm text-default-400 transition-all duration-300 ease-in-out"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Icon
                className="size-6 text-inherit"
                icon={!isSearchOpen ? MdSearch : MdClose}
              />
            </button>
          </Tooltip>
        </NavbarItem>

        <NavbarItem className="flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
