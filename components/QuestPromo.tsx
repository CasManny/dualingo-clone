import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { quests } from "@/constants";
import { Progress } from "./ui/progress";

type Props = {
    points: number
}

const QuestPromo = ({points}: Props) => {
  return (
    <div className="border-2 rounded-xl p-4 space-y-4">
      <div className="flex items-center justify-between space-y-2">
        <h3 className="font-bold text-black text-lg ">Quests</h3>
        <Link href={"/quests"}>
          <Button size={'sm'} variant={'primaryOutline'}>View all</Button>
        </Link>
          </div>
          <ul className="w-full space-y-4">
          {quests.map((quest, index) => {
              const progress = (points / quest.value) * 100
              return (
                <div className="flex items-center w-full p-4 gap-x-3" key={quest.title}>
                  <Image src={'/points.svg'} alt="points" width={40} height={40} />
                  <div className="flex flex-col gap-y-2 w-full">
                    <p className="text-neutral-700 font-bold text-sm ">{quest.title}</p>
                    <Progress value={progress} className="h-2" />
                  </div>
                </div>
              )
              })}
          </ul>
    </div>
  );
};

export default QuestPromo;
