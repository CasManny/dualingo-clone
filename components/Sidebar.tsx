import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "./SidebarItem";
import { SignedIn, UserButton } from "@clerk/nextjs";

type Props = {
  className?: string;
};

const sidebarLinks = [
  {
    label: "Learn",
    href: "/learn",
    iconSrc: "/learn.svg"
  },
  {
    label: "Leaderboard",
    href: "/leaderboard",
    iconSrc: "/leaderboard.svg"
  },
  {
    label: "Quests",
    href: "/quests",
    iconSrc: "/quests.svg"
  },
  {
    label: "Shop",
    href: "/shop",
    iconSrc: "/shop.svg"
  }
]
const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        `h-full lg:w-[256px] lg:fixed flex left-0 top-0 px-4 border-r-2 flex-col`,
        className
      )}
    >
      <Link href={"/learn"}>
        <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
          <Image
            src={"/mascot.svg"}
            alt="logo"
            height={40}
            width={40}
            className=""
          />

          <h1 className="text-2xl font-extrabold tracking-wide text-green-600">
            Lingo
          </h1>
        </div>
      </Link>
      <div className="flex flex-col gap-y-2 flex-1">
        {sidebarLinks.map((link) => (
          <SidebarItem key={link.label} href={link.href} iconSrc={link.iconSrc} label={link.label} />
        ))}
      </div>
      <div className="p-4">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Sidebar;
