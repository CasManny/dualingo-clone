
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default  function Home() {
  const { userId } =  auth()
  return (
    <div className="max-w-[988px] mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] lg:mb-0 mb-8">
        <Image src={"/hero.svg"} fill alt="hero" />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[400px] text-center">
          Learn, practice and master new language with Lingo.
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          {userId ? (
            <div className="">
              <Link href={"/learn"}>
                <Button size={"lg"} variant={"secondary"} className="w-full">
                  continue Learning
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col w-full gap-y-2">
              <Link href={"/sign-up"}>
                <Button size={"lg"} variant={"secondary"} className="w-full">
                  Get Started
                </Button>
                </Link>
                <Link href={'/sign-in'}>
                <Button variant={'primaryOutline'} className="w-full">i already have an account</Button>
                </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
