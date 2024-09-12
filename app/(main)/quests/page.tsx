import FeedWrapper from "@/components/FeedWrapper";
import Promo from "@/components/Promo";
import StickyWrapper from "@/components/StickyWrapper";
import { Progress } from "@/components/ui/progress";
import UserProgress from "@/components/UserProgress";
import { quests } from "@/constants";
import {
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";



const QuestPage = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);

  const isPro = !!userSubscription?.isActive;

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }
  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubcription={isPro}
        />
        {!isPro && <Promo />}
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
          <Image
            src={"/quests.svg"}
            alt="quest"
            height={90}
            width={90}
          />
          <h1 className="tex-center font-bold text-neutral-800 text-2xl my-6">
            Quests
          </h1>
          <p className="text-muted-foreground text-center text-lg mb-6">
            Complete Quests by earning points
          </p>
          <ul className="w-full ">
            {quests.map((quest, index) => {
              const progress = (userProgress.points / quest.value) * 100
              return (
                <div className="flex items-center w-full p-4 gap-x-4" key={quest.title}>
                  <Image src={'/points.svg'} alt="points" width={60} height={60} />
                  <div className="flex flex-col gap-y-2 w-full">
                    <p className="text-neutral-700 font-bold text-xl ">{quest.title}</p>
                    <Progress value={progress} className="h-3" />
                  </div>
                </div>
              )
              })}
          </ul>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default QuestPage;
