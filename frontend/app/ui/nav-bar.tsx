"use client";
import { BookmarkIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const path = usePathname();
  console.log(path);
  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Tasks", href: "/tasks" },
    { name: "Badges", href: "/badges" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Connections", href: "/connections" },
  ];
  return (
    <div className="flex container items-center justify-between min-h-16 max-h-16 w-full dark:text-dark-primary text-xs border-b-2 dark:border-b-dark-elevation-2 px-4 md:px-0">
      <div className="flex items-center md:gap-6">
        <button className="rounded-curved dark:bg-dark-secondary-50 border dark:border-dark-secondary-50 hover:dark:bg-dark-secondary-100 px-8 py-1">
          Logo
        </button>
        {links.map((link) => {
          return (
            <a href={link.href} key={link.name}>
              <button
                className={clsx("hover:dark:text-dark-active hidden md:block", {
                  "dark:text-dark-active": path == link.href,
                })}
              >
                {link.name}
              </button>
            </a>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
        <div className="rounded-btn cursor-pointer dark:bg-dark-secondary-50 hover:dark:bg-dark-secondary-100 dark:text-dark-secondary  border dark:border-dark-active px-2 py-2 hidden md:block">
          How it works
        </div>
        <div className="flex items-center rounded-curved cursor-pointer min-w-min dark:bg-dark-secondary-50 hover:dark:bg-dark-secondary-100 border dark:border-dark-secondary-50 px-2 py-2">
          <Image
            src={"/avatar.png"}
            height={18}
            width={18}
            alt="avatar"
            className="rounded-full mr-1"
          />
          <div>bongo.eth</div>
        </div>
        <HamburgerMenuIcon className="w-6 h-6 block md:hidden" />
      </div>
    </div>
  );
}
