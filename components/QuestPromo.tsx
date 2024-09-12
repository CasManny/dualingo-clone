import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const QuestPromo = () => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Image src="/unlimited.svg" alt="unlimited" height={26} width={26} />
          <h2 className="font-bold text-black text-lg">Upgrade to pro</h2>
        </div>
        <p className="text-muted-foreground">Get unlimited hearts and more</p>
      </div>
      <Button size={"lg"} variant={"super"} className="w-full" asChild>
        <Link href={"/shop"}>Upgrade Now</Link>
      </Button>
    </div>
  );
};

export default QuestPromo;
