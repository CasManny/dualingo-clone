import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="h-20 w-full border-2 border-slate-200 px-4">
      <div className="lg:max-w-screen-lg mx-auto flex items-center justify-between h-full">
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
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <SignedIn>
            <UserButton afterSwitchSessionUrl="/" afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link href={"/sign-in"}>
              <Button size={"lg"} variant={"ghost"}>
                Login
              </Button>
            </Link>
          </SignedOut>
        </ClerkLoaded>
      </div>
    </header>
  );
};

export default Header;
