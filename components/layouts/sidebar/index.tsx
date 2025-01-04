"use client";

import clsx from "clsx";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
} from "@nextui-org/react";
import NextLink from "next/link";
import { FaBars, FaChevronLeft } from "react-icons/fa";
import * as motion from "framer-motion/client";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { ReactNode, RefObject } from "react";

import { Navbar } from "../navbar/navbar";

import SidebarNavigations from "./sidebar-navigations";
import { ToggleButton } from "./toggle";

import { Icon } from "@/components/icons";
import { useSidebar } from "@/store/store";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  refMain?: RefObject<HTMLDivElement> | null;
}

export default function Dashboard({ children, refMain }: Props) {
  const { isOpen, toggleSidebar } = useSidebar();

  const sidebarVariants = {
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

  return (
    <div className="flex min-h-screen dark:bg-foreground-100 bg-background">
      {/* Sidebar */}
      <motion.aside
        animate={isOpen ? "open" : "closed"}
        className={clsx(
          `overflow-hidden w-full h-full max-w-xs dark:bg-foreground-50 bg-[#D9D9D9] min-h-screen md:static flex flex-col transition-all md:translate-x-0 absolute inset-y-0 left-0 z-50 dark:border-foreground-200 border-r`,
          isOpen ? "translate-x-0" : "-translate-x-full md:w-20",
        )}
        initial={false}
        variants={sidebarVariants}
      >
        <NextUINavbar
          className="h-16 bg-inherit"
          maxWidth="full"
          position="sticky"
        >
          <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
            <NavbarBrand as="li" className="gap-4 max-w-fit">
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

              <NextLink
                className={clsx(
                  "hidden md:flex justify-start items-center gap-4",
                )}
                href="/"
                prefetch={false}
              >
                <Icon className="flex size-8" icon={MdOutlineVerifiedUser} />
                <p
                  className={clsx(
                    "text-lg md:text-xl font-bold text-inherit",
                    isOpen ? "" : "md:hidden",
                  )}
                >
                  Reqmi
                </p>
              </NextLink>
            </NavbarBrand>
          </NavbarContent>
        </NextUINavbar>
        <NextLink
          className={clsx(
            "flex md:hidden justify-start items-center gap-4 py-1 px-6",
          )}
          href="/"
          prefetch={false}
        >
          <Icon className="size-8" icon={MdOutlineVerifiedUser} />
          <p
            className={clsx(
              "text-lg md:text-xl font-bold text-inherit",
              isOpen ? "" : "md:hidden",
            )}
          >
            Reqmi
          </p>
        </NextLink>
        <SidebarNavigations isOpen={isOpen} isVertical={false} />
        <div className="hidden md:block w-full absolute bottom-0 h-16 px-6 py-1">
          <ToggleButton
            className={clsx(
              "border-0 flex items-center p-0 h-full my-auto gap-1",
            )}
            isOpen={isOpen}
            onToggle={toggleSidebar}
          >
            <FaChevronLeft
              className={clsx(
                "size-6 text-inherit transform duration-300 ease-in-out",
                isOpen ? "" : "rotate-180",
              )}
            />
            <span
              className={clsx(
                !isOpen ? "md:hidden" : "",
                "font-medium text-xl",
              )}
            >
              Hide
            </span>
          </ToggleButton>
        </div>
      </motion.aside>

      {/* Main Content */}
      <motion.div
        className={clsx(
          "w-full flex flex-col overflow-hidden dark:bg-foreground-100 bg-background",
        )}
        variants={sidebarVariants}
      >
        {/* Header   */}
        <Navbar />
        {/* Main Content Area */}
        <div
          className={clsx("w-full overflow-x-hidden overflow-y-auto p-6")}
          ref={refMain}
        >
          {children}
        </div>
      </motion.div>

      <motion.div
        className={clsx(
          "md:hidden bg-black/60 w-full h-full absolute top-0 left-0 z-40",
          isOpen
            ? "opacity-100 scale-100 -translate-x-0"
            : "opacity-0 scale-0 translate-x-full",
        )}
      />
    </div>
  );
}
