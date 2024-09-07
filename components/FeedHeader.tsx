import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type Props = {
  title: string;
};
import React from "react";

const FeedHeader = ({ title }: Props) => {
  return (
    <div className="stick top-0 bg-white pb-3 lg:pt-[28px] flex items-center justify-between border-b-2 mb-5 text-neutral-100 lg:z-50">
      <Link href={"/courses"}>
        <Button variant={"ghost"} size={"sm"}>
          <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400" />{" "}
        </Button>
      </Link>
      <h1 className="font-bold text-lg text-neutral-900">{title}</h1>
      <div className="" />
    </div>
  );
};

export default FeedHeader;
